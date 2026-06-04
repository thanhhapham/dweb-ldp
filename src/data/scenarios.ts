import type { ListingData, Review } from './schema'

// Shared boilerplate ----------------------------------------------------------

const CAROUSELL_DELIVERY = {
  type: 'delivery' as const,
  label: 'Carousell official delivery',
  detail: '3-5 working days · Tracked',
  price: 'Free',
}

const MEETUP_QUEENSTOWN = {
  type: 'meetup' as const,
  label: 'Meet-up',
  location: 'Queenstown MRT Station (EW19)',
}

const MEETUP_BISHAN = {
  type: 'meetup' as const,
  label: 'Meet-up',
  location: 'Bishan MRT Station (NS17 / CC15)',
}

function casualReviews(): Review[] {
  return [
    {
      author: 'markl',
      rating: 5,
      daysAgo: '5 days ago',
      text: 'Smooth and easy transaction. Card was exactly as described, well packaged. Thanks!',
      productTitle: 'Pokemon Charizard ex',
      productPrice: 'S$120',
    },
    {
      author: 'kristina23',
      rating: 5,
      daysAgo: '2 weeks ago',
      text: 'Great seller, responsive and friendly. Would buy again.',
      productTitle: 'Pikachu Promo',
      productPrice: 'S$25',
    },
  ]
}

function proReviews(): Review[] {
  return [
    {
      author: 'cardcollector_sg',
      rating: 5,
      daysAgo: '1 day ago',
      text: 'Legit shop, items always sealed and authentic. Fast shipping with tracking. Trusted.',
      productTitle: 'Vivid Voltage Booster Box',
      productPrice: 'S$210',
    },
    {
      author: 'jtouya',
      rating: 5,
      daysAgo: '3 days ago',
      text: 'Card in perfect condition, exactly the grade shown. Professional packaging.',
      productTitle: 'Umbreon VMAX Alt Art PSA 10',
      productPrice: 'S$680',
    },
    {
      author: 'mtg_mike',
      rating: 4,
      daysAgo: '1 week ago',
      text: 'Good deal and quick to respond. Slight delay in shipping but kept me updated.',
      productTitle: 'Charizard UPC',
      productPrice: 'S$320',
    },
  ]
}

// ─────────────────────────────────────────────────────────────
// 1) Graded single · casual seller · 1 photo · minimal info
// Source: bubble-mew-ex-psa-10
// ─────────────────────────────────────────────────────────────
const gradedCasual: ListingData = {
  id: 'graded-casual',
  itemType: 'graded-single',
  title: 'Bubble Mew ex PSA 10',
  setName: 'Shiny Treasure ex (SV4a) · Japanese',
  condition: 'Brand new',
  conditionNote: 'Professionally graded GEM MT 10. Sealed in PSA case.',
  price: 'S$1,350',
  goodDeal: false,
  grading: { company: 'PSA', grade: '10' },
  bnpl: 'From S$112.50/mo with PayLater or Atome',
  completeness: 'minimum',
  images: [
    'https://media.karousell.com/media/photos/products/2026/5/21/pokemon_bubble_mew_ex_special__1779397680_8f6d7c7f.jpg',
  ],
  attributes: [
    { label: 'Game', value: 'Pokémon', tier: 'required' },
    { label: 'Graded', value: 'PSA 10 (GEM MT)', tier: 'required' },
    { label: 'Language', value: 'Japanese', tier: 'required' },
  ],
  description:
    'Mew ex Special Art Rare card from the 2023 SV4a JP set. Professionally graded GEM MT 10. Open to trades.',
  seller: {
    name: 'Alvin Chan',
    handle: 'silversouls99',
    type: 'casual',
    rating: 5.0,
    reviewCount: 10,
    joined: '10 years on Carousell',
    verified: true,
  },
  reviews: casualReviews(),
  dealMethods: [CAROUSELL_DELIVERY, MEETUP_QUEENSTOWN],
}

