import type { App, InjectionKey } from 'vue'

import { inject } from 'vue'

export interface Author {
  role: string
  kind: 'person' | 'team'

  displayName: string

  githubUsername?: string
  githubEmail?: string

  avatar?: string
  avatarFallback: string
}

export interface PageAuthors {
  url: string
  authors: Author[]
}

/**
 * Minimal blog post shape used for prev / next navigation between posts.
 */
export interface NavigationPost {
  title: string
  url: string
  urlWithoutLang: string
  lang: string
}

export interface ThemeContext {
  /**
   * Authors of each page, usually produced by a VitePress data loader on the site.
   */
  authors?: PageAuthors[]
  /**
   * Blog posts sorted by date, used to link prev / next posts in the same language.
   */
  blogPosts?: NavigationPost[]
}

const themeContextKey: InjectionKey<ThemeContext> = Symbol('proj-airi:vitepress-theme')

export function provideThemeContext(app: App, context: ThemeContext) {
  app.provide(themeContextKey, context)
}

export function useThemeContext(): ThemeContext {
  return inject(themeContextKey, {})
}
