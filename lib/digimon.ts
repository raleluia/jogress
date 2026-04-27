import type { DigimonSearchParams, DigimonCard } from '@/types/digimon'

const API_BASE = 'https://digimoncard.io/api-public/search'

export function buildSearchQuery(params: DigimonSearchParams): string {
  const query = new URLSearchParams()

  query.set('sort', params.sort ?? 'name')
  query.set('sortdirection', params.sortdirection ?? 'asc')
  query.set('pagenum', String(params.pagenum ?? 0))
  query.set('series', 'Digimon Card Game')
  if (params.n)         query.set('n', params.n)
  if (params.desc)      query.set('desc', params.desc)
  if (params.color)     query.set('color', params.color)
  if (params.type)      query.set('type', params.type)
  if (params.attribute) query.set('attribute', params.attribute)
  if (params.card)      query.set('card', params.card)
  if (params.pack)      query.set('pack', params.pack)
  if (params.digitype)  query.set('digitype', params.digitype)
  if (params.evocost)   query.set('evocost', String(params.evocost))
  if (params.evocolor)  query.set('evocolor', params.evocolor)
  if (params.level)     query.set('level', String(params.level))
  if (params.playcost)  query.set('playcost', String(params.playcost))
  if (params.dp)        query.set('dp', String(params.dp))
  if (params.stage)     query.set('stage', params.stage)
  if (params.artist)    query.set('artist', params.artist)
  if (params.limit)     query.set('limit', String(params.limit))

  const hasFilter = Object.keys(params).some(
    (k) => !['sort', 'sortdirection', 'pagenum'].includes(k)
  )
  if (!hasFilter) query.set('type', 'Digimon')

  return `${API_BASE}?${query.toString()}`
}

export function hasActiveFilters(params: DigimonSearchParams): boolean {
  return Object.keys(params).some(
    (k) => !['sort', 'sortdirection', 'pagenum'].includes(k)
  )
}


export function getCardImageUrl(card: DigimonCard): string {
  // getAllCards returns cardnumber, /search returns id
  const key = card.cardnumber ?? card.id
  return `https://images.digimoncard.io/images/cards/${key}.webp`
}