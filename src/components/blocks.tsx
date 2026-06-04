import { useState, useEffect, useRef } from 'react'
import {
  Search, ShoppingCart, Bell, ChevronRight, Info,
  Truck, Wallet, ShieldCheck, MapPin, BadgeCheck, Percent, RotateCcw, Lock, Star, Clock,
} from 'lucide-react'
import type { ListingData, ViewConfig, Attribute } from '../data/schema'
import { TIER_LABEL } from '../data/schema'
import { Stars, Button, Section, Divider, Chip } from './ui'
import { cn } from '../lib/cn'

const PAGE = 'mx-auto w-full max-w-page px-16'

// ── Header ───────────────────────────────────────────────────
const NAV = ['Electronics', 'Fashion', 'Luxury', 'Services', 'Cars', 'Property']

export function TopNav() {
  const [searchVisible, setSearchVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      if (current > lastScrollY.current && current > 80) {
        setSearchVisible(false) // scrolling down
      } else {
        setSearchVisible(true)  // scrolling up
      }
      lastScrollY.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-30 border-b border-stroke-boundary bg-white">

      {/* Row 1: Logo · Nav links · Right icons — height:48px, padding:0 64px, gap:24px */}
      <div className={cn(PAGE, 'flex h-12 items-center')} style={{ gap: '24px' }}>
        <img
          src="https://mweb-cdn.karousell.com/build/carousell-logo-title-cd8e850233.svg"
          alt="Carousell"
          className="h-7 w-auto shrink-0"
        />
        {/* Nav links: height:48px, padding:0 12px, font:16px, no font-weight */}
        <nav className="hidden items-stretch md:flex">
          {NAV.map((n) => (
            <span key={n} className="flex h-12 cursor-pointer items-center whitespace-nowrap px-3 text-middle text-content-primary hover:text-content-interactive">
              {n}
            </span>
          ))}
          <span className="flex h-12 cursor-pointer items-center whitespace-nowrap px-3 text-middle text-content-secondary hover:text-content-interactive">
            ▦ All categories
          </span>
        </nav>
        {/* Right: user · cart · bell · sell */}
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden whitespace-nowrap text-middle text-content-primary sm:inline">Hi, Adele ▾</span>
          <ShoppingCart size={22} className="text-content-secondary" />
          <Bell size={22} className="text-content-secondary" />
          {/* Sell button: padding:8px 16px, font:16px, weight:600 */}
          <button className="rounded px-4 py-2 text-middle font-semibold bg-caroured-50 text-white hover:bg-caroured-60 leading-none">
            Sell
          </button>
        </div>
      </div>

      {/* Row 2: Search bar — hides on scroll down, reveals on scroll up */}
      <div
        className={cn(PAGE, 'flex items-stretch overflow-hidden transition-all duration-300 ease-in-out',
          searchVisible ? 'max-h-16 py-2 opacity-100' : 'max-h-0 py-0 opacity-0'
        )}
        style={{ gap: '20px' }}
      >
        {/* Search input: flex-grow:2, height:48px, border-radius:4px 0 0 4px */}
        <div
          className="flex h-12 items-center gap-2 bg-bg-input px-3 text-middle text-content-subdued"
          style={{ flexGrow: 2, flexBasis: 0, borderRadius: '4px 0 0 4px' }}
        >
          <Search size={18} className="shrink-0" />
          <span>Search Carousell</span>
        </div>
        {/* Location: flex-grow:1, height:48px, border-radius:0 4px 4px 0, 2px gap */}
        <div
          className="hidden h-12 items-center gap-2 bg-bg-input px-3 text-middle text-content-secondary md:flex"
          style={{ flexGrow: 1, flexBasis: 0, borderRadius: '0 4px 4px 0', marginLeft: '2px' }}
        >
          <MapPin size={16} className="shrink-0" /> All of Singapore
        </div>
        {/* Search button: height:48px, border-radius:4px */}
        <button
          className="h-12 shrink-0 bg-skyteal-80 px-6 text-middle font-semibold text-white hover:bg-skyteal-80/90"
          style={{ borderRadius: '4px' }}
        >
          Search
        </button>
      </div>

    </header>
  )
}

