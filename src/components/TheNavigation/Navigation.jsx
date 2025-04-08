import React, { useState, useEffect, useRef } from 'react'
import NavLink from './NavLinkReact.jsx'
import styles from './navigation.module.css'

function Navigation({ standardLinks, featuredLinks, pathname }) {
  // State do zarządzania mobilnym menu
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

  // Referencje do elementów DOM
  const menuRef = useRef(null)
  const overlayRef = useRef(null)

  // Funkcja sprawdzająca czy jest to widok mobilny
  const checkIsMobileView = () => {
    return window.innerWidth < 1024
  }

  // Obsługa toggle menu
  const toggleMenu = () => {
    const newState = !isMenuOpen
    setIsMenuOpen(newState)

    // Blokowanie przewijania strony gdy menu jest otwarte
    document.body.style.overflow = newState ? 'hidden' : ''
  }

  // Zamykanie menu
  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = ''
  }

  // Obsługa klawisza Escape
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      closeMenu()
    }
  }

  // Detekcja rozmiaru ekranu
  useEffect(() => {
    const handleResize = () => {
      const mobileView = checkIsMobileView()
      setIsMobileView(mobileView)

      // Automatyczne zamknięcie menu przy zmianie na desktop
      if (!mobileView && isMenuOpen) {
        closeMenu()
      }
    }

    // Początkowe ustawienie
    handleResize()

    // Event listener z debounce dla lepszej wydajności
    let resizeTimer
    const debouncedResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(handleResize, 100)
    }

    window.addEventListener('resize', debouncedResize)
    document.addEventListener('keydown', handleKeyDown)

    // Czyszczenie event listenerów
    return () => {
      window.removeEventListener('resize', debouncedResize)
      document.removeEventListener('keydown', handleKeyDown)
      clearTimeout(resizeTimer)
    }
  }, [isMenuOpen])

  return (
    <>
      <nav className={`${styles.navigation} global-padding`} aria-label="Główna nawigacja">
        <div className={styles.navigation__container}>
          <div className={styles.navigation__left}>
            <a href="/" className={styles.navigation__logo} aria-label="Strona główna" rel="home">
              <span className={styles.navigation__logo_text}>CoffeeBlog</span>
            </a>

            {!isMobileView && (
              <ul
                className={`${styles.navigation__list} ${styles.navigation__list_standard} ${styles.navigation__list_desktop}`}
              >
                {standardLinks.map((link, index) => (
                  <NavLink
                    key={index}
                    href={link.href}
                    text={link.text}
                    isActive={link.href === pathname || pathname.startsWith(`${link.href}/`)}
                  />
                ))}
              </ul>
            )}
          </div>

          {!isMobileView && (
            <ul
              className={`${styles.navigation__list} ${styles.navigation__list_featured} ${styles.navigation__list_desktop}`}
            >
              {featuredLinks.map((link, index) => (
                <NavLink
                  key={index}
                  href={link.href}
                  text={link.text}
                  isActive={link.href === pathname || pathname.startsWith(`${link.href}/`)}
                  variant={link.variant}
                />
              ))}
            </ul>
          )}

          <button
            className={styles.navigation__toggle}
            aria-label="Otwórz menu nawigacyjne"
            aria-expanded={isMenuOpen}
            aria-controls="navigation-menu"
            type="button"
            onClick={toggleMenu}
          >
            <span className={styles.navigation__toggle_bar}></span>
            <span className={styles.navigation__toggle_bar}></span>
            <span className={styles.navigation__toggle_bar}></span>
          </button>

          <div
            ref={menuRef}
            className={`${styles.navigation__menu} global-padding ${isMenuOpen ? styles.navigation__menu_open : ''}`}
            id="navigation-menu"
            aria-hidden={!isMenuOpen}
          >
            <div className={styles.navigation__menu_content}>
              <ul className={`${styles.navigation__list} ${styles.navigation__list_standard}`}>
                {standardLinks.map((link, index) => (
                  <NavLink
                    key={index}
                    href={link.href}
                    text={link.text}
                    isActive={link.href === pathname || pathname.startsWith(`${link.href}/`)}
                    onClick={closeMenu}
                  />
                ))}
              </ul>

              <div className={styles.navigation__separator} aria-hidden="true"></div>

              <ul className={`${styles.navigation__list} ${styles.navigation__list_featured}`}>
                {featuredLinks.map((link, index) => (
                  <NavLink
                    key={index}
                    href={link.href}
                    text={link.text}
                    isActive={link.href === pathname || pathname.startsWith(`${link.href}/`)}
                    variant={link.variant}
                    onClick={closeMenu}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div
        ref={overlayRef}
        className={`${styles.navigation__overlay} ${isMenuOpen ? styles.navigation__overlay_active : ''}`}
        aria-hidden="true"
        onClick={closeMenu}
      ></div>
    </>
  )
}

export default Navigation
