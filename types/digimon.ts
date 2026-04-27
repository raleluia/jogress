
export interface DigimonCard {
  id: string
  name: string
  type: string
  level: number | null
  play_cost: number | null
  evolution_cost: number | null
  evolution_color: string | null
  evolution_level: number | null
  xros_req: string | null
  color: string
  color2: string | null
  digi_type: string | null
  digi_type2: string | null
  form: string | null
  dp: number | null
  attribute: string | null
  rarity: string
  stage: string | null
  artist: string | null
  main_effect: string | null
  source_effect: string | null
  alt_effect: string | null
  series: string
  pretty_url: string
  date_added: string
  tcgplayer_name: string
  tcgplayer_id: number | null
  set_name: string[]
}
