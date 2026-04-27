// types/digimon.ts

// ─── API Response ────────────────────────────────────────────────
export interface DigimonCard {
  // Both endpoints return these
  id: string
  name: string
  type: string
  color: string

  // getAllCards uses cardnumber, /search uses id for the image key
  cardnumber?: string        // ← optional, not required

  // Optional fields
  color2?: string
  pretty_url?: string
  image_url?: string
  rarity?: string
  artist?: string
  level?: string
  dp?: number
  play_cost?: number
  evolution_cost?: number
  evolution_color?: string
  attribute?: string
  stage?: string
  form?: string
  digi_type?: string
  digi_type2?: string
  main_effect?: string
  source_effect?: string
  alt_effect?: string
  set_name?: string[]
}

// ─── API Query Parameters ─────────────────────────────────────────
export interface DigimonSearchParams {
  n?: string              // Card name (supports e:term to exclude)
  desc?: string           // Search in effects (main, source, alt)
  color?: DigimonColor    // Card color
  type?: DigimonCardType  // Card type
  attribute?: string      // Card attribute
  card?: string           // Card number e.g. "BT4-016", comma-separated for multiple
  pack?: string           // Pack name e.g. "BT-04: Booster Great Legend"
  setname?: string        // Alias for pack
  sort?: DigimonSortField
  sortdirection?: 'asc' | 'desc'
  series?: DigimonSeries  // Game type / series
  format?: DigimonSeries  // Alias for series
  digitype?: string       // Digi-Type e.g. "Wizard", "Dragon"
  evocost?: number        // Evolution cost
  evocolor?: DigimonColor // Evolution color
  level?: number          // Card level
  playcost?: number       // Play cost
  dp?: number             // DP / Power
  stage?: string          // Stage
  artist?: string         // Artist name
  limit?: number          // Max results to return
  pagenum?: number        // Pagination (0-indexed)
}

// ─── Allowed Values as const arrays (usable at runtime) ──────────
export const DIGIMON_COLORS = [
  'Black', 'Blue', 'Colorless', 'Green',
  'Purple', 'Red', 'White', 'Yellow'
] as const

export const DIGIMON_CARD_TYPES = [
  'Digimon', 'Option', 'Tamer', 'Digi-Egg'
] as const

export const DIGIMON_SORT_OPTIONS = [
  { value: 'name',     label: 'Name' },
  { value: 'level',    label: 'Level' },
  { value: 'playcost', label: 'Play Cost' },
  { value: 'power',    label: 'DP' },
  { value: 'new',      label: 'Newest' },
  { value: 'views',    label: 'Popular' },
] as const

export const DIGIMON_SERIES = 'Digimon Card Game' as const

// ─── Types derived FROM the arrays (single source of truth) ──────
export type DigimonColor    = typeof DIGIMON_COLORS[number]
export type DigimonCardType = typeof DIGIMON_CARD_TYPES[number]
export type DigimonSortField = typeof DIGIMON_SORT_OPTIONS[number]['value']
export type DigimonSeries   = typeof DIGIMON_SERIES[number]