import { useState } from 'react'
import { Link2, Check, PanelLeftClose, SlidersHorizontal } from 'lucide-react'
import type { ViewConfig, DealConfig, LayoutId } from './data/schema'
import { LAYOUTS } from './data/schema'
import { SCENARIOS, SCENARIO_LABELS } from './data/scenarios'
import { cn } from './lib/cn'

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="text-tiny font-semibold uppercase tracking-wide text-content-subdued">{label}</div>
      {children}
    </div>
  )
}

function Opt({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full rounded-md px-3 py-2 text-left text-small transition-colors',
        active ? 'bg-skyteal-80 text-white' : 'bg-white text-content-primary hover:bg-urbangrey-10 border border-stroke-boundary',
      )}
    >
      {children}
    </button>
  )
}

function Toggle({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!on)} className="flex w-full items-center justify-between rounded-md border border-stroke-boundary bg-white px-3 py-2 text-small">
      <span className="text-content-primary">{label}</span>
      <span className={cn('relative h-5 w-9 rounded-full transition-colors', on ? 'bg-skyteal-80' : 'bg-urbangrey-20')}>
        <span className={cn('absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all', on ? 'left-[18px]' : 'left-0.5')} />
      </span>
    </button>
  )
}

export function ControlPanel({
  config,
  set,
  onHide,
}: {
  config: ViewConfig
  set: (patch: Partial<ViewConfig>) => void
  onHide: () => void
}) {
  const [copied, setCopied] = useState(false)
  const copyLink = () => {
    navigator.clipboard?.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  const deals: DealConfig[] = ['both', 'delivery', 'meetup']
  return (
    <aside className="flex h-screen w-[280px] flex-col gap-4 overflow-y-auto border-r border-stroke-boundary bg-urbangrey-10 p-4 thin-scroll">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-content-primary">
          <SlidersHorizontal size={16} /> Prototype controls
        </div>
        <button onClick={onHide} title="Hide panel" className="text-content-secondary hover:text-content-primary">
          <PanelLeftClose size={18} />
        </button>
      </div>

      {/* Layout chips — inline, no description */}
      <Group label="Layout">
        <div className="flex flex-wrap gap-1.5">
          {LAYOUTS.map((l) => (
            <button
              key={l.id}
              onClick={() => set({ layout: l.id as LayoutId })}
              className={cn(
                'rounded-full px-3 py-1 text-small transition-colors',
                config.layout === l.id
                  ? 'bg-skyteal-80 text-white'
                  : 'border border-stroke-boundary bg-white text-content-primary hover:bg-urbangrey-10',
              )}
            >
              {l.name}
            </button>
          ))}
        </div>
      </Group>

      <Group label="Scenario">
        <div className="space-y-1.5">
          {SCENARIOS.map((s) => (
            <Opt key={s.id} active={config.scenario === s.id} onClick={() => set({ scenario: s.id })}>
              {SCENARIO_LABELS[s.id]}
            </Opt>
          ))}
        </div>
      </Group>

      {/* Deal method hidden when buy is off — forced to meetup */}
      {config.showBuy && (
        <Group label="Deal method">
          <div className="grid grid-cols-3 gap-1.5">
            {deals.map((d) => (
              <Opt key={d} active={config.deal === d} onClick={() => set({ deal: d })}>
                <span className="capitalize">{d}</span>
              </Opt>
            ))}
          </div>
        </Group>
      )}

      <Group label="Variations">
        <Toggle label="Buy button" on={config.showBuy} onChange={(v) => set({ showBuy: v })} />
        <Toggle label="BNPL (PayLater/Atome)" on={config.bnpl} onChange={(v) => set({ bnpl: v })} />
        <Toggle label="Promo" on={config.promo} onChange={(v) => set({ promo: v })} />
      </Group>

      <button
        onClick={copyLink}
        className="mt-auto flex items-center justify-center gap-2 rounded-md bg-urbangrey-90 px-3 py-2.5 text-small font-semibold text-white hover:bg-urbangrey-80"
      >
        {copied ? <><Check size={16} /> Link copied</> : <><Link2 size={16} /> Copy shareable link</>}
      </button>
    </aside>
  )
}
