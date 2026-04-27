import { notFound } from 'next/navigation'
import type { DigimonCard } from '@/types/digimon'
import { SET_CODES } from '@/lib/sets'
import CardGrid from '@/app/components/CardGrid'
import Pagination from '@/app/components/Pagination'

const PAGE_SIZE = 32

interface PageProps {
  params: Promise<{ code: string }>
  searchParams: Promise<{ page?: string }>
}

async function getSetCards(code: string, page: number): Promise<DigimonCard[]> {
  const params = new URLSearchParams({
    set: code,
    sort: 'id',
    sortdirection: 'asc',
    pagenum: String(page - 1),
    limit: String(PAGE_SIZE),
    series: 'Digimon Card Game',
  })
  const res = await fetch(
    `https://digimoncard.io/api-public/search?${params}`,
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) return []
  return res.json()
}

export default async function SetDetailPage({ params, searchParams }: PageProps) {
  const { code } = await params
  const { page = '1' } = await searchParams
  const currentPage = Math.max(1, parseInt(page, 10) || 1)

  // Look up set metadata from our curated list
  const setInfo = SET_CODES.find(s => s.code === code)
  if (!setInfo) notFound()

  const cards = await getSetCards(code, currentPage)
  const hasMore = cards.length === PAGE_SIZE

  const buildHref = (p: number) => `/sets/${code}?page=${p}`

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="max-w-screen-xl mx-auto px-6 py-8">

        <a
          href="/sets"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors mb-8"
        >
          ← All Sets
        </a>

        <div className="flex items-baseline gap-4 mb-6">
          <h1 className="font-display text-2xl font-bold text-text">{setInfo.code}</h1>
          <span className="font-mono text-sm text-muted">{setInfo.code}</span>
          <span className="text-xs text-faint">
            {new Date(setInfo.releaseDate).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </span>
        </div>

        <CardGrid cards={cards} emptyMessage="No cards found for this set." />

        {cards.length > 0 && (
          <Pagination
            page={currentPage}
            hasMore={hasMore}
            prevHref={buildHref(currentPage - 1)}
            nextHref={buildHref(currentPage + 1)}
          />
        )}
      </div>
    </main>
  )
}