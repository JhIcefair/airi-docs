import { OpenPanel } from '@openpanel/web'

import { openpanel } from '../meta'

if (!import.meta.env.DEV) {
  const panel = new OpenPanel({
    ...openpanel,
    trackScreenViews: true,
    trackOutgoingLinks: false,
    trackAttributes: false,
    filter(payload) {
      // Page metadata must not include query values or URL fragments.
      if (payload.type === 'track' && payload.payload.properties) {
        for (const key of ['__path', '__referrer']) {
          const value = payload.payload.properties[key]
          if (typeof value === 'string')
            payload.payload.properties[key] = value.split(/[?#]/, 1)[0]
        }
      }
      return true
    },
  })
  panel.setGlobalProperties({ app_surface: 'docs' })
}
