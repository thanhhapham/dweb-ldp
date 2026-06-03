import { Star } from 'lucide-react'
import { cn } from '../lib/cn'

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-[1px] align-middle">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i))
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="absolute text-urbangrey-20" fill="#F0F1F1" strokeWidth={0} />
            <span className="absolute overflow-hidden" style={{ width: `${fill * 100}%`, height: size }}>
              <Star size={size} className="text-skyteal-80" fill="#008F79" strokeWidth={0} />
            </span>
          </span>
        )
      })}
    </span>
  )
}

export function Pill({
  children,
  tone = 'good',
  className,
}: {
  children: React.ReactNode
  tone?: 'good' | 'neutral'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-small font-semibold',
        tone === 'good' && 'bg-skyteal-80/10 text-skyteal-80',
        tone === 'neutral' && 'bg-urbangrey-20 text-content-secondary',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Button({
  variant = 'primary',
  full,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost' | 'dark'
  full?: boolean
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2.5 text-middle font-semibold transition-colors',
        full && 'w-full',
        variant === 'primary' && 'bg-caroured-50 text-white hover:bg-caroured-60',
        variant === 'outline' && 'border border-stroke-input bg-white text-content-primary hover:bg-urbangrey-10',
        variant === 'ghost' && 'text-content-interactive hover:bg-urbangrey-10',
        variant === 'dark' && 'bg-urbangrey-90 text-white hover:bg-urbangrey-80',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function Section({
  title,
  children,
  className,
  action,
}: {
  title?: string
  children: React.ReactNode
  className?: string
  action?: React.ReactNode
}) {
  return (
    <section className={cn('py-5', className)}>
      {title && (
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-h3 font-semibold text-content-primary">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cn('border-0 border-t border-stroke-boundary', className)} />
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-urbangrey-10 px-3 py-1.5 text-small text-content-secondary hover:bg-urbangrey-20">
      {children}
    </span>
  )
}
