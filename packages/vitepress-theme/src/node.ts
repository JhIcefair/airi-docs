import type { GitChangelogMarkdownSectionOptions } from '@nolebase/vitepress-plugin-git-changelog/vite'
import type { PluginOption } from 'vite'
import type { MarkdownOptions, PageData } from 'vitepress'

import i18n from '@intlify/unplugin-vue-i18n/vite'
import anchor from 'markdown-it-anchor'
import yaml from 'unplugin-yaml/vite'

import { postcssIsolateStyles } from 'vitepress'

import { footnote } from '@mdit/plugin-footnote'
import { GitChangelog, GitChangelogMarkdownSection } from '@nolebase/vitepress-plugin-git-changelog/vite'
import { PageProperties } from '@nolebase/vitepress-plugin-page-properties/vite'
import { tasklist } from '@mdit/plugin-tasklist'

import { frontmatterAssets } from './vite-frontmatter-assets'

export { frontmatterAssets }

const themePackageName = '@proj-airi/vitepress-theme'

type GitChangelogOptions = NonNullable<Parameters<typeof GitChangelog>[0]>

export interface ThemeVitePluginsOptions {
  /**
   * Options of `@nolebase/vitepress-plugin-git-changelog`.
   *
   * Set it to render the contributors and the change history of each page from
   * Git history. The build needs the full history (`fetch-depth: 0` in CI).
   */
  gitChangelog?: GitChangelogOptions & {
    markdownSection?: GitChangelogMarkdownSectionOptions
  }
}

/**
 * Vite plugins required by the theme.
 *
 * Add these to `vite.plugins` in the VitePress config, next to UnoCSS.
 */
export function themeVitePlugins(options: ThemeVitePluginsOptions = {}): PluginOption[] {
  const { markdownSection, ...gitChangelog } = options.gitChangelog ?? {}

  return [
    {
      name: `${themePackageName}:config`,
      config() {
        return {
          // The theme is shipped as Vue SFC sources, so it must go through the Vite pipeline.
          optimizeDeps: { exclude: [themePackageName] },
          ssr: { noExternal: [themePackageName] },
          css: {
            postcss: {
              plugins: [
                postcssIsolateStyles({ includeFiles: [/vp-doc\.css/] }),
              ],
            },
          },
        }
      },
    },
    // Thanks https://github.com/intlify/vue-i18n/issues/1205#issuecomment-2707075660
    i18n({ runtimeOnly: true, compositionOnly: true, fullInstall: true, ssr: true }),
    yaml(),
    frontmatterAssets(),
    // Word count and reading time of each page, read by the docs layout.
    PageProperties(),
    ...(options.gitChangelog
      ? [GitChangelog(gitChangelog), GitChangelogMarkdownSection(markdownSection)]
      : [emptyGitChangelog()]),
  ]
}

const gitChangelogModuleId = 'virtual:nolebase-git-changelog'

/**
 * The theme always installs the changelog client, which imports this virtual
 * module. Without `gitChangelog`, serve an empty changelog instead.
 */
function emptyGitChangelog(): PluginOption {
  return {
    name: `${themePackageName}:empty-git-changelog`,
    resolveId(source) {
      if (source === gitChangelogModuleId)
        return `\0${gitChangelogModuleId}`
    },
    load(id) {
      if (id === `\0${gitChangelogModuleId}`)
        return `export default ${JSON.stringify({ commits: [], authors: [] })}`
    },
  }
}

/**
 * Markdown options matching the theme styles: Catppuccin code blocks,
 * hover-only heading anchors, task lists and footnotes.
 */
export function themeMarkdownOptions(): MarkdownOptions {
  return {
    theme: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-mocha',
    },
    headers: {
      level: [2, 3, 4, 5, 6],
    },
    config(md) {
      md.use(tasklist)
      md.use(footnote)
    },
    anchor: {
      callback(token) {
        // set tw `group` modifier to heading element
        token.attrSet(
          'class',
          'group relative border-none mb-4 lg:-ml-2 lg:pl-2 lg:pr-2',
        )
      },
      permalink: anchor.permalink.linkInsideHeader({
        class:
          'header-anchor [&_span]:focus-visible:opacity-100',
        symbol: `<span class="absolute top-0 -ml-8 hidden items-center border-0 opacity-0 group-hover:opacity-100 focus:opacity-100 lg:flex" style="transition: all 0.2s ease-in-out;">&ZeroWidthSpace;<span class="flex h-6 w-6 items-center justify-center rounded-md outline-2 outline-primary text-green-400 shadow-sm  hover:text-green-700 hover:shadow dark:bg-primary/20 dark:text-primary/80 dark:shadow-none dark:hover:bg-primary/40 dark:hover:text-primary"><svg width="12" height="12" fill="none" aria-hidden="true"><path d="M3.75 1v10M8.25 1v10M1 3.75h10M1 8.25h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg></span></span>`,
        renderAttrs: (slug, state) => {
          // From: https://github.com/vuejs/vitepress/blob/256d742b733bfb62d54c78168b0e867b8eb829c9/src/node/markdown/markdown.ts#L263
          // Find `heading_open` with the id identical to slug
          const idx = state.tokens.findIndex((token) => {
            const attrs = token.attrs
            const id = attrs?.find(attr => attr[0] === 'id')
            return id && slug === id[1]
          })
          // Get the actual heading content
          const title = state.tokens[idx + 1]!.content
          return {
            'aria-label': `Permalink to "${title}"`,
          }
        },
      }),
    },
  }
}

/**
 * Hides the sidebar on `layout: showcase` pages unless the page sets it.
 */
export function transformPageData(pageData: PageData) {
  if (pageData.frontmatter.sidebar != null)
    return

  pageData.frontmatter.sidebar = pageData.frontmatter.layout !== 'showcase'
}
