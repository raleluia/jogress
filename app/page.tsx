interface DigimonCard {
  cardnumber: string
  name: string
  image_url: string
  color: string
  cardtype: string
  level?: string
}

export default async function HomePage() {
  const res = await fetch(
    'https://digimoncard.io/api-public/search?sort=name&sortdirection=asc&pagenum=0&type=Digimon',
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  const cards: DigimonCard[] = await res.json()

  return (
    <main>
      <h1>Jogress</h1>
      <p>Loaded {cards.length} cards</p>
    </main>
  )
}