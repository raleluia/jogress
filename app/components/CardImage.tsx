'use client'

import { useState } from 'react'
import type { DigimonCard } from '@/types/digimon'
import { getCardImageUrl } from '@/lib/digimon'

interface Props {
  card: DigimonCard
  prints: DigimonCard[]
}

export default function CardImage({ card, prints }: Props) {
  const [selected, setSelected] = useState<DigimonCard>(card)  // ← explicit generic
  const [lightbox, setLightbox] = useState(false)
  const hasPrints = prints.length > 1
  const imgSrc = getCardImageUrl(selected)

  return (
    <>
      {/* Main image */}
      <div
        className="rounded-xl overflow-hidden border border-border shadow-lg shadow-black/40 cursor-zoom-in"
        onClick={() => setLightbox(true)}
      >
        <img
          src={imgSrc}
          alt={selected.name}
          className="w-full h-auto transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Alt arts switcher */}
      {hasPrints && (
        <div>
          <p className="text-xs text-muted uppercase tracking-wide mb-2">
            Prints — {prints.length} versions
          </p>
          <div className="flex flex-wrap gap-2">
            {prints.map((print, index) => (
              <button
                key={print.pretty_url ?? `print-${index}`}
                onClick={() => setSelected(print)}
                title={print.set_name?.[0] ?? print.id}
                className={`w-12 rounded-md overflow-hidden border-2 transition-all ${
                  selected.id === print.id
                    ? 'border-secondary scale-110 shadow-md shadow-secondary/20'
                    : 'border-border hover:border-primary opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={getCardImageUrl(print)}
                  alt={print.name}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white text-sm uppercase tracking-wide transition-colors"
            onClick={() => setLightbox(false)}
          >
            ✕ Close
          </button>
          <img
            src={imgSrc}
            alt={selected.name}
            className="max-h-[90vh] max-w-[90vw] w-auto h-auto rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}