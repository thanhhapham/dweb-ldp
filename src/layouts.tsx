import type { ListingData, ViewConfig } from './data/schema'
import {
  TopNav, Breadcrumb, AdBanner, Gallery, TitleBlock, PriceBlock, CtaButtons,
  AttributesBlock, DescriptionBlock, DealMethodBlock, TransactionPanel, SellerBlock,
  WhatOthersSearch, SimilarListings, AdSidebar, StickyCtaBar, Footer, PaymentNotice, BuyerProtection, PromoCards,
} from './components/blocks'
import { Divider } from './components/ui'

// max-width:1440px, padding:0 64px — matches production D_fN + D_fP
const PAGE = 'mx-auto w-full max-w-page px-16'


// ── Baseline: production LDP ─────────────────────────────────
// Full-width cinematic gallery (blurred bg), then 1fr + 340px grid below.
// Matches production: D_Kx { grid-template-columns: 1fr 340px; gap: 24px }
function Baseline({ listing, config }: { listing: ListingData; config: ViewConfig }) {
  return (
    <>
      {/* Full-width gallery — no padding constraint, spans the full content width */}
      <div className={`${PAGE} py-4`}>
        <Gallery listing={listing} thumbs="full" />
      </div>

      {/* 1fr + 340px content grid below gallery */}
      <div className={`${PAGE} mt-4 grid grid-cols-1 gap-6 pb-8 lg:grid-cols-[1fr_340px]`}>
        {/* Left: listing details */}
        <div className="space-y-5 min-w-0">
          <TitleBlock listing={listing} config={config} compact />
          <PriceBlock listing={listing} config={config} compact />
          <CtaButtons config={config} />
          <Divider />
          <AttributesBlock listing={listing} />
          <Divider />
          <DescriptionBlock listing={listing} />
          <Divider />
          <DealMethodBlock listing={listing} config={config} />
        </div>

        {/* Right: sticky seller contact box (340px) */}
        <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <TransactionPanel listing={listing} config={config} />
          <AdSidebar />
        </div>
      </div>

      <div className={PAGE}>
        <Divider />
        <SellerBlock listing={listing} />
        <Divider />
        <WhatOthersSearch />
        <Divider />
        <SimilarListings />
      </div>
    </>
  )
}

// ── V1: 12-col grid ──────────────────────────────────────────
// Top:    col 1–6 gallery  |  col 7–12 details panel
// Bottom: col 1–9 seller   |  col 10–12 side ad
function V1({ listing, config }: { listing: ListingData; config: ViewConfig }) {
  return (
    <>
      {/* ── Top section: 6-6 split (gallery sticky bounded to this grid) ── */}
      <div className={`${PAGE} grid grid-cols-12 gap-6 py-4`}>
        <div className="col-span-6 sticky top-28 self-start">
          <Gallery listing={listing} thumbs="bottom" />
        </div>
        <div className="col-span-6 space-y-5">
          <TitleBlock listing={listing} config={config} />
          <PriceBlock listing={listing} config={config} />
          <Divider />
          <AttributesBlock listing={listing} preview />
          <Divider />
          <DescriptionBlock listing={listing} preview />
          <Divider />
          <DealMethodBlock listing={listing} config={config} />
          <Divider />
          {config.showBuy && <BuyerProtection />}
          <div className="sticky bottom-0 border-t border-stroke-boundary bg-white py-4">
            <CtaButtons config={config} />
          </div>
        </div>
      </div>

      {/* ── Bottom section: 9-3 split (separate grid — gallery no longer sticks here) ── */}
      <div className={`${PAGE} grid grid-cols-12 gap-6`}>
        <div className="col-span-9">
          <Divider />
          <SellerBlock listing={listing} />
          <PaymentNotice />
        </div>
        <div className="col-span-3 pt-6">
          <AdSidebar />
        </div>
      </div>

      <div className={PAGE}>
        <Divider />
        <WhatOthersSearch />
        <Divider />
        <SimilarListings />
      </div>
    </>
  )
}

// ── V2: 12-col grid ──────────────────────────────────────────
// Top:    col 1–6 gallery (sticky)  |  col 7–12 title + price + deal + buyer protection + sticky CTAs
// Bottom: col 1–9 "About this item" (attrs + desc + seller)  |  col 10–12 side ad
function V2({ listing, config }: { listing: ListingData; config: ViewConfig }) {
  return (
    <>
      {/* ── Top section: 6-6 split ── */}
      <div className={`${PAGE} grid grid-cols-12 gap-6 py-4`}>
        {/* Left (6): sticky gallery */}
        <div className="col-span-6 sticky top-28 self-start">
          <Gallery listing={listing} thumbs="bottom" />
        </div>

        {/* Right (6): title + price + deal method + CTAs + buyer protection */}
        <div className="col-span-6 flex flex-col gap-5">
          <TitleBlock listing={listing} config={config} />
          <PriceBlock listing={listing} config={config} />
          <Divider />
          <DealMethodBlock listing={listing} config={config} />
          <div className="border-t border-stroke-boundary pt-4">
            <CtaButtons config={config} />
          </div>
          {config.showBuy && <BuyerProtection />}
        </div>
      </div>

      {/* ── Bottom section: 9-3 split ── */}
      <div className={`${PAGE} grid grid-cols-12 gap-6`}>
        {/* Left (9): About this item → attributes + description → seller */}
        <div className="col-span-9">
          <Divider />
          <h2 className="mb-5 text-h3 font-semibold text-content-primary">About this item</h2>
          <AttributesBlock listing={listing} preview />
          <Divider />
          <DescriptionBlock listing={listing} preview />
          <Divider />
          <SellerBlock listing={listing} />
          <PaymentNotice />
        </div>

        {/* Right (3): side ad */}
        <div className="col-span-3 pt-6">
          <AdSidebar />
        </div>
      </div>

      <div className={PAGE}>
        <Divider />
        <WhatOthersSearch />
        <Divider />
        <SimilarListings />
      </div>
    </>
  )
}

