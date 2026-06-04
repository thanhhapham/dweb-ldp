import { useEffect, useState, useCallback } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import type { ViewConfig, LayoutId, DealConfig } from './data/schema'
import { getScenario } from './data/scenarios'
import { LdpPage } from './layouts'
import { ControlPanel } from './ControlPanel'

const DEFAULT: ViewConfig = {
  scenario: 'graded-casual',
  layout: 'v1',
  showBuy: true,
  deal: 'both',
  bnpl: true,
  stickyCta: false,
  promo: true,
}

function readUrl(): { config: ViewConfig; panel: boolean } {
  const p = new URLSearchParams(window.location.search)
  return {
    config: {
      scenario: p.get('s') ?? DEFAULT.scenario,
      layout: (p.get('l') as LayoutId) ?? DEFAULT.layout,
      showBuy: p.get('buy') !== '0',
      deal: (p.get('deal') as DealConfig) ?? DEFAULT.deal,
      bnpl: p.get('bnpl') !== '0',
      stickyCta: p.get('sticky') === '1',
      promo: p.get('promo') !== '0',
    },
    panel: p.get('panel') !== '0',
  }
}

function writeUrl(c: ViewConfig, panel: boolean) {
  const p = new URLSearchParams()
  p.set('s', c.scenario)
  p.set('l', c.layout)
  if (!c.showBuy) p.set('buy', '0')
  if (c.deal !== DEFAULT.deal) p.set('deal', c.deal)
  if (!c.bnpl) p.set('bnpl', '0')
  if (!c.promo) p.set('promo', '0')
  if (c.stickyCta) p.set('sticky', '1')
  if (!panel) p.set('panel', '0')
  window.history.replaceState(null, '', `?${p.toString()}`)
}

export default function App() {
  const initial = readUrl()
  const [config, setConfig] = useState<ViewConfig>(initial.config)
  const [panel, setPanel] = useState(initial.panel)

  useEffect(() => { writeUrl(config, panel) }, [config, panel])

  const set = useCallback((patch: Partial<ViewConfig>) => setConfig((c) => {
    const next = { ...c, ...patch }
    // When buy is turned off → force meetup; when turned on → restore both
    if (patch.showBuy === false) next.deal = 'meetup'
    if (patch.showBuy === true) next.deal = 'both'
    return next
  }), [])
  const listing = getScenario(config.scenario)

  return (
    <div className="flex">
      {panel && (
        <div className="fixed left-0 top-0 z-50 h-screen w-[280px] shrink-0">
          <ControlPanel config={config} set={set} onHide={() => setPanel(false)} />
        </div>
      )}
      <main className={`min-w-0 flex-1 ${panel ? 'ml-[280px]' : ''}`}>
        {!panel && (
          <button
            onClick={() => setPanel(true)}
            className="fixed left-3 top-3 z-40 flex items-center gap-2 rounded-full bg-urbangrey-90 px-4 py-2 text-small font-bold text-white shadow-card hover:bg-urbangrey-80"
          >
            <SlidersHorizontal size={16} /> Controls
          </button>
        )}
        <LdpPage listing={listing} config={config} />
      </main>
    </div>
  )
}
