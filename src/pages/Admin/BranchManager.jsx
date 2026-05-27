import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, MapPin, Users, Phone } from 'lucide-react'

export default function BranchManager() {
  const [activeBranch, setActiveBranch] = useState('mancherial')

  const branches = {
    mancherial: {
      name: 'Mancherial (HQ)',
      address: 'Main Road, Mancherial, Telangana 504208',
      phone: '+91 98765 43210',
      staff: 12,
      activeProjects: 45,
      status: 'operational'
    },
    jntu: {
      name: 'JNTU, Hyderabad',
      address: 'KPHB Colony, Near JNTU, Hyderabad, Telangana 500085',
      phone: '+91 98765 43211',
      staff: 8,
      activeProjects: 32,
      status: 'operational'
    }
  }

  const current = branches[activeBranch]

  return (
    <div className="branch-manager">
      <div className="page-header">
        <div>
          <span className="label-caps" style={{ color: 'var(--steel-blue)' }}>Operations</span>
          <h1>Branch Manager</h1>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-3)' }}>
        <div style={{ display: 'flex', background: 'var(--surface-container-lowest)', borderRadius: 'var(--radius-sm)', p: 1 }}>
          <button
            style={{
              flex: 1,
              padding: 'var(--space-3)',
              background: activeBranch === 'mancherial' ? 'var(--surface-container-high)' : 'transparent',
              border: 'none',
              color: activeBranch === 'mancherial' ? 'var(--primary)' : 'var(--on-surface-variant)',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              fontSize: '12px',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all var(--duration-fast)'
            }}
            onClick={() => setActiveBranch('mancherial')}
          >
            Mancherial (HQ)
          </button>
          <button
            style={{
              flex: 1,
              padding: 'var(--space-3)',
              background: activeBranch === 'jntu' ? 'var(--surface-container-high)' : 'transparent',
              border: 'none',
              color: activeBranch === 'jntu' ? 'var(--primary)' : 'var(--on-surface-variant)',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              fontSize: '12px',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all var(--duration-fast)'
            }}
            onClick={() => setActiveBranch('jntu')}
          >
            JNTU, Hyderabad
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeBranch}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="dashboard-duo"
        >
          <div className="card">
            <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={18} color="var(--steel-blue)" />
              <span className="label-caps">{current.name} Details</span>
            </div>
            
            <div className="list-item" style={{ borderBottom: 'none' }}>
              <div className="list-item__main">
                <span className="label-caps" style={{ color: 'var(--outline)', fontSize: '10px' }}>Address</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={14} /> {current.address}</span>
              </div>
            </div>
            <div className="list-item" style={{ borderBottom: 'none' }}>
              <div className="list-item__main">
                <span className="label-caps" style={{ color: 'var(--outline)', fontSize: '10px' }}>Contact</span>
                <span className="data-mono" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={14} /> {current.phone}</span>
              </div>
            </div>
            <div className="list-item" style={{ borderBottom: 'none' }}>
              <div className="list-item__main">
                <span className="label-caps" style={{ color: 'var(--outline)', fontSize: '10px' }}>Status</span>
                <span className="status-badge status-badge--active">{current.status.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="label-caps">Branch Analytics</span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <div style={{ flex: 1, background: 'var(--surface-container-lowest)', padding: 'var(--space-4)', textAlign: 'center', border: '1px solid var(--color-border-primary)' }}>
                <Users size={24} color="var(--steel-blue)" style={{ margin: '0 auto var(--space-2)' }} />
                <div className="data-mono" style={{ fontSize: '24px', fontWeight: 'bold' }}>{current.staff}</div>
                <div className="label-caps" style={{ color: 'var(--outline)', fontSize: '10px' }}>Staff Members</div>
              </div>
              <div style={{ flex: 1, background: 'var(--surface-container-lowest)', padding: 'var(--space-4)', textAlign: 'center', border: '1px solid var(--color-border-primary)' }}>
                <Building2 size={24} color="var(--steel-blue)" style={{ margin: '0 auto var(--space-2)' }} />
                <div className="data-mono" style={{ fontSize: '24px', fontWeight: 'bold' }}>{current.activeProjects}</div>
                <div className="label-caps" style={{ color: 'var(--outline)', fontSize: '10px' }}>Active Projects</div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
