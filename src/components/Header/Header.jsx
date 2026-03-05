import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { planets } from "../../data/planets"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const buttonRef = useRef(null)
  const navRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    buttonRef.current?.focus()
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }

    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [isMenuOpen])

  useLayoutEffect(() => {
    if (!isMenuOpen) return

    const firstLink = navRef.current?.querySelector("a")
    firstLink?.focus()
  }, [isMenuOpen])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])


  useEffect(() => {
    if (!isMenuOpen) return

    const focusable = navRef.current.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    )

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closeMenu()
      }

      if (e.key !== "Tab") return

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }

      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    navRef.current.addEventListener("keydown", handleKeyDown)

    return () => {
      navRef.current?.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMenuOpen])

  return (
    <header className="header">
      <div className="header__container">
        <span className="header__logo">The Planets</span>

        <nav
          id="primaryNav"
          aria-label="Primary"
          ref={navRef}
          className={`header__nav ${isMenuOpen ? "is-open" : ""}`}
        >
          <ul className="header__nav-list">
            {planets.map((planet) => (
              <li key={planet.slug} className="header__nav-item">
                <Link
                  to={`/planets/${planet.slug}`}
                  className={`header__nav-link header__nav-link--${planet.slug}`}
                  onClick={closeMenu}
                >
                  {planet.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="hamburger"
          aria-label={isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          aria-expanded={isMenuOpen}
          aria-controls="primaryNav"
          onClick={toggleMenu}
          ref={buttonRef}
        >
          <img src="/images/icon-hamburger.svg" alt="" />
        </button>
      </div>
    </header>
  )
}

export default Header