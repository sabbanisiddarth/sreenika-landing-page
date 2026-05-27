import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const result = login(email, password)
    setLoading(false)
    if (result.success) {
      if (result.role === 'admin' || result.role === 'manager') {
        navigate('/admin/dashboard')
      } else {
        navigate('/client/dashboard')
      }
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
        <div className="auth-card__header">
          <img src="/Sreenika Security Solutions LOGO.png" alt="SSS" className="auth-card__logo" />
          <h1>Sign In</h1>
          <p className="auth-card__subtitle">Access your security dashboard</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="your@email.com"
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label className="input-label">Password</label>
            <div className="auth-field__password-wrap">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-field__toggle"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="auth-form__actions">
            <Link to="/recover" className="auth-link">Forgot password?</Link>
          </div>

          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
            {loading ? 'Authenticating...' : <><LogIn size={16} /> Sign In</>}
          </button>
        </form>

        <p className="auth-card__footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  )
}
