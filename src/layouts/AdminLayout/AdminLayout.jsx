import React, { useState } from 'react'
import { NavLink, Link, useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, Users, Package, Shield, Building2,
  Settings, LogOut, Menu, X, ChevronLeft, MapPin
} from 'lucide-react'
import '../PortalLayout.css'

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const links = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Admin Dashboard' },
    { to: '/admin/leads', icon: MapPin, label: 'Lead / CRM / Traffic Map' },
    { to: '/admin/inventory', icon: Package, label: 'Inventory Management' },
    { to: '/admin/ai-command', icon: Shield, label: 'AI Command Center' },
    { to: '/admin/branches', icon: Building2, label: 'Branch Manager' },
    { to: '/admin/settings', icon: Settings, label: 'System Settings' },
  ]

  return (
    <div className={`portal-layout ${collapsed ? 'portal-layout--collapsed' : ''}`}>
      {/* Mobile Header */}
      <div className="portal-mobile-header">
        <button onClick={() => setMobileOpen(true)} className="portal-mobile-header__btn">
          <Menu size={20} />
        </button>
        <Link to="/" className="portal-mobile-header__logo">
          <img src="/Sreenika Security Solutions LOGO.png" alt="SSS" height="36" />
        </Link>
      </div>

      {/* Sidebar Overlay (mobile) */}
      {mobileOpen && (
        <div className="portal-sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`portal-sidebar ${mobileOpen ? 'portal-sidebar--open' : ''}`}>
        <div className="portal-sidebar__header">
          <Link to="/" className="portal-sidebar__logo">
            <img src="/Sreenika Security Solutions LOGO.png" alt="SSS" />
          </Link>
          <button
            className="portal-sidebar__toggle"
            onClick={() => { setCollapsed(!collapsed); setMobileOpen(false) }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="portal-sidebar__close-mobile"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="portal-sidebar__nav">
          <span className="label-caps portal-sidebar__section-label">Operations</span>
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `portal-sidebar__link ${isActive ? 'portal-sidebar__link--active' : ''}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={18} />
              <span className="portal-sidebar__link-text">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="portal-sidebar__footer">
          <div className="portal-sidebar__user">
            <div className="portal-sidebar__avatar portal-sidebar__avatar--admin">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="portal-sidebar__user-info">
              <span className="portal-sidebar__user-name">{user?.name || 'Admin'}</span>
              <span className="portal-sidebar__user-role label-caps">{user?.role || 'Admin'}</span>
            </div>
          </div>
          <button className="portal-sidebar__logout" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <main className="portal-main">
        <Outlet />
      </main>
    </div>
  )
}
