import pageProperties from 'virtual:nolebase-page-properties'

import { useChangelog } from '@nolebase/vitepress-plugin-git-changelog/client'
import { useData } from 'vitepress'
import { computed } from 'vue'

function toTimestamp(value: unknown): number | undefined {
  if (typeof value !== 'string' && typeof value !== 'number' && !(value instanceof Date))
    return undefined

  const timestamp = new Date(value).getTime()
  return Number.isNaN(timestamp) ? undefined : timestamp
}

/**
 * Dates and reading time of the current page.
 *
 * - Last edited time comes from the Git changelog, then VitePress `lastUpdated`.
 * - Reading time comes from `@nolebase/vitepress-plugin-page-properties`.
 */
export function usePageMeta() {
  const { page, frontmatter, lang } = useData()
  const { commits } = useChangelog()

  const lastEditedAt = computed(() => commits.value[0]?.date_timestamp ?? page.value.lastUpdated)
  const publishedAt = computed(() => toTimestamp(frontmatter.value.publishedAt ?? frontmatter.value.date))

  const readingTime = computed<number | undefined>(() => {
    const minutes = pageProperties[page.value.filePath.toLowerCase()]?.readingTime
    return minutes ? Math.max(1, minutes) : undefined
  })

  // UTC keeps the server rendered date equal to the hydrated one.
  const formatter = computed(() => new Intl.DateTimeFormat(lang.value || 'en', { dateStyle: 'long', timeZone: 'UTC' }))

  function formatDate(timestamp: number | undefined) {
    return timestamp == null ? undefined : formatter.value.format(timestamp)
  }

  return {
    lastEditedAt,
    publishedAt,
    readingTime,
    formatDate,
  }
}
