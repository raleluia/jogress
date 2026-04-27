import type { DigimonCard } from '@/types/digimon'
import CardGrid from '@/app/components/CardGrid'
import Pagination from '@/app/components/Pagination'

const PAGE_SIZE = 32

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>
}

// ─── API Helpers ──────────────────────────────────────────────────────────────

async function getAllCards(): Promise<DigimonCard[]> {
  const res = await fetch(
    'https://digimoncard.io/api-public/getAllCards?sort=name&series=Digimon%20Card%20Game&sortdirection=asc',
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) return []
  return res.json()
}

async function searchByName(query: string): Promise<DigimonCard[]> {
  const params = new URLSearchParams({
    name: query,
    sort: 'name',
    sortdirection: 'asc',
    series: 'Digimon Card Game',
  })
  const res = await fetch(
    `https://digimoncard.io/api-public/search?${params}`,
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) return []
  const data: DigimonCard[] = await res.json()
  const q = query.toLowerCase()
  // Strip fallback: keep only cards that actually match by name
  return data.filter((card) => card.name?.toLowerCase().includes(q))
}

async function searchByDesc(query: string): Promise<DigimonCard[]> {
  const params = new URLSearchParams({
    desc: query,
    sort: 'name',
    sortdirection: 'asc',
    series: 'Digimon Card Game',
  })
  const res = await fetch(
    `https://digimoncard.io/api-public/search?${params}`,
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) return []
  const data: DigimonCard[] = await res.json()
  const q = query.toLowerCase()
  // Strip fallback: keep only cards that actually match by description
  return data.filter((card) => card.main_effect?.toLowerCase().includes(q))
}

// ─── Deduplication ────────────────────────────────────────────────────────────

function deduplicateCards(cards: DigimonCard[]): DigimonCard[] {
  const seen = new Set<string>()
  return cards.filter((card) => {
    const key = card.cardnumber ?? card.id
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

// ─── Search: parallel API calls, validated + merged ──────────────────────────

async function searchCards(query: string): Promise<DigimonCard[]> {
  const [byName, byDesc] = await Promise.all([
    searchByName(query),
    searchByDesc(query),
  ])
  // Name results first (higher relevance), desc-only matches appended
  return deduplicateCards([...byName, ...byDesc])
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SearchPage({ searchParams }: PageProps) {
  const { q: rawQ = '', page = '1' } = await searchParams
  const q = rawQ.trim()
  const currentPage = Math.max(1, parseInt(page, 10) || 1)

  const allCards = q ? await searchCards(q) : await getAllCards()

  const totalCards = allCards.length
  const totalPages = Math.ceil(totalCards / PAGE_SIZE)
  const start = (currentPage - 1) * PAGE_SIZE
  const cards = allCards.slice(start, start + PAGE_SIZE)

  const buildHref = (p: number) => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    params.set('page', String(p))
    return `/search?${params}`
  }

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="max-w-screen-xl mx-auto px-6 py-8">

        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-text">
              {q ? `Results for "${q}"` : 'All Cards'}
            </h1>
            <p className="text-sm text-muted mt-0.5">
              {totalCards === 0
                ? 'No cards found'
                : `${totalCards.toLocaleString()} cards · Page ${currentPage} of ${totalPages}`}
            </p>
          </div>
          {q && (
            <a href="/search" className="text-sm text-muted hover:text-primary transition-colors">
              Clear search ✕
            </a>
          )}
        </div>

        <CardGrid
          cards={cards}
          emptyMessage={q ? `No cards found for "${q}"` : 'No cards available'}
        />

        {totalPages > 1 && (
          <Pagination
            page={currentPage}
            hasMore={currentPage < totalPages}
            prevHref={buildHref(currentPage - 1)}
            nextHref={buildHref(currentPage + 1)}
          />
        )}

      </div>
    </main>
  )
}