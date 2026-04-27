import { notFound } from 'next/navigation'
import type { DigimonCard } from '@/types/digimon'
import CardImage from '@/app/components/CardImage'
import CardStatBadge from '@/app/components/CardStatBadge'

interface PageProps {
  params: Promise<{ id: string }>
}

const RARITY_LABEL: Record<string, string> = {
  c: 'Common', u: 'Uncommon', r: 'Rare',
  sr: 'Super Rare', sec: 'Secret Rare', p: 'Promo'
}

const RARITY_COLOR: Record<string, string> = {
  c:   'bg-surface text-muted border-border',
  u:   'bg-blue-950 text-blue-300 border-blue-800',
  r:   'bg-yellow-950 text-yellow-300 border-yellow-800',
  sr:  'bg-orange-950 text-orange-300 border-orange-800',
  sec: 'bg-purple-950 text-purple-300 border-purple-800',
  p:   'bg-primary/10 text-primary border-primary/30',
}

const COLOR_STYLE: Record<string, { bg: string; text: string; border: string }> = {
  Red:      { bg: 'bg-red-950',    text: 'text-red-300',    border: 'border-red-800'    },
  Blue:     { bg: 'bg-blue-950',   text: 'text-blue-300',   border: 'border-blue-800'   },
  Yellow:   { bg: 'bg-yellow-950', text: 'text-yellow-300', border: 'border-yellow-800' },
  Green:    { bg: 'bg-green-950',  text: 'text-green-300',  border: 'border-green-800'  },
  Black:    { bg: 'bg-gray-900',   text: 'text-gray-300',   border: 'border-gray-700'   },
  Purple:   { bg: 'bg-purple-950', text: 'text-purple-300', border: 'border-purple-800' },
  White:    { bg: 'bg-slate-800',  text: 'text-slate-200',  border: 'border-slate-600'  },
  Colorless:{ bg: 'bg-surface',    text: 'text-muted',      border: 'border-border'     },
}

async function getCardAndPrints(id: string): Promise<{ card: DigimonCard; prints: DigimonCard[] }> {
  const res = await fetch(
    `https://digimoncard.io/api-public/search?card=${id}&series=Digimon%20Card%20Game`,
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) notFound()
  const prints: DigimonCard[] = await res.json()
  if (!prints?.length) notFound()
  return { card: prints[0], prints }
}

function ColorBadge({ color }: { color: string }) {
  const style = COLOR_STYLE[color] ?? COLOR_STYLE.Colorless
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${style.bg} ${style.text} ${style.border}`}>
      {color}
    </span>
  )
}

function EffectBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="pl-3 border-l-2 border-secondary/40">
      <p className="text-xs text-secondary uppercase tracking-wide mb-1.5 font-medium">{label}</p>
      <p className="text-sm text-text leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  )
}

export default async function CardDetailPage({ params }: PageProps) {
  const { id } = await params
  const { card, prints } = await getCardAndPrints(id)

  const rarityKey = card.rarity?.toLowerCase() ?? ''

  return (
    <main className="min-h-screen bg-bg text-text">
      <div className="max-w-screen-xl mx-auto px-6 py-8">

        {/* Back */}
        <a
          href="javascript:history.back()"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors mb-8"
        >
          ← Back to results
        </a>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_240px] gap-10">

          {/* ── Col 1: Image + alt arts ── */}
          <div className="flex flex-col gap-4">
            <CardImage card={card} prints={prints} />
          </div>

          {/* ── Col 2: Card details ── */}
          <div className="flex flex-col gap-6">

            {/* Name + type + colors */}
            <div>
              <h1 className="font-display text-5xl font-bold text-text tracking-wide leading-tight mb-2">
                {card.name}
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                {card.color  && <ColorBadge color={card.color} />}
                {card.color2 && <ColorBadge color={card.color2} />}
                <span className="text-sm text-muted">
                  {card.type}
                  {card.form && ` · ${card.form}`}
                  {card.digi_type  && ` · ${card.digi_type}`}
                  {card.digi_type2 && ` / ${card.digi_type2}`}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 p-4 bg-surface rounded-lg border border-border">
              {card.level        && <CardStatBadge label="Level"     value={card.level}                  accent="primary"   />}
              {card.dp           && <CardStatBadge label="DP"        value={card.dp.toLocaleString()}     accent="secondary" />}
              {card.play_cost    != null && <CardStatBadge label="Play Cost"  value={card.play_cost}                        />}
              {card.evolution_cost != null && <CardStatBadge label="Evo Cost" value={`${card.evolution_cost}${card.evolution_color ? ` (${card.evolution_color})` : ''}`} />}
              {card.attribute    && <CardStatBadge label="Attribute" value={card.attribute}                                 />}
              {card.stage        && <CardStatBadge label="Stage"     value={card.stage}                                    />}
            </div>

            {/* Effects */}
            <div className="flex flex-col gap-5">
              {card.main_effect   && <EffectBlock label="Main Effect"    text={card.main_effect}   />}
              {card.source_effect && <EffectBlock label="Source Effect" text={card.source_effect} />}
              {card.alt_effect    && <EffectBlock label="Alt Effect"     text={card.alt_effect}    />}
            </div>

            {/* Artist */}
            {card.artist && (
              <p className="text-sm text-faint italic border-t border-border pt-4">
                Illustrated by <span className="text-muted not-italic">{card.artist}</span>
              </p>
            )}
          </div>

          {/* ── Col 3: Unified sidebar ── */}
<div className="bg-surface border border-border rounded-xl overflow-hidden h-fit">

  {/* Card number hero */}
  <div className="px-5 py-4 border-b border-border bg-surface-offset">
    <p className="text-xs text-muted uppercase tracking-wide mb-0.5">Card Number</p>
    <p className="font-mono text-2xl font-bold text-primary">{card.id}</p>
  </div>

  {/* Rarity */}
  <div className="px-5 py-3 border-b border-border flex items-center justify-between">
    <span className="text-xs text-muted uppercase tracking-wide">Rarity</span>
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${RARITY_COLOR[rarityKey] ?? 'bg-surface text-muted border-border'}`}>
      {RARITY_LABEL[rarityKey] ?? card.rarity}
    </span>
  </div>

  {/* Sets */}
  {(card.set_name?.length ?? 0) > 0 && (
    <div className="px-5 py-3">
      <p className="text-xs text-muted uppercase tracking-wide mb-2">Set</p>
      <div className="flex flex-col gap-1">
        {card.set_name!.map((set, i) => (
          <p key={i} className="text-xs text-text">{set}</p>
        ))}
      </div>
    </div>
  )}

</div>

        </div>
      </div>
    </main>
  )
}