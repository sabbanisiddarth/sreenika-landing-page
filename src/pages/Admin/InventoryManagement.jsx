import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Upload, Image as ImageIcon, Search, FileText } from 'lucide-react'
import './Inventory.css'

export default function InventoryManagement() {
  const [activeTab, setActiveTab] = useState('inventory') // inventory or uploads

  const mockInventory = [
    { sku: 'CAM-8CH-DH', name: 'Dahua 8-Channel NVR', stock: 15, updated: '2025-05-10', status: 'optimal' },
    { sku: 'CAM-IP-4MP-HK', name: 'Hikvision 4MP IP Camera', stock: 4, updated: '2025-05-12', status: 'low' },
    { sku: 'BIO-FPA-CP', name: 'CP Plus Fingerprint Scanner', stock: 22, updated: '2025-05-01', status: 'optimal' },
    { sku: 'ALM-FA-BS', name: 'Bosch Smoke Detector', stock: 0, updated: '2025-04-20', status: 'out' },
  ]

  const mockUploads = [
    { id: 'REC-092', date: '2025-05-13', status: 'processing', filename: 'invoice_dahua_may.jpg' },
    { id: 'REC-091', date: '2025-05-10', status: 'completed', filename: 'receipt_hikvision_1.png' },
  ]

  return (
    <div className="inventory-management">
      <div className="page-header">
        <div>
          <span className="label-caps" style={{ color: 'var(--steel-blue)' }}>Operations</span>
          <h1>Inventory Management</h1>
        </div>
        <div className="tab-buttons">
          <button 
            className={`btn ${activeTab === 'inventory' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Package size={14} /> Stock Levels
          </button>
          <button 
            className={`btn ${activeTab === 'uploads' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setActiveTab('uploads')}
          >
            <Upload size={14} /> Receipt Uploads
          </button>
        </div>
      </div>

      {activeTab === 'inventory' && (
        <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="label-caps">Current Inventory</span>
            <div className="search-bar" style={{ width: '250px' }}>
              <Search size={14} className="search-icon" />
              <input type="text" placeholder="Search SKU or Name" className="input-field" style={{ padding: '4px 8px 4px 30px', fontSize: '12px' }} />
            </div>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="label-caps">SKU</th>
                  <th className="label-caps">Product Name</th>
                  <th className="label-caps">Stock</th>
                  <th className="label-caps">Last Updated</th>
                  <th className="label-caps">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockInventory.map(item => (
                  <tr key={item.sku}>
                    <td className="data-mono" style={{ color: 'var(--steel-blue)' }}>{item.sku}</td>
                    <td>{item.name}</td>
                    <td className="data-mono" style={{ fontWeight: 'bold' }}>{item.stock}</td>
                    <td className="data-mono">{item.updated}</td>
                    <td>
                      <span className={`status-badge status-badge--${item.status === 'optimal' ? 'active' : item.status === 'low' ? 'warning' : 'error'}`}>
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {activeTab === 'uploads' && (
        <motion.div className="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="card-header">
            <span className="label-caps">AI Receipt Processor</span>
          </div>
          
          <div className="upload-zone">
            <ImageIcon size={48} color="var(--outline)" />
            <h3 style={{ marginTop: '1rem' }}>Upload Invoices & Receipts</h3>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: 'var(--fs-sm)', textAlign: 'center', maxWidth: '400px', margin: '0.5rem auto 1rem' }}>
              Upload images of your supplier receipts. Optic Bot will automatically extract line items, quantities, and update the inventory database.
            </p>
            <button className="btn btn-primary">Select Images...</button>
          </div>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: 'var(--fs-md)' }}>Recent Uploads</h3>
          
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="label-caps">ID</th>
                  <th className="label-caps">File</th>
                  <th className="label-caps">Date</th>
                  <th className="label-caps">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockUploads.map(up => (
                  <tr key={up.id}>
                    <td className="data-mono">{up.id}</td>
                    <td><FileText size={14} style={{ marginRight: '8px', verticalAlign: 'middle', color: 'var(--outline)' }}/> {up.filename}</td>
                    <td className="data-mono">{up.date}</td>
                    <td>
                      <span className={`status-badge status-badge--${up.status === 'completed' ? 'active' : 'pending'}`}>
                        {up.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  )
}
