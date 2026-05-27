import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, Fingerprint, Flame, Home, Monitor, Wrench, Phone, ArrowRight, Shield } from 'lucide-react'
import './Services.css'

const services = [
  {
    icon: Camera,
    title: 'CCTV Camera Installation',
    desc: 'Residential & commercial surveillance systems with HD/4K cameras, DVR/NVR setup, and remote monitoring capabilities.',
    tags: ['Residential', 'Commercial', 'HD/4K'],
  },
  {
    icon: Fingerprint,
    title: 'Biometric Attendance Systems',
    desc: 'Advanced biometric solutions for accurate attendance tracking, access management, and workforce monitoring.',
    tags: ['Fingerprint', 'Face ID', 'Card Access'],
  },
  {
    icon: Shield,
    title: 'Access Control Systems',
    desc: 'Secure entry management with smart cards, PIN codes, and biometric verification for restricted areas.',
    tags: ['Smart Card', 'PIN', 'Biometric'],
  },
  {
    icon: Home,
    title: 'Home Security Systems',
    desc: 'Comprehensive residential security with smart locks, sensors, alarms, and 24/7 monitoring integration.',
    tags: ['Smart Locks', 'Sensors', 'Alarms'],
  },
  {
    icon: Monitor,
    title: 'Video Door Phones',
    desc: 'High-definition video intercom systems for residential and commercial properties with two-way audio.',
    tags: ['HD Video', 'Intercom', 'Two-Way Audio'],
  },
  {
    icon: Flame,
    title: 'Fire Alarm Systems',
    desc: 'Code-compliant fire detection and alarm systems with smoke detectors, heat sensors, and emergency alerts.',
    tags: ['Smoke Detection', 'Heat Sensors', 'Emergency'],
  },
  {
    icon: Wrench,
    title: 'Annual Maintenance Contracts',
    desc: 'Comprehensive AMC packages for long-term reliability, regular inspections, and priority support services.',
    tags: ['Preventive', 'Priority Support', 'Regular Inspections'],
  },
]

export default function Services() {
  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <motion.span
            className="label-caps"
            style={{ color: 'var(--steel-blue)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Service Catalog
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Complete Security<br />Solutions
          </motion.h1>
          <motion.p
            className="services-hero__subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            7 specialized services covering every aspect of modern security —
            from surveillance to fire safety, tailored for Telangana & Andhra Pradesh.
          </motion.p>
        </div>
      </section>

      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  className="service-card card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -4, borderColor: 'rgba(70, 130, 180, 0.3)' }}
                >
                  <div className="service-card__icon">
                    <Icon size={28} />
                  </div>
                  <div className="card-header">
                    <h3>{service.title}</h3>
                  </div>
                  <p className="service-card__desc">{service.desc}</p>
                  <div className="service-card__tags">
                    {service.tags.map(tag => (
                      <span key={tag} className="service-card__tag label-caps">{tag}</span>
                    ))}
                  </div>
                  <Link to="/optic-bot" className="service-card__cta">
                    Consult Optic Bot <ArrowRight size={14} />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="services-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h3>Need a Custom Solution?</h3>
          <p style={{ maxWidth: '500px', margin: '0 auto var(--space-5)' }}>
            Every property is unique. Our AI consultant can recommend the perfect
            security configuration for your specific needs.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/optic-bot" className="btn btn-primary btn-lg">
              <Shield size={16} /> Ask Optic Bot
            </Link>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">
              <Phone size={16} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
