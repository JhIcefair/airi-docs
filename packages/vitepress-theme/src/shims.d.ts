declare module '*.yaml' {
  const value: Record<string, unknown>
  export default value
}

declare module 'virtual:nolebase-page-properties' {
  const data: Record<string, { readingTime: number, wordsCount: number }>
  export default data
}
