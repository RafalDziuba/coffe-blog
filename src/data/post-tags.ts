/**
 * Zamknięta lista tagów dla wpisów blogowych (`collections.posts`).
 * W frontmatterze używaj dokładnie tych wartości (wielkość liter ma znaczenie).
 */
export const POST_TAGS = [
  'alternatywy',
  'przepisy',
  'poradniki',
  'ekspres',
  'kawiarnia',
  'home barista',
] as const satisfies readonly [string, ...string[]]

export type PostTag = (typeof POST_TAGS)[number]
