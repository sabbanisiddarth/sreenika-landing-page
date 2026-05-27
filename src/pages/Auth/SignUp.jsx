import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserPlus, Mail, CheckCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

export default function SignUp() {
  const [step, setStep] = useState(1) // 1: form, 2: verify, 3: done
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const generatedOTP = '123456' // Simulated OTP

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) {
      setError('All fields are required.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const result = signup(email, name)
    setLoading(false)
    if (!result.success) {
      setError(result.error)
      return
    }
    setStep(2)
  }

  const handleVerify = (e) => {
    e.preventDefault()
    if (otp === generatedOTP || otp.length === 6) {
      setStep(3)
    } else {
      setError('Invalid OTP. Please try again.')
    }
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
              <img src="/Sreenika Security Solutions LOGO.png" alt="SSS" className="auth-card__logo" />
              <h1>Create Account</h1>
              <p className="auth-card__subtitle">Join Sreenika Security Solutions</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleRegister} className="auth-form">
              <div className="auth-field">
                <label className="input-label">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-field" placeholder="Your full name" />
              </div>
              <div className="auth-field">
                <label className="input-label">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input-field" placeholder="your@email.com" />
              </div>
              <div className="auth-field">
                <label className="input-label">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input-field" placeholder="Min 6 characters" />
              </div>
              <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
                {loading ? 'Creating...' : <><UserPlus size={16} /> Create Account</>}
              </button>
            </form>

            <p className="auth-card__footer">
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <div className="auth-card__header">
              <div className="auth-card__icon-wrap">
                <Mail size={32} />
              </div>
              <h1>Verify Email</h1>
              <p className="auth-card__subtitle">We sent a verification code to <strong>{email}</strong></p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form onSubmit={handleVerify} className="auth-form">
              <div className="auth-field">
                <label className="input-label">Verification Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className="input-field"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  style={{ letterSpacing: '0.5em', textAlign: 'center', fontFamily: 'var(--font-mono)' }}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg auth-submit">
                Verify Email
              </button>
            </form>
          </>
        )}

        {step === 3 && (
          <div className="auth-card__success">
            <CheckCircle size={48} />
            <h2>Account Created!</h2>
            <p>Your account has been verified successfully.</p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/signin')}>
              Sign In Now
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
