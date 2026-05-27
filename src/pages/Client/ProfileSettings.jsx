import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Monitor, Shield, HelpCircle, LogOut, Trash2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './ProfileSettings.css'

export default function ProfileSettings() {
  const { user, logout, sessions, maxDevices } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="profile-settings">
      <div className="page-header">
        <div>
          <span className="label-caps" style={{ color: 'var(--steel-blue)' }}>Settings</span>
          <h1>Profile</h1>
        </div>
      </div>

      <div className="profile-grid">
        {/* Personal Info */}
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="card-header"><span className="label-caps">Personal Information</span></div>
          <form onSubmit={handleSave} className="profile-form">
            <div className="auth-field">
              <label className="input-label">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-field" />
            </div>
            <div className="auth-field">
              <label className="input-label">Email Address</label>
              <input type="email" value={user?.email || ''} className="input-field" disabled style={{ opacity: 0.6 }} />
            </div>
            <div className="auth-field">
              <label className="input-label">Phone Number</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="input-field" placeholder="+91 ..." />
            </div>
            <div className="auth-field">
              <label className="input-label">Address</label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="input-field" placeholder="Your address" />
            </div>
            <button type="submit" className="btn btn-primary">
              {saved ? '✓ Saved' : 'Save Changes'}
            </button>
          </form>
        </motion.div>

        {/* Device Manager */}
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="card-header">
            <span className="label-caps">Device Manager</span>
            <span className="data-mono" style={{ color: 'var(--outline)', fontSize: '11px' }}>
              {sessions.length} / {maxDevices} devices
            </span>
          </div>
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--on-surface-variant)', marginBottom: 'var(--space-4)' }}>
            You can be signed in on a maximum of <strong>{maxDevices} devices</strong> simultaneously.
            If a fourth device signs in, the oldest session is terminated automatically.
          </p>

          <div className="device-list">
            {sessions.length === 0 && (
              <div className="device-item">
                <Monitor size={18} />
                <div className="device-item__info">
                  <span>Current Device</span>
                  <span className="data-mono" style={{ fontSize: '10px', color: 'var(--outline)' }}>Active now</span>
                </div>
                <span className="status-badge status-badge--active">Active</span>
              </div>
            )}
            {sessions.map((session, i) => (
              <div key={session.deviceId} className="device-item">
                <Monitor size={18} />
                <div className="device-item__info">
                  <span>Device {i + 1}</span>
                  <span className="data-mono" style={{ fontSize: '10px', color: 'var(--outline)' }}>
                    {new Date(session.loginTime).toLocaleString()}
                  </span>
                </div>
                <span className="status-badge status-badge--active">Active</span>
              </div>
            ))}
          </div>

          <div className="device-limit-bar">
            <div className="device-limit-bar__fill" style={{ width: `${(Math.max(sessions.length, 1) / maxDevices) * 100}%` }} />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="card-header"><span className="label-caps">Quick Actions</span></div>
          <div className="quick-actions">
            <Link to="/client/optic-bot" className="quick-action-item">
              <HelpCircle size={18} />
              <span>Need Help? Ask Optic Bot</span>
            </Link>
            <button className="quick-action-item quick-action-item--danger" onClick={logout}>
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
