# Digimon TCG Card Search

I've always wanted a Scryfall equivalent for the Digimon Card Game. This is my attempt at building one.

It lets you search cards by name or description, browse by set, and dig into individual card detail pages.

---

## Features

- **Card search**: searches by name and description simultaneously, returns only genuinely matching cards
- **Card detail page**: full card info: type, colour, DP, play cost, set membership, card image
- **Set browser**: browse cards organised by set
- **Pagination**: fast navigation across large result sets

***

## Stack

- **Next.js 15** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS**
- **[digimoncard.io](https://digimoncard.io) public API**  all card data comes from here

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
app/
├── components/     # CardGrid, Pagination, Navbar, etc.
├── search/         # Search & browse page
├── cards/[id]/     # Card detail page
├── sets/           # Set browser
└── types/          # DigimonCard and other shared types
```

---

## Notes

The search runs two parallel API calls one by name, one by description and merges the results. The API has a quirk where it returns all cards as a fallback when nothing matches, so results are validated client-side before merging to strip out the noise.

---

## Acknowledgements

- [digimoncard.io](https://digimoncard.io) for the free public API
- [Scryfall](https://scryfall.com) for the inspiration