export function Breadcrumb() {
  return (
    <div className={cn(PAGE, 'flex items-center gap-1.5 py-3 text-small text-content-secondary')}>
      <span className="hover:text-skyteal-80">Hobbies & Toys</span>
      <ChevronRight size={14} />
      <span className="hover:text-skyteal-80">Toys & Games</span>
    </div>
  )
}

export function AdBanner() {
  return (
    <div className={cn(PAGE, 'py-2')}>
      <div className="text-center text-tiny text-content-subdued">Advertisement</div>
      <div className="mt-1 flex justify-center">
        <img
          src="/ad-top.png"
          alt="Advertisement"
          style={{ width: '970px', height: 'auto' }}
          onError={(e) => {
            const t = e.currentTarget
            t.style.display = 'none'
            t.nextElementSibling?.removeAttribute('style')
          }}
        />
        <div style={{ display: 'none', width: '970px' }} className="flex h-[90px] items-center justify-center rounded bg-gradient-to-r from-urbangrey-10 to-urbangrey-20 text-small text-content-subdued">
          970 × 90 ad slot
        </div>
      </div>
    </div>
  )
}

// ── Gallery ──────────────────────────────────────────────────
// thumbs='left'   → vertical thumbnail strip on left (V1/V4)
// thumbs='bottom' → horizontal strip below (V2/V3)
// thumbs='full'   → production baseline: full-width frame, blurred bg, thumbs inside left edge
export function Gallery({ listing, thumbs = 'left' }: { listing: ListingData; thumbs?: 'left' | 'bottom' | 'full' }) {
  const [active, setActive] = useState(0)
  const imgs = listing.images.length ? listing.images : ['']
  const main = imgs[active] || imgs[0]

  const Thumb = ({ src, i }: { src: string; i: number }) => (
    <button
      onClick={() => setActive(i)}
      className={cn(
        'shrink-0 overflow-hidden rounded-lg border-2 bg-white/20',
        i === active ? 'border-white' : 'border-transparent',
      )}
    >
      {src ? <img src={src} className="h-14 w-14 object-cover" /> : <div className="h-14 w-14" />}
    </button>
  )

  // Production-style full-width gallery (baseline)
  if (thumbs === 'full') {
    return (
      <div className="relative h-[342px] w-full overflow-hidden rounded-xl bg-urbangrey-90">
        {/* Blurred background */}
        {main && (
          <img
            src={main}
            className="absolute inset-0 h-full w-full object-cover opacity-40 blur-2xl scale-110"
            aria-hidden
          />
        )}
        {/* Thumbnail strip — left edge */}
        {imgs.length > 1 && (
          <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2 thin-scroll overflow-y-auto max-h-[400px]">
            {imgs.map((src, i) => <Thumb key={i} src={src} i={i} />)}
          </div>
        )}
        {/* Main image centered */}
        <div className="flex h-full items-center justify-center px-4">
          {main && (
            <img
              src={main}
              className="max-h-[310px] max-w-full rounded-xl object-contain drop-shadow-2xl"
            />
          )}
        </div>
      </div>
    )
  }

  // Standard 2-col / V-layout gallery
  const ThumbStd = ({ src, i }: { src: string; i: number }) => (
    <button
      onClick={() => setActive(i)}
      className={cn(
        'shrink-0 overflow-hidden rounded-lg border-2 bg-urbangrey-10',
        i === active ? 'border-skyteal-80' : 'border-transparent',
      )}
    >
      {src ? <img src={src} className="h-16 w-16 object-cover" /> : <div className="h-16 w-16" />}
    </button>
  )
  return (
    <div className={cn('flex gap-3', thumbs === 'bottom' && 'flex-col-reverse')}>
      <div className={cn('flex gap-2 thin-scroll', thumbs === 'left' ? 'flex-col overflow-y-auto max-h-[520px]' : 'flex-row overflow-x-auto')}>
        {imgs.map((src, i) => <ThumbStd key={i} src={src} i={i} />)}
      </div>
      <div className="relative flex-1">
        {/* 4:3 landscape ratio — image ~483px tall at 644px col width.
            With thumbnails (72px) + nav/padding (~144px) = ~700px total,
            fitting within any viewport ≥768px so thumbnails stay visible when sticky. */}
        <div className="aspect-[5/4] w-full overflow-hidden rounded-xl bg-urbangrey-10">
          {main ? <img src={main} className="h-full w-full object-contain" /> : null}
        </div>
      </div>
    </div>
  )
}

