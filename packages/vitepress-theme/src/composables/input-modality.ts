// Keys that move focus around, typing into a field does not count.
const navigationKeys = new Set(['Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'])

/**
 * Keeps `data-input-modality` on `<html>` set to `keyboard` or `pointer`.
 *
 * Chrome also matches `:focus-visible` when a script moves focus, for example a menu
 * returning focus to its trigger, so mouse users would see focus rings. The theme
 * styles only draw them in keyboard modality, see `styles/style.css`.
 */
export function trackInputModality() {
  if (typeof document === 'undefined')
    return

  const root = document.documentElement
  if (root.dataset.inputModality)
    return

  root.dataset.inputModality = 'pointer'

  window.addEventListener('keydown', (event) => {
    if (navigationKeys.has(event.key))
      root.dataset.inputModality = 'keyboard'
  }, { capture: true })

  window.addEventListener('pointerdown', () => {
    root.dataset.inputModality = 'pointer'
  }, { capture: true, passive: true })
}
