import { useCallback, useEffect, useRef, useState } from 'react'
import { FiPhone, FiX } from 'react-icons/fi'
import logo from '../../assets/images/logo-marci.png'
import { NAV_LEFT, NAV_RIGHT, PHONE_DISPLAY, PHONE_HREF, SOCIALS } from '../../data/site'
import { useDialog } from '../../hooks/useDialog'
import styles from './Header.module.css'

const HEADER_HEIGHT = 80

export default function Header({ onOpenSearch }) {
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const drawerRef = useRef(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  useDialog(menuOpen, closeMenu, drawerRef)

  // Transparent over the hero, solid once the hero has scrolled past
  useEffect(() => {
    const update = () => setSolid(window.scrollY > window.innerHeight - HEADER_HEIGHT)
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Close the mobile menu if the window grows to desktop width
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1200px)')
    const onChange = (event) => {
      if (event.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  const renderItem = (item, className, onNavigate) =>
    item.action === 'search' ? (
      <button
        type="button"
        className={className}
        onClick={() => {
          onNavigate?.()
          onOpenSearch?.()
        }}
      >
        {item.label}
      </button>
    ) : (
      <a href={item.href} className={className} onClick={onNavigate}>
        {item.label}
      </a>
    )

  return (
    <>
      <header className={`${styles.header} ${solid ? styles.solid : ''}`}>
        <nav className={styles.nav} aria-label="Main">
          <div className={styles.start}>
            <button
              type="button"
              className={styles.menuButton}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <span className={styles.bars} aria-hidden="true" />
            </button>
            <ul className={styles.links}>
              {NAV_LEFT.map((item) => (
                <li key={item.label}>{renderItem(item, styles.link)}</li>
              ))}
            </ul>
          </div>

          <a href="#top" className={styles.logo} aria-label="Marci Metzger Homes, back to top">
            <span className={styles.logoMark} style={{ '--logo': `url(${logo})` }} />
          </a>

          <div className={styles.end}>
            <ul className={styles.links}>
              {NAV_RIGHT.map((item) => (
                <li key={item.label}>{renderItem(item, styles.link)}</li>
              ))}
            </ul>
            <a href={PHONE_HREF} className={styles.call} aria-label={`Call Marci at ${PHONE_DISPLAY}`}>
              <FiPhone className={styles.callIcon} aria-hidden="true" />
              <span className={styles.callLabel}>Call Now</span>
            </a>
          </div>
        </nav>
      </header>

      <div className={`${styles.drawerRoot} ${menuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.backdrop} onClick={closeMenu} aria-hidden="true" />
        <aside
          id="mobile-menu"
          ref={drawerRef}
          className={styles.drawer}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          inert={!menuOpen}
        >
          <button type="button" className={styles.closeButton} aria-label="Close menu" onClick={closeMenu}>
            <FiX aria-hidden="true" />
          </button>

          <ul className={styles.drawerLinks}>
            {[...NAV_LEFT, ...NAV_RIGHT].map((item) => (
              <li key={item.label}>{renderItem(item, styles.drawerLink, closeMenu)}</li>
            ))}
          </ul>

          <a href={PHONE_HREF} className={`${styles.call} ${styles.drawerCall}`}>
            <FiPhone aria-hidden="true" />
            <span>Call Now</span>
          </a>

          <ul className={styles.socials}>
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  )
}