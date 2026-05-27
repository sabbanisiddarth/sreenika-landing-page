import React from 'react'
import { motion } from 'framer-motion'
import { Users, AlertTriangle, TrendingUp, DollarSign, Activity, FileText } from 'lucide-react'
import '../Client/ClientDashboard.css' // Reuse dashboard styles

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    className="stat-card card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
  >
    <div className="stat-card__icon" style={{ background: `${color}15`, color }}>
      <Icon size={20} />
    </div>
    <div>
      <span className="stat-card__value">{value}</span>
      <span className="label-caps stat-card__label">{label}</span>
    </div>
  </motion.div>
)

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <div className="page-header">
        <div>
          <span className="label-caps" style={{ color: 'var(--steel-blue)' }}>Operations</span>
          <h1>Admin Dashboard</h1>
        </div>
      </div>

      <div className="dashboard-stats">
        <StatCard icon={Users} label="Total Clients" value="1,248" color="#4682B4" delay={0} />
        <StatCard icon={Activity} label="Active Installs" value="3,892" color="#4caf50" delay={0.1} />
        <StatCard icon={AlertTriangle} label="Open Tickets" value="24" color="#ff9800" delay={0.2} />
        <StatCard icon={DollarSign} label="Monthly Rev" value="₹8.4M" color="#f44336" delay={0.3} />
      </div>

      <div className="dashboard-duo">
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="card-header">
            <span className="label-caps">Recent Service Requests</span>
          </div>
          <div className="list-item">
            <div className="list-item__main">
              <span className="data-mono" style={{ color: 'var(--steel-blue)' }}>SR-1042</span>
              <span>Camera feed offline (JNTU)</span>
            </div>
            <span className="status-badge status-badge--open">High Priority</span>
          </div>
          <div className="list-item">
            <div className="list-item__main">
              <span className="data-mono" style={{ color: 'var(--steel-blue)' }}>SR-1041</span>
              <span>Biometric scanner uncalibrated</span>
            </div>
            <span className="status-badge status-badge--pending">In Progress</span>
          </div>
          <div className="list-item">
            <div className="list-item__main">
              <span className="data-mono" style={{ color: 'var(--steel-blue)' }}>SR-1040</span>
              <span>AMC Renewal (Corporate)</span>
            </div>
            <span className="status-badge status-badge--resolved">Resolved</span>
          </div>
        </motion.div>

        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="card-header">
            <span className="label-caps">System Status</span>
          </div>
          <div className="list-item">
            <div className="list-item__main">
              <span>Main Server (Mancherial)</span>
            </div>
            <span className="status-badge status-badge--active">Online</span>
          </div>
          <div className="list-item">
            <div className="list-item__main">
              <span>Backup Server (JNTU)</span>
            </div>
            <span className="status-badge status-badge--active">Online</span>
          </div>
          <div className="list-item">
            <div className="list-item__main">
              <span>Optic Bot Engine (Gemma)</span>
            </div>
            <span className="status-badge status-badge--active">Optimal</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
