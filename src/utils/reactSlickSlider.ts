import type { ComponentType } from 'react'
import type { Settings } from 'react-slick'
import RsSlider from 'react-slick'

/**
 * react-slick is CJS; Vite 8 dev can expose `import default` as `{ default: Component }`.
 * Normalise so we always get a renderable component.
 */
function resolveSlickComponent(mod: unknown): ComponentType<Settings> {
  if (typeof mod === 'function') {
    return mod as ComponentType<Settings>
  }
  if (mod && typeof mod === 'object' && 'default' in mod) {
    const inner = (mod as { default: unknown }).default
    if (typeof inner === 'function') {
      return inner as ComponentType<Settings>
    }
    if (inner && typeof inner === 'object' && 'default' in inner) {
      const d = (inner as { default: unknown }).default
      if (typeof d === 'function') {
        return d as ComponentType<Settings>
      }
    }
  }
  throw new Error(
    'react-slick: could not resolve Slider component (CJS/ESM interop).',
  )
}

export const SlickSlider = resolveSlickComponent(RsSlider)
