
export type LinkVariant = 'standard' | 'featured' | 'newsletter'

export type FooterLinkCategory = 'pages' | 'resources' | 'contact' | 'legal'

export interface NavigationLink {
  href: string
  text: string
  variant?: LinkVariant
  showInFooter?: boolean
  footerCategory?: FooterLinkCategory
}

export const standardLinks: NavigationLink[] = [
  { href: '/', text: 'Strona główna', showInFooter: true, footerCategory: 'pages' },
  { href: '/articles', text: 'Blog', showInFooter: true, footerCategory: 'pages' },
  { href: '/o-nas', text: 'O nas', showInFooter: true, footerCategory: 'pages' },
  { href: '/kontakt', text: 'Kontakt', showInFooter: true, footerCategory: 'contact' },
]

export const featuredLinks: NavigationLink[] = [
  {
    href: '/newsletter',
    text: 'Newsletter',
    variant: 'newsletter',
    showInFooter: true,
    footerCategory: 'resources',
  },
  {
    href: '/kursy',
    text: 'Szkolenia',
    variant: 'featured',
    showInFooter: true,
    footerCategory: 'resources',
  },
]

export const footerOnlyLinks: NavigationLink[] = [
  {
    href: '/polityka-prywatnosci',
    text: 'Polityka prywatności',
    showInFooter: true,
    footerCategory: 'legal',
  },
  { href: '/regulamin', text: 'Regulamin', showInFooter: true, footerCategory: 'legal' },
  { href: '/cookies', text: 'Polityka cookies', showInFooter: true, footerCategory: 'legal' },
  {
    href: '/formularz-kontaktowy',
    text: 'Formularz kontaktowy',
    showInFooter: true,
    footerCategory: 'contact',
  },
]


export const allLinks: NavigationLink[] = [...standardLinks, ...featuredLinks, ...footerOnlyLinks]

export const footerCategoryTitles: Record<FooterLinkCategory, string> = {
  pages: 'Strony',
  resources: 'Zasoby',
  contact: 'Kontakt',
  legal: 'Informacje prawne',
}

export const getFooterLinks = (): NavigationLink[] => {
  return allLinks.filter((link) => link.showInFooter)
}


export const getFooterLinksByCategory = (): Record<FooterLinkCategory, NavigationLink[]> => {
  const categories: Record<FooterLinkCategory, NavigationLink[]> = {
    pages: [],
    resources: [],
    contact: [],
    legal: [],
  }

  getFooterLinks().forEach((link) => {
    if (link.footerCategory) {
      categories[link.footerCategory].push(link)
    }
  })

  return Object.fromEntries(
    Object.entries(categories).filter(([_, links]) => links.length > 0),
  ) as Record<FooterLinkCategory, NavigationLink[]>
}

/**
 * Funkcja do sprawdzania, czy link jest aktywny na podstawie bieżącej ścieżki
 * @param href URL do sprawdzenia
 * @param pathname Bieżąca ścieżka
 * @returns Czy link jest aktywny
 */
export function isLinkActive(href: string, pathname: string): boolean {
  if (href === '/') {
    return pathname === href
  }
  return pathname.startsWith(href)
}