// ── V3: 5+4+3 three-column grid ──────────────────────────────
// col 1–5:  gallery (sticky)
// col 6–9:  title + attributes + description
// col 10–12: transaction card — price + BNPL + shipping + CTAs + deal method (sticky)
// Below 9+3: meet the seller (9) + side ad (3)
function V3({ listing, config }: { listing: ListingData; config: ViewConfig }) {
  return (
    <>
      {/* ── Top 3-col section ── */}
      <div className={`${PAGE} grid grid-cols-12 gap-6 py-4`}>

        {/* Col 1–5: sticky gallery */}
        <div className="col-span-5 sticky top-28 self-start">
          <Gallery listing={listing} thumbs="bottom" />
        </div>

        {/* Col 6–9: title + promo + attributes + description */}
        <div className="col-span-4 space-y-5">
          <TitleBlock listing={listing} config={config} />
          <PromoCards config={config} />
          <Divider />
          <AttributesBlock listing={listing} preview />
          <Divider />
          <DescriptionBlock listing={listing} preview />
        </div>

        {/* Col 10–12: sticky transaction card (promos suppressed — shown in middle col) */}
        <div className="col-span-3 sticky top-28 self-start space-y-4">
          <TransactionPanel listing={listing} config={config} hidePromo />
          {config.showBuy && <BuyerProtection />}
        </div>

      </div>

      {/* ── Bottom 9+3: seller + side ad (same as V1) ── */}
      <div className={`${PAGE} grid grid-cols-12 gap-6`}>
        <div className="col-span-9">
          <Divider />
          <SellerBlock listing={listing} />
          <PaymentNotice />
        </div>
        <div className="col-span-3 pt-6">
          <AdSidebar />
        </div>
      </div>

      <div className={PAGE}>
        <Divider />
        <WhatOthersSearch />
        <Divider />
        <SimilarListings />
      </div>
    </>
  )
}

// ── V4: sticky bottom CTA bar ────────────────────────────────
// Same 2-col sticky-gallery layout as V1, but Buy/Add-to-cart moves
// into a persistent bar at the bottom of the viewport.
// The inline CTAs are hidden — price/actions live only in the bottom bar.
// ── V4: sticky bottom CTA bar ────────────────────────────────
// Same 12-col structure as V1 (6+6 top, 9+3 below) but CTAs live only
// in the persistent bottom bar — no inline CTAs in the right column.
function V4({ listing, config }: { listing: ListingData; config: ViewConfig }) {
  const v4config = { ...config, stickyCta: true }
  return (
    <>
      {/* ── Top section: 6-6 split ── */}
      <div className={`${PAGE} grid grid-cols-12 gap-6 py-4 pb-24`}>
        <div className="col-span-6 sticky top-28 self-start">
          <Gallery listing={listing} thumbs="bottom" />
        </div>
        <div className="col-span-6 space-y-5">
          <TitleBlock listing={listing} config={config} />
          <PriceBlock listing={listing} config={v4config} />
          {/* No inline CTAs — they live in the sticky bottom bar */}
          <Divider />
          <AttributesBlock listing={listing} preview />
          <Divider />
          <DescriptionBlock listing={listing} preview />
          <Divider />
          <DealMethodBlock listing={listing} config={v4config} />
          <Divider />
          {config.showBuy && <BuyerProtection />}
        </div>
      </div>

      {/* ── Bottom 9+3: seller + side ad ── */}
      <div className={`${PAGE} grid grid-cols-12 gap-6`}>
        <div className="col-span-9">
          <Divider />
          <SellerBlock listing={listing} />
          <PaymentNotice />
        </div>
        <div className="col-span-3 pt-6">
          <AdSidebar />
        </div>
      </div>

      <div className={PAGE}>
        <Divider />
        <WhatOthersSearch />
        <Divider />
        <SimilarListings />
      </div>

      <StickyCtaBar listing={listing} config={v4config} />
    </>
  )
}

const LAYOUT_MAP = { baseline: Baseline, v1: V1, v2: V2, v3: V3, v4: V4 } as const

export function LdpPage({ listing, config }: { listing: ListingData; config: ViewConfig }) {
  const Layout = LAYOUT_MAP[config.layout]
  return (
    <div className="min-h-screen bg-white pb-2 text-content-primary">
      <TopNav />
      <AdBanner />
      <Breadcrumb />
      <Layout listing={listing} config={config} />
      <Footer />
      {/* V4 renders its own sticky bar internally; the toggle adds it on top of other layouts */}
      {config.stickyCta && config.layout !== 'v4' && <StickyCtaBar listing={listing} config={config} />}
    </div>
  )
}
