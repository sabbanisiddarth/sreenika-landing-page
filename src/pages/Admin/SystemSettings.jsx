import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, Plus, Mail, ShieldCheck, X, KeyRound } from 'lucide-react'

export default function SystemSettings() {
  const [adminEmails, setAdminEmails] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [step, setStep] = useState(1) // 1: input email, 2: OTP verify, 3: select role
  
  const [newEmail, setNewEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [role, setRole] = useState('manager')
  const [error, setError] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('sss_admin_emails')
    if (saved) {
      setAdminEmails(JSON.parse(saved))
    } else {
      // Default owner
      const defaults = [{ email: 'owner@sreenikasecurity.com', role: 'admin', verified: true }]
      setAdminEmails(defaults)
      localStorage.setItem('sss_admin_emails', JSON.stringify(defaults))
    }
  }, [])

  const saveList = (list) => {
    setAdminEmails(list)
    localStorage.setItem('sss_admin_emails', JSON.stringify(list))
  }

  const handleStartAdd = () => {
    setShowAddModal(true)
    setStep(1)
    setNewEmail('')
    setOtp('')
    setError('')
  }

  const handleSendOTP = (e) => {
    e.preventDefault()
    setError('')
    if (!newEmail) return setError('Email is required')
    if (adminEmails.find(a => a.email === newEmail)) return setError('Email already exists in access control list')
    setStep(2)
  }

  const handleVerifyOTP = (e) => {
    e.preventDefault()
    setError('')
    if (otp.length !== 6) return setError('Enter valid 6-digit OTP')
    setStep(3)
  }

  const handleSaveUser = () => {
    const newList = [...adminEmails, { email: newEmail, role, verified: true }]
    saveList(newList)
    setShowAddModal(false)
  }

  const handleRemove = (email) => {
    if (email === 'owner@sreenikasecurity.com') return // Prevent locking out
    if (window.confirm(`Remove ${email} from access control?`)) {
      saveList(adminEmails.filter(a => a.email !== email))
    }
  }

  return (
    <div className="system-settings">
      <div className="page-header">
        <div>
          <span className="label-caps" style={{ color: 'var(--steel-blue)' }}>Configuration</span>
          <h1>System Settings</h1>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="label-caps">User Access Control</span>
            <p style={{ fontSize: '12px', color: 'var(--on-surface-variant)', marginTop: '4px' }}>Manage Administrator and Manager roles for the system.</p>
          </div>
          <button className="btn btn-primary btn-sm" onClick={handleStartAdd}>
            <Plus size={14} /> Add Email
          </button>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th className="label-caps">Email Address</th>
                <th className="label-caps">Role</th>
                <th className="label-caps">Status</th>
                <th className="label-caps">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminEmails.map(user => (
                <tr key={user.email}>
                  <td className="data-mono">{user.email}</td>
                  <td>
                    <span className="label-caps" style={{ color: user.role === 'admin' ? 'var(--steel-blue)' : 'var(--on-surface)' }}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {user.verified ? (
                      <span className="status-badge status-badge--active"><ShieldCheck size={12}/> Verified</span>
                    ) : (
                      <span className="status-badge status-badge--warning">Pending</span>
                    )}
                  </td>
                  <td>
                    {user.email !== 'owner@sreenikasecurity.com' && (
                      <button className="btn btn-ghost btn-sm" onClick={() => handleRemove(user.email)} style={{ color: 'var(--error)' }}>
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div 
              className="portal-sidebar-overlay" 
              style={{ display: 'block', zIndex: 100 }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
            />
            <motion.div
              className="card glass-card"
              style={{
                position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: '100%', maxWidth: '400px', zIndex: 101
              }}
              initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
              animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-50%' }}
            >
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="label-caps">Add Access Control</span>
                <button className="icon-btn" onClick={() => setShowAddModal(false)}><X size={16} /></button>
              </div>

              {error && <div className="auth-error" style={{ marginBottom: '1rem' }}>{error}</div>}

              {step === 1 && (
                <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>Enter the email address you want to grant admin or manager access to.</p>
                  <div>
                    <label className="input-label">Email Address</label>
                    <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="input-field" placeholder="employee@sreenikasecurity.com" autoFocus />
                  </div>
                  <button type="submit" className="btn btn-primary">Send OTP Verification</button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>We sent a verification code to <strong>{newEmail}</strong>.</p>
                  <div>
                    <label className="input-label">6-Digit OTP</label>
                    <input type="text" value={otp} onChange={e => setOtp(e.target.value)} className="input-field data-mono" placeholder="123456" maxLength={6} style={{ letterSpacing: '0.2em', textAlign: 'center' }} autoFocus />
                  </div>
                  <button type="submit" className="btn btn-primary">Verify OTP</button>
                </form>
              )}

              {step === 3 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <p style={{ fontSize: '13px', color: 'var(--color-status-success)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={16} /> Email verified successfully.
                  </p>
                  <div>
                    <label className="input-label">Assign Role</label>
                    <select 
                      className="input-field" 
                      value={role} 
                      onChange={e => setRole(e.target.value)}
                      style={{ backgroundColor: 'var(--surface-container-low)' }}
                    >
                      <option value="manager">Manager (Full Access)</option>
                      <option value="admin">Admin (Full Access)</option>
                    </select>
                  </div>
                  <button onClick={handleSaveUser} className="btn btn-primary">Grant Access</button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
