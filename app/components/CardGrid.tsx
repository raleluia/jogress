import type { DigimonCard } from '@/types/digimon'
import { getCardImageUrl } from '@/lib/digimon'
interface Props {
  cards: DigimonCard[]
  emptyMessage?: string,
  className?: string
}

export default function CardGrid({ cards, emptyMessage = 'No cards found.', className }: Props) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-2xl text-muted mb-2">{emptyMessage}</p>
        <p className="text-sm text-faint">Try adjusting your search or filters</p>
        <a href="/" className="inline-block mt-6 text-sm text-primary hover:text-primary-hover transition-colors">
          ← Back to search
        </a>
      </div>
    )
  }

  return (
    <div className={className ?? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3'}>
    {cards.map((card, index) => (
        <a
          key={card.pretty_url ?? `card-${index}`}
          href={`/cards/${card.id}`}
          className="group relative bg-surface border border-border rounded-lg overflow-hidden hover:border-secondary hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-secondary/10"
        >
          <img
            src={getCardImageUrl(card)}
            alt={card.name}
            className="w-full h-auto"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 bg-bg/90 px-2 py-1 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
            <p className="text-xs text-text truncate">{card.name}</p>
            <p className="text-xs text-muted">{card.id}</p>
          </div>
        </a>
      ))}
    </div>
  )
}