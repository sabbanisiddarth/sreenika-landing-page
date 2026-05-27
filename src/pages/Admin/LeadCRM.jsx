import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Search, Filter, Phone, Mail, MoreHorizontal } from 'lucide-react'
import './LeadCRM.css'

const initialLeads = [
  { id: 'L-101', name: 'Rajesh Kumar', company: 'TechNova', location: 'Hyderabad', stage: 'new', value: '₹1.2L' },
  { id: 'L-102', name: 'Sunil Reddy', company: 'MegaCorp', location: 'Mancherial', stage: 'contacted', value: '₹4.5L' },
  { id: 'L-103', name: 'Priya Sharma', company: 'EduCare Schools', location: 'Warangal', stage: 'proposal', value: '₹2.8L' },
  { id: 'L-104', name: 'Govt. Hospital', company: 'Public Sector', location: 'Karimnagar', stage: 'won', value: '₹8.5L' },
]

export default function LeadCRM() {
  const [leads, setLeads] = useState(initialLeads)

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('id', id)
  }

  const handleDrop = (e, stage) => {
    const id = e.dataTransfer.getData('id')
    setLeads(leads.map(lead => lead.id === id ? { ...lead, stage } : lead))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const columns = [
    { id: 'new', title: 'New Leads' },
    { id: 'contacted', title: 'Contacted' },
    { id: 'proposal', title: 'Proposal Sent' },
    { id: 'won', title: 'Closed Won' }
  ]

  return (
    <div className="lead-crm">
      <div className="page-header">
        <div>
          <span className="label-caps" style={{ color: 'var(--steel-blue)' }}>CRM</span>
          <h1>Lead Management & Traffic Map</h1>
        </div>
      </div>

      <div className="crm-actions">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search leads, companies, locations..." className="input-field" />
        </div>
        <button className="btn btn-ghost"><Filter size={16} /> Filters</button>
      </div>

      <div className="pipeline-board">
        {columns.map(col => (
          <div 
            key={col.id} 
            className="pipeline-column"
            onDrop={(e) => handleDrop(e, col.id)}
            onDragOver={handleDragOver}
          >
            <div className="pipeline-column__header">
              <span className="label-caps">{col.title}</span>
              <span className="pipeline-count">{leads.filter(l => l.stage === col.id).length}</span>
            </div>
            
            <div className="pipeline-list">
              {leads.filter(l => l.stage === col.id).map(lead => (
                <motion.div
                  key={lead.id}
                  className="lead-card card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead.id)}
                  layout
                >
                  <div className="lead-card__header">
                    <span className="data-mono">{lead.id}</span>
                    <button className="icon-btn"><MoreHorizontal size={14} /></button>
                  </div>
                  <h4 className="lead-card__name">{lead.name}</h4>
                  <div className="lead-card__company">{lead.company}</div>
                  
                  <div className="lead-card__footer">
                    <div className="lead-card__location">
                      <MapPin size={12} /> {lead.location}
                    </div>
                    <span className="lead-card__value data-mono">{lead.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Traffic Map Section */}
      <motion.div className="card map-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="card-header">
          <span className="label-caps">Traffic Map — TS & AP</span>
        </div>
        <div className="map-container">
          <div className="map-placeholder">
            <MapPin size={48} color="var(--steel-blue)" />
            <p className="data-mono" style={{ marginTop: '1rem', color: 'var(--outline)' }}>Interactive Heatmap (Telangana & Andhra Pradesh)</p>
            <div className="map-markers">
              <div className="map-marker" style={{ top: '30%', left: '45%' }} title="Hyderabad (High)"></div>
              <div className="map-marker" style={{ top: '20%', left: '55%' }} title="Mancherial (High)"></div>
              <div className="map-marker" style={{ top: '60%', left: '70%' }} title="Vijayawada (Med)"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