// ── Title + price ────────────────────────────────────────────
// compact=true → baseline (H3 title, Middle subtitle)
// compact=false → redesign variants (H2 title, Large subtitle)
export function TitleBlock({ listing, config, compact = false }: { listing: ListingData; config?: ViewConfig; compact?: boolean }) {
  return (
    <div>
      {/* Buyer Protection — only shown when Buy is enabled */}
      {(config?.showBuy !== false) && (
        <span className="mb-2 inline-flex items-center rounded bg-urbangrey-90 px-2 py-1 text-tiny font-semibold text-white">
          Buyer Protection
        </span>
      )}
      <h1 className={cn('mt-2 font-semibold leading-tight text-content-primary', compact ? 'text-h3' : 'text-h2')}>
        {listing.grading ? `${listing.grading.company} ${listing.grading.grade} ${listing.title}` : listing.title}
      </h1>
      {listing.setName && (
        <p className={cn('mt-1 text-content-secondary', compact ? 'text-middle' : 'text-large')}>
          {listing.setName}
        </p>
      )}
      <div className="mt-2 flex items-center gap-2 text-middle">
        <span className="font-semibold text-content-interactive">@{listing.seller.handle}</span>
        {listing.seller.rating != null && (
          <>
            <span className="text-content-primary">{listing.seller.rating.toFixed(1)}</span>
            <Stars rating={listing.seller.rating} />
            <span className="text-content-secondary">({listing.seller.reviewCount} reviews)</span>
          </>
        )}
      </div>
    </div>
  )
}

// compact=true → baseline (H1 semibold)
// compact=false → redesign variants (H3 regular)
// compact=true → H1 semibold (baseline); callout=true → Small semibold (V3 panel); default → H3 regular
export function PriceBlock({ listing, config, compact = false, callout = false, hidePromo = false }: { listing: ListingData; config: ViewConfig; compact?: boolean; callout?: boolean; hidePromo?: boolean }) {
  const priceClass = compact ? 'text-h1 font-semibold' : callout ? 'text-h3 font-semibold' : 'text-h3'
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className={cn(priceClass, 'text-content-primary')}>{listing.price}</span>
        {listing.originalPrice && (
          <span className="text-large text-content-subdued line-through">{listing.originalPrice}</span>
        )}
      </div>
      {config.bnpl && listing.bnpl && (
        <p className="flex items-center gap-2 text-small text-content-secondary">
          <Wallet size={16} className="text-content-secondary" /> {listing.bnpl}
        </p>
      )}
      {config.showBuy && config.deal !== 'meetup' && (
        <p className="flex items-center gap-2 text-small text-content-secondary">
          <Truck size={16} /> Free delivery, within 2-3 working days
        </p>
      )}
      {!hidePromo && <PromoCards config={config} />}
    </div>
  )
}

export function PromoCards({ config }: { config: ViewConfig }) {
  if (!config.promo) return null
  return (
    <div className="flex w-full items-center gap-2 overflow-hidden">
      {[
        { title: 'Buy 2 get 5% off', sub: '23 hours left', urgent: true },
        { title: 'Buy 2 get 5% off', sub: 'For new followers, capped at $5', urgent: false },
      ].map((p, i) => (
        <div key={i} className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-stroke-boundary bg-white px-3 py-3">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#00C671]/10">
            <Percent size={14} className="text-[#00C671]" />
          </div>
          <div className="h-7 w-px shrink-0 bg-stroke-boundary" />
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="text-small font-semibold text-content-primary">{p.title}</div>
            <div className={cn('flex items-center gap-1 text-tiny', p.urgent ? 'text-red-700' : 'text-content-secondary')}>
              {p.urgent && <Clock size={10} className="shrink-0" />}
              <span className="truncate">{p.sub}</span>
            </div>
          </div>
        </div>
      ))}
      <ChevronRight size={20} className="shrink-0 text-content-secondary" />
    </div>
  )
}

// ── CTAs ─────────────────────────────────────────────────────
// showBuy=true  → Add to cart (outline) + Buy (primary)
// showBuy=false → Make offer (outline) + Chat (primary)
export function CtaButtons({ config, compact }: { config: ViewConfig; compact?: boolean }) {
  return (
    <div className={cn('flex gap-3', compact && 'flex-col')}>
      {config.showBuy ? (
        <>
          <Button variant="outline" full className="flex-1">Add to cart</Button>
          <Button variant="primary" full className="flex-1">Buy</Button>
        </>
      ) : (
        <>
          <Button variant="outline" full className="flex-1">Make offer</Button>
          <Button variant="primary" full className="flex-1">Chat</Button>
        </>
      )}
    </div>
  )
}

