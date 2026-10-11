import type { PageAuthors } from '@proj-airi/vitepress-theme'

import { createTheme } from '@proj-airi/vitepress-theme'

import DocBackdrop from '../components/DocBackdrop.vue'
import Home from '../components/Home.vue'
import messages from '../locales'

import * as authorsData from '../functions/authors.data'
import { data as blogPosts } from '../functions/blog.data'

export default createTheme({
  home: Home,
  docBackdrop: DocBackdrop,
  messages,
  authors: (authorsData as unknown as { data: PageAuthors[] }).data,
  blogPosts,
  enhanceApp() {
    if (!import.meta.env.SSR && import.meta.env.PROD) {
      import('../modules/openpanel')
    }
  },
})
