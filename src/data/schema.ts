// ─────────────────────────────────────────────────────────────
// LISTING DATA SCHEMA  —  the *content* of a listing.
// Layouts/components consume this; changing a layout never touches data.
// ─────────────────────────────────────────────────────────────

export type ItemType = 'graded-single' | 'raw-single' | 'box' | 'pack'
export type SellerType = 'casual' | 'pro'

/** Attribute tiers per the TCG framework (CLAUDE.md + RESEARCH.md). */
export type AttrTier = 'required' | 'optional' | 'hidden'

export interface Attribute {
  label: string
  value: string
  tier: AttrTier
}

export interface GradingInfo {
  company: string // PSA, BGS, CGC
  grade: string // "10"
  certId?: string
}

export interface SellerInfo {
  name: string
  handle: string
  type: SellerType
  rating?: number
  reviewCount?: number
  joined?: string
  responsiveness?: string
  verified?: boolean
  avatarUrl?: string
  /** pro merchants show a shop badge */
  preferred?: boolean
}

export interface Review {
  author: string
  rating: number
  daysAgo: string
  text: string
  productTitle?: string
  productPrice?: string
}

export type DealMethodType = 'delivery' | 'meetup'

export interface DealMethodOption {
  type: DealMethodType
  label: string // "Carousell official delivery"
  detail?: string // "3-5 working days · Tracked"
  price?: string // "Free" | "$Fee"
  location?: string // meet-up location
}

export interface Promo {
  title: string   // "Buy 2 get 5% off"
  sub?: string    // "23 hours left" or "For new followers, capped at $5"
  urgent?: boolean // true → red clock icon
}

export interface ListingData {
  id: string
  itemType: ItemType
  title: string
  setName?: string // subtitle, e.g. "Scarlet & Violet 151"
  condition: string // "Brand new" | "Like new"
  /** Specific defects — RESEARCH.md flags this as the single most critical attribute */
  conditionNote?: string
  price: string // "S$1,350"
  originalPrice?: string // strikethrough
  goodDeal?: boolean
  grading?: GradingInfo
  /** BNPL line, e.g. "From RM10.50/mo with PayLater or Atome" */
  bnpl?: string
  images: string[]
  attributes: Attribute[]
  description: string
  seller: SellerInfo
  reviews: Review[]
  dealMethods: DealMethodOption[]
  promos?: Promo[]
  /** completeness hint for labelling in the control panel */
  completeness: 'minimum' | 'partial' | 'full'
}

// ─────────────────────────────────────────────────────────────
// VIEW CONFIG  —  the *presentation* state (chosen in the control panel).
// ─────────────────────────────────────────────────────────────

export type LayoutId = 'baseline' | 'v1' | 'v2' | 'v3' | 'v4'
export type DealConfig = 'delivery' | 'meetup' | 'both'

export interface ViewConfig {
  scenario: string
  layout: LayoutId
  showBuy: boolean
  deal: DealConfig
  bnpl: boolean
  stickyCta: boolean
  promo: boolean
}

export const LAYOUTS: { id: LayoutId; name: string; desc: string }[] = [
  { id: 'baseline', name: 'Baseline', desc: 'Current production LDP (control)' },
  { id: 'v1', name: 'V1', desc: 'Gallery sticky left + listing details right' },
  { id: 'v2', name: 'V2', desc: 'Gallery + details main, transaction sidebar' },
  { id: 'v3', name: 'V3', desc: 'Gallery | details | transaction panel' },
  { id: 'v4', name: 'V4', desc: 'Sticky bottom CTA bar' },
]

export const TIER_LABEL: Record<AttrTier, string> = {
  required: 'Required',
  optional: 'Optional',
  hidden: 'Extracted',
}