// ─────────────────────────────────────────────────────────────
// 2) Graded single · casual seller · 2 photos · partial info
// Source: psa-10-bubble-mew-ex-347-special-art-rare-sar
// ─────────────────────────────────────────────────────────────
const gradedCasual2: ListingData = {
  id: 'graded-casual-2photo',
  itemType: 'graded-single',
  title: 'PSA 10 Bubble Mew ex #347 Special Art Rare (SAR)',
  setName: 'Scarlet & Violet 151',
  condition: 'Brand new',
  conditionNote: 'Graded PSA 10. Case in mint condition, no scratches.',
  price: 'S$1,330',
  originalPrice: 'S$1,500',
  goodDeal: true,
  promos: [
    { title: "Buy 2 get 5% off", sub: "23 hours left", urgent: true },
    { title: "Buy 2 get 5% off", sub: "For new followers, capped at $5" },
  ],
  grading: { company: 'PSA', grade: '10' },
  bnpl: 'From S$110.83/mo with PayLater or Atome',
  completeness: 'partial',
  images: [
    'https://media.karousell.com/media/photos/products/2026/5/26/psa_10_bubble_mew_ex_347_speci_1779818025_414b4c18.jpg',
    'https://media.karousell.com/media/photos/products/2026/5/31/psa_10_bubble_mew_ex_347_speci_1780200431_a5683cb8_progressive.jpg',
  ],
  attributes: [
    { label: 'Game', value: 'Pokémon', tier: 'required' },
    { label: 'Set', value: 'Scarlet & Violet 151', tier: 'required' },
    { label: 'Card Number', value: '347', tier: 'required' },
    { label: 'Language', value: 'English', tier: 'required' },
    { label: 'Rarity', value: 'Special Art Rare (SAR)', tier: 'required' },
    { label: 'Graded', value: 'PSA 10', tier: 'required' },
    { label: 'Set ID', value: 'MEW', tier: 'optional' },
    { label: 'Finish', value: 'Holo', tier: 'optional' },
    { label: 'Year', value: '2023', tier: 'optional' },
    { label: 'Card Type', value: 'Pokémon', tier: 'hidden' },
    { label: 'Stage', value: 'Basic', tier: 'hidden' },
  ],
  description: 'PSA 10 Bubble Mew ex (#347) from the 151 set. Buy with confidence.',
  seller: {
    name: 'reub08',
    handle: 'reub08',
    type: 'casual',
    rating: 4.9,
    reviewCount: 77,
    joined: '12 years on Carousell',
    responsiveness: 'Accommodating and responsive',
    verified: true,
  },
  reviews: casualReviews(),
  dealMethods: [CAROUSELL_DELIVERY, MEETUP_BISHAN],
}

// ─────────────────────────────────────────────────────────────
// 3) Graded single · PRO seller · full attribute set
// Source: pokemon-tcg-aegislash-v-full-art-...-psa-10 (Carousell Global)
// ─────────────────────────────────────────────────────────────
const gradedPro: ListingData = {
  id: 'graded-pro',
  itemType: 'graded-single',
  title: 'Pokémon TCG: Aegislash V (Full Art) 177/185 Vivid Voltage Holo PSA 10',
  setName: 'Sword & Shield — Vivid Voltage',
  condition: 'Like new',
  conditionNote: 'Graded PSA 10 GEM MT. Full Art. A video recording of unboxing is required for verification.',
  price: 'S$131',
  goodDeal: true,
  promos: [
    { title: 'Buy 2 get 5% off', sub: '23 hours left', urgent: true },
    { title: 'Buy 2 get 5% off', sub: 'For new followers, capped at $5' },
  ],
  grading: { company: 'PSA', grade: '10' },
  bnpl: 'From S$10.92/mo with PayLater or Atome',
  completeness: 'full',
  images: [
    '/aegislash-front.jpg',
    '/aegislash-back.jpg',
  ],
  attributes: [
    { label: 'Game', value: 'Pokémon TCG', tier: 'required' },
    { label: 'Set', value: 'Vivid Voltage', tier: 'required' },
    { label: 'Card Number', value: '177/185', tier: 'required' },
    { label: 'Language', value: 'English', tier: 'required' },
    { label: 'Rarity', value: 'Ultra Rare', tier: 'required' },
    { label: 'Graded', value: 'PSA 10', tier: 'required' },
    { label: 'Set ID', value: 'SWSH04', tier: 'optional' },
    { label: 'Artist', value: 'aky CG Works', tier: 'optional' },
    { label: 'Finish', value: 'Holo', tier: 'optional' },
    { label: 'Year', value: '2020', tier: 'optional' },
    { label: 'Card Type', value: 'Pokémon', tier: 'hidden' },
    { label: 'Stage', value: 'Basic', tier: 'hidden' },
    { label: 'HP', value: '210', tier: 'hidden' },
    { label: 'Features', value: 'Full Art · V', tier: 'hidden' },
  ],
  description:
    `All slabs are carefully sourced and benchmarked against recent market comps.
*PRICES ARE JUST A PLACEHOLDER (adjusted according to market movement when needed.)

• Slab number and barcode are partially censored for privacy
• Physical photos available upon request to review the condition of the slab before purchase
• Prices are fixed and non-negotiable
• Market-based pricing may be updated over time
• Self-collection available at Pasir Ris (under my block)
• Tracked mailing available at buyer's cost
• Self-collection may also be possible at card shows, subject to availability

Follow our page for more slab drops, collector pieces, and premium Pokémon listings.`,
  seller: {
    name: 'Carousell Global',
    handle: 'carousellglobal',
    type: 'pro',
    rating: 5.0,
    reviewCount: 312,
    joined: 'Carousell Preferred Merchant',
    responsiveness: 'Very responsive',
    verified: true,
    preferred: true,
  },
  reviews: proReviews(),
  dealMethods: [{ ...CAROUSELL_DELIVERY, detail: 'Free tracked delivery · est. 5-9 working days' }, MEETUP_QUEENSTOWN],
}

