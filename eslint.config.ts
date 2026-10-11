import { defineConfig } from '@moeru/eslint-config'

export default defineConfig({
  masknet: false,
  perfectionist: false,
  preferArrow: false,
  sonarjs: false,
  sortPackageJsonScripts: false,
  typescript: true,
  unocss: true,
  vue: true,
}, {
  ignores: [
    'crowdin.yml',
    '**/*.md',
    '.github/**',
  ],
}, {
  rules: {
    'antfu/import-dedupe': 'error',
    'import/order': 'off',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'style/padding-line-between-statements': 'error',
    'vue/prefer-separate-static-class': 'off',
    'yaml/plain-scalar': 'off',
  },
})
