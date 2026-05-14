export type OgType = 'website' | 'article'

export type TwitterCardType = 'summary' | 'summary_large_image'

export interface Props {
  title: string
  description: string
  /** Kanoniczny URL; domyślnie bieżąca ścieżka + zapytnanie względem `site` z astro.config */
  canonicalURL?: string
  /** Absolutny URL obrazu OG albo ścieżka od root (np. `/android-chrome-512x512.png`) */
  ogImage?: string
  ogType?: OgType
  /** Gdy true — strona z meta robots noindex,nofollow */
  noindex?: boolean
  /** Domyślnie: `summary_large_image` jeśli jest obraz OG */
  twitterCard?: TwitterCardType
}
