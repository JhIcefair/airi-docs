import { env } from 'node:process'

/**
 * Version label of AIRI shown in the navbar.
 *
 * The AIRI build passes `AIRI_VERSION` from its own `package.json`. Local and
 * standalone builds fall back to the newest GitHub release.
 */
async function resolveAiriVersion(): Promise<string> {
  if (env.AIRI_VERSION)
    return `v${env.AIRI_VERSION.replace(/^v/, '')}`

  try {
    const res = await fetch('https://api.github.com/repos/moeru-ai/airi/releases?per_page=1', {
      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'VitePress',
        ...(env.GITHUB_TOKEN ? { Authorization: `Bearer ${env.GITHUB_TOKEN}` } : {}),
      },
    })
    if (!res.ok)
      throw new Error(`GitHub API request failed: ${res.status} ${res.statusText}`)

    const [latest] = await res.json() as Array<{ tag_name: string }>
    if (latest)
      return latest.tag_name
  }
  catch (error) {
    console.warn('Failed to resolve the AIRI version, falling back to "Releases":', error)
  }

  return 'Releases'
}

// eslint-disable-next-line antfu/no-top-level-await -- resolved once when VitePress loads the config
export const airiVersion = await resolveAiriVersion()
