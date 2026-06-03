import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// tailwind-merge doesn't know about our custom font-size tokens (text-tiny,
// text-small, text-middle, text-large, text-h1/h2/h3). Without this, it treats
// them as color classes and silently drops them when paired with a real color
// class like text-content-secondary — causing ALL typography to fall back to
// the inherited 16px body size.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-tiny',
        'text-small',
        'text-middle',
        'text-large',
        'text-h3',
        'text-h2',
        'text-h1',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