// ── Attributes (Details) ─────────────────────────────────────
function AttrCell({ a }: { a: Attribute }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-small text-content-secondary">
        {a.label}
        {a.tier === 'hidden' && (
          <span className="rounded bg-urbangrey-10 px-1 text-[9px] font-semibold text-content-subdued">{TIER_LABEL.hidden}</span>
        )}
      </div>
      <div className="text-middle text-content-primary">{a.value}</div>
    </div>
  )
}

// preview=true → show max 6 attrs (3 rows) + "Show all details" button
export function AttributesBlock({ listing, preview = false }: { listing: ListingData; preview?: boolean }) {
  const [open, setOpen] = useState(false)
  const visible = listing.attributes.filter((a) => a.tier !== 'hidden')
  const hidden = listing.attributes.filter((a) => a.tier === 'hidden')
  // preview mode: cap at 6 visible (3 rows × 2 cols); full mode: existing expand behaviour
  const previewCap = 6
  const shownAttrs = preview
    ? (open ? visible : visible.slice(0, previewCap))
    : (open ? listing.attributes : visible)
  const hasMore = preview ? visible.length > previewCap : hidden.length > 0
  return (
    <Section title="Details">
      {/* Condition: hide for graded cards; show for raw/box but no explainer note */}
      {!listing.grading && (
        <div className="mb-4">
          <div className="text-small text-content-secondary">Condition</div>
          <div className="flex items-center gap-1.5 text-middle text-content-primary">
            {listing.condition} <Info size={16} className="text-content-subdued" />
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {shownAttrs.map((a, i) => <AttrCell key={i} a={a} />)}
      </div>
      {hasMore && (
        <button
          onClick={() => setOpen(!open)}
          className="mt-4 text-middle font-semibold text-content-interactive"
        >
          {open
            ? 'Show less'
            : preview
              ? 'Show all details'
              : `Read more (${hidden.length} auto-detected)`}
        </button>
      )}
    </Section>
  )
}

// preview=true → 3-line clamp + "Read more" (text-middle); false → full text (text-large)
export function DescriptionBlock({ listing, preview = false }: { listing: ListingData; preview?: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <Section title="Description">
      <p className={cn(
        'whitespace-pre-line leading-relaxed text-content-primary',
        preview ? 'text-middle' : 'text-large',
        preview && !open && 'line-clamp-3',
      )}>
        {listing.description}
      </p>
      {preview && (
        <button
          onClick={() => setOpen(!open)}
          className="mt-2 text-middle font-semibold text-content-interactive"
        >
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
    </Section>
  )
}

// ── Deal method ──────────────────────────────────────────────
export function DealMethodBlock({ listing, config }: { listing: ListingData; config: ViewConfig }) {
  const methods = listing.dealMethods.filter((m) => {
    if (!config.showBuy) return m.type === 'meetup'
    return config.deal === 'both' ? true : m.type === config.deal
  })
  if (!methods.length) return null

  // Build inline summary: "Carousell official delivery, Meet up at [location]"
  const parts = methods.map((m) =>
    m.type === 'meetup' && m.location
      ? { text: 'Meet up at ', location: m.location }
      : { text: m.label, location: null }
  )

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-large font-semibold text-content-primary">Deal method</h3>
        <ChevronRight size={18} className="text-content-secondary" />
      </div>
      <p className="mt-1 text-middle text-content-secondary">
        {parts.map((p, i) => (
          <span key={i}>
            {i > 0 && ', '}
            {p.text}
            {p.location && (
              <span className="text-content-interactive">{p.location}</span>
            )}
          </span>
        ))}
      </p>
    </div>
  )
}

// ── Transaction panel (used in rails for V2 / V3) ────────────
export function TransactionPanel({ listing, config, hidePromo = false, calloutPrice = false }: { listing: ListingData; config: ViewConfig; hidePromo?: boolean; calloutPrice?: boolean }) {
  return (
    <div className="space-y-4 rounded-xl border border-stroke-boundary p-4">
      <PriceBlock listing={listing} config={config} hidePromo={hidePromo} callout={calloutPrice} />
      <CtaButtons config={config} compact />
      <Divider />
      <DealMethodBlock listing={listing} config={config} />
    </div>
  )
}

// ── Seller contact card (compact — used in V2 right rail) ────
export function SellerContactCard({ listing, config }: { listing: ListingData; config: ViewConfig }) {
  const s = listing.seller
  return (
    <div className="rounded-xl border border-stroke-boundary bg-white p-4 shadow-sm space-y-4">
      {/* Seller info */}
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-skyteal-80/10 text-large font-semibold text-skyteal-80">
          {s.name.slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-middle text-content-primary">{s.name}</div>
          <div className="flex items-center gap-1 text-small text-content-secondary">
            <span>@{s.handle}</span>
            {s.verified && <BadgeCheck size={14} className="text-blue-500 shrink-0" />}
          </div>
          {s.rating != null && (
            <div className="flex items-center gap-1.5 text-small">
              <span className="text-content-primary">{s.rating.toFixed(1)}</span>
              <Stars rating={s.rating} />
              <span className="text-content-secondary">({s.reviewCount} reviews)</span>
            </div>
          )}
        </div>
      </div>
      {/* CTAs */}
      <CtaButtons config={config} compact />
    </div>
  )
}

// ── Seller + reviews ─────────────────────────────────────────
export function SellerBlock({ listing }: { listing: ListingData }) {
  const s = listing.seller
  return (
    <Section title="About this seller">
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-skyteal-80/10 text-large font-semibold text-skyteal-80">
              {s.name.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-content-primary">{s.name}</div>
              <div className="text-small text-content-secondary">@{s.handle}</div>
            </div>
          </div>
          <div className="mt-3 space-y-1 text-small text-content-secondary">
            <div>Singapore</div>
            <div>{s.joined}</div>
            {s.preferred && <div className="font-semibold text-skyteal-80">⭐ Carousell Preferred</div>}
            {s.responsiveness && <div className="flex items-center gap-1 text-skyteal-80">● {s.responsiveness}</div>}
            {s.verified && <div className="flex items-center gap-1"><BadgeCheck size={14} className="text-skyteal-80" /> Verified</div>}
          </div>
          <div className="mt-3 flex gap-2">
            <Button variant="outline" className="flex-1 py-2 text-small">Make offer</Button>
            <Button variant="outline" className="flex-1 py-2 text-small">Chat</Button>
          </div>
        </div>
        <div>
          <div className="mb-3 flex items-center gap-2 text-small">
            <span className="font-semibold text-content-primary">Reviews for @{s.handle}</span>
            <span>{s.rating?.toFixed(1)}</span>
            <Stars rating={s.rating ?? 5} />
            <span className="text-content-secondary">({s.reviewCount})</span>
          </div>
          <div className="space-y-4">
            {listing.reviews.map((r, i) => (
              <div key={i} className="text-small">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-content-primary">@{r.author}</span>
                  <Stars rating={r.rating} size={12} />
                  <span className="text-content-subdued">· {r.daysAgo}</span>
                </div>
                <p className="mt-1 text-content-primary">{r.text}</p>
                {r.productTitle && (
                  <div className="mt-2 flex items-center gap-2 rounded-lg bg-urbangrey-10 p-2">
                    <div className="h-9 w-9 rounded bg-urbangrey-20" />
                    <div className="text-tiny text-content-secondary">
                      <div className="text-content-primary">{r.productTitle}</div>
                      <div>{r.productPrice}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className="mt-3 text-small font-semibold text-content-interactive">Read all reviews ›</button>
        </div>
      </div>
    </Section>
  )
}

// ── Buyer protection ─────────────────────────────────────────
export function BuyerProtection({ compact }: { compact?: boolean }) {
  const rows = [
    { icon: Lock, text: 'Lost/damaged package coverage' },
    { icon: RotateCcw, text: 'Returns and refunds' },
    { icon: ShieldCheck, text: 'Risk-free payment' },
  ]
  return (
    <div className={cn(!compact && 'rounded-xl bg-urbangrey-10 p-4')}>
      <h3 className="mb-2 text-large font-semibold text-content-primary">Buyer Protection</h3>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-2 text-small text-content-secondary">
            <r.icon size={16} className="text-skyteal-80" /> {r.text}
          </div>
        ))}
      </div>
      <button className="mt-2 text-small font-semibold text-content-interactive">Learn more</button>
    </div>
  )
}

export function WhatOthersSearch() {
  const terms = ['pokemon 151', 'psa 10', 'charizard', 'booster box', 'mew ex', 'vivid voltage', 'graded card', 'japanese pokemon']
  return (
    <Section title="What others also search for">
      <div className="flex flex-wrap gap-2">{terms.map((t) => <Chip key={t}>{t}</Chip>)}</div>
    </Section>
  )
}

export function SimilarListings() {
  return (
    <Section title="Similar marketplace listings">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-stroke-boundary">
            <div className="aspect-square bg-urbangrey-10" />
            <div className="p-2">
              <div className="truncate text-small text-content-primary">PSA 10 Graded Card #{i + 1}</div>
              <div className="text-small font-semibold text-content-primary">S${(120 + i * 30)}</div>
              <div className="text-tiny text-content-secondary">Like new</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function AdSidebar() {
  return (
    <div className="space-y-1">
      <div className="text-center text-tiny text-content-subdued">Advertisement</div>
      <div className="overflow-hidden rounded-xl">
        <img
          src="/ad-side.png"
          alt="Advertisement"
          className="w-full object-cover"
          onError={(e) => {
            const t = e.currentTarget
            t.style.display = 'none'
            t.nextElementSibling?.removeAttribute('style')
          }}
        />
        <div style={{ display: 'none' }} className="grid h-[420px] place-items-center rounded-xl bg-gradient-to-b from-deepblue-50/80 to-deepblue-50 text-small text-white">
          300 × 420 ad slot
        </div>
      </div>
    </div>
  )
}

// ── Sticky bottom CTA bar (V4 toggle) ────────────────────────
export function StickyCtaBar({ listing, config }: { listing: ListingData; config: ViewConfig }) {
  const meet = listing.dealMethods.find((m) => m.type === 'meetup')
  const del = listing.dealMethods.find((m) => m.type === 'delivery')
  return (
    <div className="sticky bottom-0 z-30 border-t border-stroke-boundary bg-white shadow-sticky">
      <div className={cn(PAGE, 'flex items-center gap-10 py-3')}>
        {del && (config.deal === 'delivery' || config.deal === 'both') && (
          <div className="hidden text-small sm:block">
            <div className="font-semibold text-content-primary">{del.label}</div>
            {/* detail + price on the same line */}
            <div className="text-content-secondary">
              {[del.detail, del.price].filter(Boolean).join(' · ')}
            </div>
          </div>
        )}
        {meet && (config.deal === 'meetup' || config.deal === 'both') && (
          <div className="hidden text-small md:block">
            <div className="font-semibold text-content-primary">Meet-up</div>
            <div className="text-content-interactive">{meet.location}</div>
          </div>
        )}
        <div className="ml-auto flex items-center gap-3">
          <span className="text-h3 text-content-primary sm:hidden">{listing.price}</span>
          <Button variant="outline" className="px-8">Add to cart</Button>
          {config.showBuy && <Button variant="primary" className="px-10">Buy</Button>}
        </div>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="mt-10 border-t border-stroke-boundary bg-urbangrey-10">
      <div className={cn(PAGE, 'py-8 text-small text-content-secondary')}>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {['Property', 'Cars', 'Mobile & Gadgets', 'Hobbies & Toys', 'Luxury', 'Help Centre', 'Terms', 'Privacy'].map((x) => (
            <span key={x} className="hover:text-skyteal-80">{x}</span>
          ))}
        </div>
        <div className="mt-4 text-tiny text-content-subdued">© 2026 Carousell · Prototype for research</div>
      </div>
    </footer>
  )
}

export function PaymentNotice() {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-3 rounded-xl bg-urbangrey-10 p-3 text-small">
        <span className="rounded bg-deepblue-50 px-1.5 py-0.5 text-tiny font-semibold text-white">PayNow</span>
        <div>
          <div className="font-semibold text-content-primary">New payment method available</div>
          <div className="text-content-secondary">Tap 'Buy' and choose PayNow as your payment method</div>
        </div>
        <ChevronRight size={18} className="ml-auto text-content-secondary" />
      </div>
    </div>
  )
}

export { Star }