// ─────────────────────────────────────────────────────────────
// 4) Box · casual/small seller · sealed ETB
// Source: shrinked-fusion-strike-pc-etb
// ─────────────────────────────────────────────────────────────
const boxCasual: ListingData = {
  id: 'box-casual',
  itemType: 'box',
  title: 'Shrinked Fusion Strike Pokémon Center Elite Trainer Box (Mew / Gengar)',
  setName: 'Fusion Strike',
  condition: 'Brand new',
  conditionNote: 'Sealed. Minor shrink-wrap tear, contents untouched.',
  price: 'S$699',
  goodDeal: false,
  bnpl: 'From S$58.25/mo with PayLater or Atome',
  completeness: 'partial',
  images: [
    'https://media.karousell.com/media/photos/products/2026/5/13/shrinked_fusion_strike_pc_etb__1778658534_6314f849.jpg',
  ],
  attributes: [
    { label: 'Game', value: 'Pokémon', tier: 'required' },
    { label: 'Set', value: 'Fusion Strike', tier: 'required' },
    { label: 'Language', value: 'English', tier: 'required' },
    { label: 'Product Type', value: 'Elite Trainer Box (ETB)', tier: 'required' },
    { label: 'Edition', value: 'Pokémon Center', tier: 'optional' },
    { label: 'Year', value: '2021', tier: 'optional' },
    { label: 'Sealed', value: 'Yes (shrink tear)', tier: 'required' },
  ],
  description: '1x Fusion Strike PC ETB (shrink tear) — $699. Pokémon Center exclusive Elite Trainer Box.',
  seller: {
    name: 'D Tcg',
    handle: 'dltcg',
    type: 'casual',
    rating: 4.8,
    reviewCount: 22,
    joined: '6 years on Carousell',
    verified: true,
  },
  reviews: casualReviews(),
  dealMethods: [{ ...CAROUSELL_DELIVERY, detail: '2-4 working days · Tracked' }, MEETUP_BISHAN],
}

