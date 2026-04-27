// Minimal — just codes and type (derivable from prefix, but explicit is clearer)
export const SET_CODES: { code: string; type: SetType; releaseDate: string }[] = [
  // Booster Sets
  { code: 'BT-01', type: 'Booster',        releaseDate: '2020-04-24' },
  { code: 'BT-02', type: 'Booster',        releaseDate: '2020-07-30' },
  { code: 'BT-03', type: 'Booster',        releaseDate: '2020-11-27' },
  { code: 'BT-04', type: 'Booster',        releaseDate: '2021-04-23' },
  { code: 'BT-05', type: 'Booster',        releaseDate: '2021-08-06' },
  { code: 'BT-06', type: 'Booster',        releaseDate: '2021-11-26' },
  { code: 'BT-07', type: 'Booster',        releaseDate: '2022-03-25' },
  { code: 'BT-08', type: 'Booster',        releaseDate: '2022-06-24' },
  { code: 'BT-09', type: 'Booster',        releaseDate: '2022-09-30' },
  { code: 'BT-10', type: 'Booster',        releaseDate: '2022-12-16' },
  { code: 'BT-11', type: 'Booster',        releaseDate: '2023-03-31' },
  { code: 'BT-12', type: 'Booster',        releaseDate: '2023-06-30' },
  { code: 'BT-13', type: 'Booster',        releaseDate: '2023-09-29' },
  { code: 'BT-14', type: 'Booster',        releaseDate: '2023-12-22' },
  { code: 'BT-15', type: 'Booster',        releaseDate: '2024-03-29' },
  { code: 'BT-16', type: 'Booster',        releaseDate: '2024-06-28' },
  { code: 'BT-17', type: 'Booster',        releaseDate: '2024-09-27' },
  { code: 'BT-18', type: 'Booster',        releaseDate: '2024-12-27' },
  { code: 'BT-19', type: 'Booster',        releaseDate: '2025-03-28' },
  { code: 'BT-20', type: 'Booster',        releaseDate: '2025-06-27' },
  // Extra Boosters
  { code: 'EX-01', type: 'Extra Booster',  releaseDate: '2021-10-29' },
  { code: 'EX-02', type: 'Extra Booster',  releaseDate: '2022-04-22' },
  { code: 'EX-03', type: 'Extra Booster',  releaseDate: '2022-10-28' },
  { code: 'EX-04', type: 'Extra Booster',  releaseDate: '2023-04-28' },
  { code: 'EX-05', type: 'Extra Booster',  releaseDate: '2023-10-27' },
  { code: 'EX-06', type: 'Extra Booster',  releaseDate: '2024-04-26' },
  { code: 'EX-07', type: 'Extra Booster',  releaseDate: '2024-10-25' },
  // Starter Decks
  { code: 'ST-01', type: 'Starter',        releaseDate: '2020-04-24' },
  { code: 'ST-02', type: 'Starter',        releaseDate: '2020-04-24' },
  { code: 'ST-03', type: 'Starter',        releaseDate: '2020-04-24' },
  { code: 'ST-04', type: 'Starter',        releaseDate: '2021-04-23' },
  { code: 'ST-05', type: 'Starter',        releaseDate: '2021-04-23' },
  { code: 'ST-06', type: 'Starter',        releaseDate: '2021-04-23' },
  { code: 'ST-07', type: 'Starter',        releaseDate: '2021-11-26' },
  { code: 'ST-08', type: 'Starter',        releaseDate: '2021-11-26' },
  { code: 'ST-09', type: 'Starter',        releaseDate: '2022-03-25' },
  { code: 'ST-10', type: 'Starter',        releaseDate: '2022-03-25' },
  { code: 'ST-12', type: 'Starter',        releaseDate: '2022-06-24' },
  { code: 'ST-13', type: 'Starter',        releaseDate: '2022-06-24' },
  { code: 'ST-14', type: 'Starter',        releaseDate: '2022-12-16' },
  { code: 'ST-15', type: 'Starter',        releaseDate: '2023-03-31' },
  { code: 'ST-16', type: 'Starter',        releaseDate: '2023-03-31' },
]

export type SetType = 'Booster' | 'Starter' | 'Extra Booster' | 'Promo' | 'Premium'

export const SET_TYPE_COLOR: Record<SetType, string> = {
  'Booster':       'bg-blue-950 text-blue-300 border-blue-800',
  'Starter':       'bg-green-950 text-green-300 border-green-800',
  'Extra Booster': 'bg-orange-950 text-orange-300 border-orange-800',
  'Promo':         'bg-primary/10 text-primary border-primary/30',
  'Premium':       'bg-purple-950 text-purple-300 border-purple-800',
}

// Resolved set — code metadata + live API data
export interface ResolvedSet {
  code: string
  type: SetType
  releaseDate: string
  name: string       // from API
  coverId: string    // first card id — used for image URL
}