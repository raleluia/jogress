import type { DigimonCard } from "@/types/digimon"

export default async function HomePage() {
  const res = await fetch(
    'https://digimoncard.io/api-public/search?sort=name&sortdirection=asc&pagenum=0&type=Digimon',
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  const data: DigimonCard[] = await res.json()
  const seen = new Set<string>()
  const cards = data.filter((card) => {
    if (seen.has(card.id)) return false
    seen.add(card.id)
    return true
  })


 return (
    <main className="min-h-screen bg-bg">
      {/* Navbar */}
      <header className="border-b border-border px-6 py-4 flex items-center gap-3">
        <h1 className="font-display text-2xl font-bold text-primary tracking-wide">
          Jogress
        </h1>
        <span className="text-muted text-sm">Digimon TCG Card Browser</span>
      </header>

      {/* Card Grid */}
      <section className="p-6">
        <p className="text-muted text-sm mb-4">{cards.length} cards loaded</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cards.map((card: any, index) => (
            <div
              key={card.id ?? `card-${index}`}
              className="bg-surface border border-border rounded-[--radius-card] overflow-hidden hover:border-primary transition-colors cursor-pointer"
            >
              <img
                src={`https://images.digimoncard.io/images/cards/${card.id}.webp`}
                alt={card.name}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}