// ─────────────────────────────────────────────────────────────
// 5) Booster box · PRO merchant · pre-order (Cloudflare-blocked → slug + typical data)
// Source: pokemon-pitch-black-booster-box-bb-me5-english (Carousell Preferred Merchant)
// ─────────────────────────────────────────────────────────────
const boosterBoxPro: ListingData = {
  id: 'booster-box-pro',
  itemType: 'box',
  title: '❤️ Pre-order ❤️ Pokémon Pitch-Black Booster Box (ME5) English',
  setName: 'Mega Evolution — Pitch-Black (ME5)',
  condition: 'Brand new',
  conditionNote: 'Factory sealed. Pre-order — ships on release.',
  price: 'S$215',
  originalPrice: 'S$259',
  goodDeal: true,
  promos: [
    { title: 'Buy 2 get 5% off', sub: '23 hours left', urgent: true },
    { title: 'Buy 2 get 5% off', sub: 'For new followers, capped at $5' },
  ],
  bnpl: 'From S$17.92/mo with PayLater or Atome',
  completeness: 'partial',
  images: [
    'https://media.karousell.com/media/photos/products/2026/5/13/shrinked_fusion_strike_pc_etb__1778658534_6314f849.jpg',
  ],
  attributes: [
    { label: 'Game', value: 'Pokémon', tier: 'required' },
    { label: 'Set', value: 'Pitch-Black', tier: 'required' },
    { label: 'Set ID', value: 'ME5', tier: 'optional' },
    { label: 'Language', value: 'English', tier: 'required' },
    { label: 'Product Type', value: 'Booster Box (36 packs)', tier: 'required' },
    { label: 'Release', value: 'Pre-order', tier: 'required' },
    { label: 'Sealed', value: 'Yes (factory)', tier: 'required' },
  ],
  description:
    `🏆 Top 1 in Toys and game category (Carousell certified ✅ )

❤️ Welcome you to preorder with Carousell only Pokemon TCG Recommended seller and 2025 Specialist Award Winner to ensure a peace of mind❤️

1 BB $350
1 BB CASE - $2070

💯 % Authentic Sealed Product
🚚 3 day shipping $8, every week one time or lalamove immediately
🏠 Self Collect at 569880

Price fluctuates everyday so check back everyday for the best price, once paid, price is locked regardless.`,
  seller: {
    name: 'TCG Prime SG',
    handle: 'tcgprimesg',
    type: 'pro',
    rating: 4.9,
    reviewCount: 1840,
    joined: 'Carousell Preferred Merchant',
    responsiveness: 'Very responsive',
    verified: true,
    preferred: true,
  },
  reviews: proReviews(),
  dealMethods: [{ ...CAROUSELL_DELIVERY, detail: 'Ships on release · Tracked' }, MEETUP_BISHAN],
}

// ─────────────────────────────────────────────────────────────
// 6) Raw single · casual seller · minimal info
// Source: pokemon-card-gengar-ex-japanese
// ─────────────────────────────────────────────────────────────
const rawCasual: ListingData = {
  id: 'raw-casual',
  itemType: 'raw-single',
  title: 'Pokémon Card Gengar EX Japanese',
  setName: undefined,
  condition: 'Like new',
  conditionNote: 'Very shiny, no visible whitening on edges. Stored in sleeve + toploader.',
  price: 'S$550',
  goodDeal: false,
  bnpl: 'From S$45.83/mo with PayLater or Atome',
  completeness: 'minimum',
  images: [
    'https://media.karousell.com/media/photos/products/2026/6/3/pokemon_card_gengar_ex_japanes_1780494855_a788fd60.jpg',
    'https://media.karousell.com/media/photos/products/2026/6/3/pokemon_card_gengar_ex_japanes_1780494855_c340667b_progressive.jpg',
  ],
  attributes: [
    { label: 'Game', value: 'Pokémon', tier: 'required' },
    { label: 'Language', value: 'Japanese', tier: 'required' },
  ],
  description:
    'Japanese Gengar EX Pokémon Card — Full Art — Very Shiny — Excellent addition to any collection. Feel free to ask any questions.',
  seller: {
    name: 're ee',
    handle: 'acmc200',
    type: 'casual',
    rating: 4.9,
    reviewCount: 128,
    joined: '9 years on Carousell',
    verified: true,
  },
  reviews: casualReviews(),
  dealMethods: [CAROUSELL_DELIVERY, MEETUP_QUEENSTOWN],
}

export const SCENARIOS: ListingData[] = [
  // Casual first
  gradedCasual,
  rawCasual,
  gradedCasual2,
  boxCasual,
  // Pro last
  gradedPro,
  boosterBoxPro,
]

export const SCENARIO_LABELS: Record<string, string> = {
  'graded-casual': 'Graded · casual · minimal',
  'raw-casual': 'Raw single · casual · minimal',
  'graded-casual-2photo': 'Graded · casual · full attributes',
  'box-casual': 'Box · casual',
  'graded-pro': 'Graded · pro · full attributes',
  'booster-box-pro': 'Box · pro · pre-order',
}

export function getScenario(id: string): ListingData {
  return SCENARIOS.find((s) => s.id === id) ?? SCENARIOS[0]
}
