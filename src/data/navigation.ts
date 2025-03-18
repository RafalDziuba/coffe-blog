/**
 * Typy i dane związane z nawigacją
 * Ten plik zawiera dane, które są używane w różnych miejscach aplikacji,
 * takich jak główna nawigacja, footer, itp.
 */

/**
 * Typ reprezentujący wariant linku nawigacyjnego
 */
export type LinkVariant = 'standard' | 'featured' | 'newsletter'

/**
 * Interfejs reprezentujący link nawigacyjny
 */
export interface NavigationLink {
  /** URL linku */
  href: string

  /** Tekst do wyświetlenia */
  text: string

  /** Wariant linku (wpływa na wygląd) */
  variant?: LinkVariant

  /** Czy link powinien być widoczny w stopce */
  showInFooter?: boolean
}

/**
 * Standardowe linki nawigacyjne (strona główna, blog, itp.)
 */
export const standardLinks: NavigationLink[] = [
  { href: '/', text: 'Strona główna', showInFooter: true },
  { href: '/articles', text: 'Blog', showInFooter: true },
  { href: '/o-nas', text: 'O nas', showInFooter: true },
  { href: '/kontakt', text: 'Kontakt', showInFooter: true },
]

/**
 * Wyróżnione linki nawigacyjne (newsletter, szkolenia, itp.)
 */
export const featuredLinks: NavigationLink[] = [
  { href: '/newsletter', text: 'Newsletter', variant: 'newsletter', showInFooter: true },
  { href: '/kursy', text: 'Szkolenia', variant: 'featured', showInFooter: false },
]

/**
 * Wszystkie linki nawigacyjne (połączenie standardowych i wyróżnionych)
 */
export const allLinks: NavigationLink[] = [...standardLinks, ...featuredLinks]

/**
 * Pomocnicza funkcja do filtrowania linków, które powinny być widoczne w stopce
 */
export const getFooterLinks = (): NavigationLink[] => {
  return allLinks.filter((link) => link.showInFooter)
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
