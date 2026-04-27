import { SET_CODES, SET_TYPE_COLOR, type ResolvedSet } from '@/lib/sets'
import type { DigimonCard } from '@/types/digimon'

// Fetch one card per set to get name + cover image
async function resolveSet(code: string, type: any, releaseDate: string): Promise<ResolvedSet | null> {
  try {
    const res = await fetch(
      `https://digimoncard.io/api-public/search?set=${code}&limit=1&sort=id&sortdirection=asc&series=Digimon%20Card%20Game`,
      { next: { revalidate: 86400 } } // cache for 24h
    )
    if (!res.ok) return null
    const cards: DigimonCard[] = await res.json()
    if (!cards?.length) return null

    return {
      code,
      type,
      releaseDate,
      name: cards[0].set_name?.[0] ?? code,
      coverId: cards[0].id,
    }
  } catch {
    return null
  }
}

export default async function SetsPage() {
  // Resolve all sets in parallel
  const resolved = await Promise.all(
    SET_CODES.map(({ code, type, releaseDate }) =>
      resolveSet(code, type, releaseDate)
    )
  )

  // Filter nulls and group by type
  const sets = resolved.filter(Boolean) as ResolvedSet[]

  const groups: Record<string, ResolvedSet[]> = {
    Booster:          sets.filter(s => s.type === 'Booster'),
    'Extra Booster':  sets.filter(s => s.type === 'Extra Booster'),
    Starter:          sets.filter(s => s.type === 'Starter'),
  }

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <h1 className="font-display text-2xl font-bold text-text mb-8">Sets</h1>

        {Object.entries(groups).map(([type, groupSets]) =>
          groupSets.length === 0 ? null : (
            <section key={type} className="mb-12">
              <h2 className="text-xs text-muted uppercase tracking-widest mb-4">{type}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {groupSets.map((set) => (
                  <a
                    key={set.code}
                    href={`/sets/${set.code}`}
                    className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-primary transition-all hover:shadow-md hover:shadow-primary/10"
                  >
                    <div className="aspect-[3/4] bg-surface-offset overflow-hidden">
                      <img
                        src={`https://images.digimoncard.io/images/cards/${set.coverId}.webp`}
                        alt={set.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <span className={`text-xs px-1.5 py-0.5 rounded border font-medium ${SET_TYPE_COLOR[set.type]}`}>
                        {set.code}
                      </span>
                      <p className="text-sm text-text font-medium mt-1.5 leading-tight">
                        {set.name}
                      </p>
                      <p className="text-xs text-faint mt-0.5">
                        {new Date(set.releaseDate).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short'
                        })}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )
        )}
      </div>
    </main>
  )
}