import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Menu, X, Shield, User, LogIn } from 'lucide-react'
import './PublicLayout.css'

export default function PublicLayout({ children }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, user, isAdmin } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="public-layout">
      <header className={`public-header ${scrolled ? 'public-header--solid' : ''}`}>
        <div className="public-header__inner">
          <Link to="/" className="public-header__logo">
            <img
              src="/Sreenika Security Solutions LOGO.png"
              alt="Sreenika Security Solutions"
              className="public-header__logo-img"
            />
          </Link>

          <nav className={`public-nav ${menuOpen ? 'public-nav--open' : ''}`}>
            <NavLink to="/services" className="public-nav__link">
              <span className="label-caps">Services</span>
            </NavLink>
            <NavLink to="/optic-bot" className="public-nav__link">
              <Shield size={14} />
              <span className="label-caps">Optic Bot</span>
            </NavLink>
            <div className="public-nav__divider" />
            {isAuthenticated ? (
              <>
                <NavLink
                  to={isAdmin ? '/admin/dashboard' : '/client/dashboard'}
                  className="public-nav__link"
                >
                  <User size={14} />
                  <span className="label-caps">{user?.name || 'Dashboard'}</span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/signin" className="public-nav__link">
                  <LogIn size={14} />
                  <span className="label-caps">Sign In</span>
                </NavLink>
                <NavLink to="/signup" className="btn btn-primary btn-sm">
                  <span>Sign Up</span>
                </NavLink>
              </>
            )}
          </nav>

          <button
            className="public-header__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <main className="public-main">
        {children}
      </main>

      <footer className="public-footer">
        <div className="public-footer__inner">
          <div className="public-footer__brand">
            <img
              src="/Sreenika Security Solutions LOGO.png"
              alt="SSS"
              className="public-footer__logo"
            />
            <p className="public-footer__tagline">Your Safety, Our Priority</p>
            <p className="public-footer__copy data-mono">
              © {new Date().getFullYear()} Sreenika Security Solutions. All rights reserved.
            </p>
          </div>

          <div className="public-footer__links">
            <span className="label-caps">Quick Links</span>
            <Link to="/services">Services</Link>
            <Link to="/optic-bot">AI Consultation</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>

          <div className="public-footer__links">
            <span className="label-caps">Branches</span>
            <span>JNTU, Hyderabad</span>
            <span>Mancherial</span>
          </div>

          <div className="public-footer__links">
            <span className="label-caps">Connect</span>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div className="public-footer__bottom">
          <hr className="hairline" />
          <p className="data-mono" style={{ textAlign: 'center', padding: 'var(--space-4) 0', color: 'var(--outline)' }}>
            Serving Telangana & Andhra Pradesh since 2017
          </p>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fab-container">
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="fab fab--whatsapp"
          aria-label="Contact via WhatsApp"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="fab fab--instagram"
          aria-label="Follow on Instagram"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
