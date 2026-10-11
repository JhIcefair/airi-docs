import en from './en/theme.yaml'
import es from './es/theme.yaml'
import fr from './fr/theme.yaml'
import ja from './ja/theme.yaml'
import ko from './ko/theme.yaml'
import ru from './ru/theme.yaml'
import vi from './vi/theme.yaml'
import zhHans from './zh-Hans/theme.yaml'
import zhHant from './zh-Hant/theme.yaml'

/**
 * Theme messages keyed by locale, under the `docs.theme` namespace.
 */
export default {
  'en': { docs: { theme: en } },
  'es': { docs: { theme: es } },
  'fr': { docs: { theme: fr } },
  'ja': { docs: { theme: ja } },
  'ko': { docs: { theme: ko } },
  'ru': { docs: { theme: ru } },
  'vi': { docs: { theme: vi } },
  'zh-Hans': { docs: { theme: zhHans } },
  'zh-Hant': { docs: { theme: zhHant } },
} as Record<string, Record<string, unknown>>
