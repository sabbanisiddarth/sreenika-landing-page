import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, Wrench, FileText, Clock, Shield, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import './ClientDashboard.css'

const mockInstallations = [
  { id: 'INS-001', type: 'CCTV — 8 Channel', location: 'Mancherial, Office', date: '2024-08-15', status: 'active' },
  { id: 'INS-002', type: 'Biometric Attendance', location: 'Mancherial, Warehouse', date: '2024-11-20', status: 'active' },
  { id: 'INS-003', type: 'Fire Alarm System', location: 'Mancherial, Office', date: '2025-01-10', status: 'maintenance' },
]

const mockRequests = [
  { id: 'SR-0045', title: 'Camera 3 offline — needs inspection', status: 'open', date: '2025-05-10' },
  { id: 'SR-0044', title: 'AMC renewal inquiry', status: 'resolved', date: '2025-04-28' },
]

const mockAMCs = [
  { id: 'AMC-101', system: 'CCTV — 8 Channel', expires: '2026-08-15', status: 'active' },
  { id: 'AMC-102', system: 'Fire Alarm System', expires: '2025-07-10', status: 'expiring' },
]

const mockInvoices = [
  { id: 'INV-2024-089', amount: '₹45,000', date: '2024-08-15', status: 'paid' },
  { id: 'INV-2024-112', amount: '₹12,500', date: '2024-11-20', status: 'paid' },
  { id: 'INV-2025-015', amount: '₹8,000', date: '2025-01-10', status: 'pending' },
]

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

export default function ClientDashboard() {
  return (
    <div className="client-dashboard">
      <div className="page-header">
        <div>
          <span className="label-caps" style={{ color: 'var(--steel-blue)' }}>Client Portal</span>
          <h1>Dashboard</h1>
        </div>
        <Link to="/client/optic-bot" className="btn btn-primary btn-sm">
          <Shield size={14} /> Ask Optic Bot
        </Link>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">
        <StatCard icon={Camera} label="Installations" value={mockInstallations.length} color="#4682B4" delay={0} />
        <StatCard icon={Wrench} label="Open Requests" value={mockRequests.filter(r => r.status === 'open').length} color="#ff9800" delay={0.1} />
        <StatCard icon={FileText} label="Active AMCs" value={mockAMCs.filter(a => a.status === 'active').length} color="#4caf50" delay={0.2} />
        <StatCard icon={Clock} label="Pending Invoices" value={mockInvoices.filter(i => i.status === 'pending').length} color="#f44336" delay={0.3} />
      </div>

      {/* Installations */}
      <motion.div className="dashboard-section card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="card-header">
          <span className="label-caps">My Installations</span>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th className="label-caps">ID</th>
                <th className="label-caps">Type</th>
                <th className="label-caps">Location</th>
                <th className="label-caps">Date</th>
                <th className="label-caps">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockInstallations.map(inst => (
                <tr key={inst.id}>
                  <td className="data-mono">{inst.id}</td>
                  <td>{inst.type}</td>
                  <td>{inst.location}</td>
                  <td className="data-mono">{inst.date}</td>
                  <td>
                    <span className={`status-badge status-badge--${inst.status}`}>
                      {inst.status === 'active' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                      {inst.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Service Requests + AMC Renewals side by side */}
      <div className="dashboard-duo">
        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="card-header"><span className="label-caps">Service Requests</span></div>
          {mockRequests.map(req => (
            <div key={req.id} className="list-item">
              <div className="list-item__main">
                <span className="data-mono" style={{ color: 'var(--steel-blue)' }}>{req.id}</span>
                <span>{req.title}</span>
              </div>
              <span className={`status-badge status-badge--${req.status}`}>{req.status}</span>
            </div>
          ))}
        </motion.div>

        <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <div className="card-header"><span className="label-caps">AMC Renewals</span></div>
          {mockAMCs.map(amc => (
            <div key={amc.id} className="list-item">
              <div className="list-item__main">
                <span className="data-mono" style={{ color: 'var(--steel-blue)' }}>{amc.id}</span>
                <span>{amc.system}</span>
                <span className="data-mono" style={{ fontSize: '11px', color: 'var(--outline)' }}>Expires: {amc.expires}</span>
              </div>
              <span className={`status-badge status-badge--${amc.status}`}>{amc.status}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Invoices */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <div className="card-header"><span className="label-caps">Invoices</span></div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th className="label-caps">Invoice</th>
                <th className="label-caps">Amount</th>
                <th className="label-caps">Date</th>
                <th className="label-caps">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map(inv => (
                <tr key={inv.id}>
                  <td className="data-mono">{inv.id}</td>
                  <td className="data-mono" style={{ fontWeight: 600 }}>{inv.amount}</td>
                  <td className="data-mono">{inv.date}</td>
                  <td>
                    <span className={`status-badge status-badge--${inv.status}`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
