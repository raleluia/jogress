import { Suspense } from 'react'
import type { DigimonCard } from '@/types/digimon'
import SearchBar from './components/SearchBar'
import CardGrid from '@/app/components/CardGrid'
async function getRandomCards(): Promise<DigimonCard[]> {
  const res = await fetch(
    'https://digimoncard.io/api-public/search?sort=random&type=Digimon&series=Digimon%20Card%20Game&limit=6',
    { cache: 'no-store' }   // ← fresh on every request
  )
  if (!res.ok) return []
  return res.json()
}

export default async function HomePage() {
  const randomCards = await getRandomCards()

  return (
    <main className="min-h-screen bg-bg flex flex-col">

      {/* Hero — vertically centered search focus */}
      <section className=" flex flex-col items-center justify-center px-6 py-30 text-center">

        {/* Logo / Title */}
        <div className="mb-2">
          <span className="text-xs uppercase tracking-[0.3em] text-text font-medium">
            Digimon TCG
          </span>
        </div>
        <h1 className="font-display text-6xl font-bold tracking-widest uppercase mb-2">
          <span className="text-primary">Jog</span>
          <span className="text-secondary">ress</span>
        </h1>
        <p className="text-muted text-sm mb-10 max-w-sm">
          Search and explore every card in the Digimon Card Game
        </p>

        {/* Search bar */}
        <Suspense>
          <SearchBar />
        </Suspense>

        {/* Quick filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {['Red', 'Blue', 'Green', 'Black', 'Yellow', 'Purple', 'White'].map((color) => (
            <a
              key={color}
              href={`/search?color=${color}`}
              className="text-xs px-3 py-1 rounded-full border border-border text-muted hover:border-primary hover:text-primary transition-colors"
            >
              {color}
            </a>
          ))}
        </div>
      </section>

      {/* Random cards showcase */}
      {randomCards.length > 0 && (
        <section className="px-6 pb-12">
          <div className="max-w-screen-lg mx-auto">
            <p className="text-xs uppercase tracking-widest text-faint text-center mb-4">
              Spotlight
            </p>
            <CardGrid cards={randomCards} className="grid grid-cols-3 sm:grid-cols-6 gap-3 justify-items-center"/>
          </div>
        </section>
      )}

    </main>
  )
}