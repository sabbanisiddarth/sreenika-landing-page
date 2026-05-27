import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { KeyRound, Mail, CheckCircle } from 'lucide-react'
import './Auth.css'

export default function PasswordRecovery() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSendOTP = async (e) => {
    e.preventDefault()
    setError('')
    if (!email) { setError('Please enter your email.'); return }
    await new Promise(r => setTimeout(r, 600))
    setStep(2)
  }

  const handleVerifyAndReset = (e) => {
    e.preventDefault()
    setError('')
    if (otp.length < 6) { setError('Please enter a valid 6-digit OTP.'); return }
    if (newPassword.length < 6) { setError('Password must be at least 6 characters.'); return }
    setStep(3)
  }

  return (
    <div className="auth-page">
      <div className="auth-page__bg-grid" />
      <motion.div
        className="auth-card glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {step === 1 && (
          <>
            <div className="auth-card__header">
              <div className="auth-card__icon-wrap">
                <KeyRound size={32} />
              </div>
              <h1>Password Recovery</h1>
              <p className="auth-card__subtitle">Enter your email to receive an OTP</p>
            </div>
            {error && <div className="auth-error">{error}</div>}
            <form onSubmit={handleSendOTP} className="auth-form">
              <div className="auth-field">
                <label className="input-label">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" placeholder="your@email.com" />
              </div>
              <button type="submit" className="btn btn-primary btn-lg auth-submit">
                <Mail size={16} /> Send OTP
              </button>
            </form>
            <p className="auth-card__footer">
              Remember your password? <Link to="/signin">Sign In</Link>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <div className="auth-card__header">
              <h1>Reset Password</h1>
              <p className="auth-card__subtitle">Enter the OTP sent to <strong>{email}</strong></p>
            </div>
            {error && <div className="auth-error">{error}</div>}
            <form onSubmit={handleVerifyAndReset} className="auth-form">
              <div className="auth-field">
                <label className="input-label">OTP Code</label>
                <input type="text" value={otp} onChange={e => setOtp(e.target.value)} className="input-field" placeholder="Enter 6-digit OTP" maxLength={6} style={{ letterSpacing: '0.5em', textAlign: 'center', fontFamily: 'var(--font-mono)' }} />
              </div>
              <div className="auth-field">
                <label className="input-label">New Password</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="input-field" placeholder="Min 6 characters" />
              </div>
              <button type="submit" className="btn btn-primary btn-lg auth-submit">
                Reset Password
              </button>
            </form>
          </>
        )}

        {step === 3 && (
          <div className="auth-card__success">
            <CheckCircle size={48} />
            <h2>Password Reset!</h2>
            <p>Your password has been updated successfully.</p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/signin')}>
              Sign In
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
