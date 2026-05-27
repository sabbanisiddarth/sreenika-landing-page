import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Shield, Eye, Lock, Flame, Wrench, Camera, Fingerprint, ArrowRight, ChevronRight } from 'lucide-react'
import './Landing.css'

const partnerBrands = [
  { name: 'Dahua', logo: '/Dahua.png' },
  { name: 'Hikvision', logo: '/Hikvision.png' },
  { name: 'CP Plus', logo: '/CP Plus.png' },
  { name: 'Bosch', logo: '/BOSCH.png' },
  { name: 'Samsung', logo: '/Samsung.jpg' },
  { name: 'D-Link', logo: '/D-Link.png' },
  { name: 'Godrej', logo: '/Goorej.png' },
  { name: 'Zebronics', logo: '/Zebronics.png' },
  { name: 'Vintron', logo: '/Vintron.png' },
  { name: 'Syntel', logo: '/Syntel.png' },
  { name: 'Syrotech', logo: '/Syrotech.avif' },
]

const coreValues = [
  { icon: Shield, label: 'Trust' },
  { icon: Eye, label: 'Quality' },
  { icon: Lock, label: 'Reliability' },
  { icon: Wrench, label: 'Service' },
]

const stats = [
  { value: '8+', label: 'Years Expertise' },
  { value: '2', label: 'Branch Locations' },
  { value: '500+', label: 'Installations' },
  { value: '24/7', label: 'Support Ready' },
]

export default function Landing() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])
  const videoRotateX = useTransform(scrollYProgress, [0, 0.5], [0, 15])
  const videoRotateY = useTransform(scrollYProgress, [0, 0.5], [0, -8])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -60])

  return (
    <div className="landing">
      {/* ═══ HERO ═══ */}
      <section className="hero" ref={heroRef}>
        <div className="hero__bg-grid" />
        <div className="hero__content container">
          <motion.div className="hero__text" style={{ y: textY }}>
            <motion.span
              className="label-caps hero__badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="status-pip status-pip--active" /> Established 2017 — 8+ Years of Excellence
            </motion.span>

            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <span className="text-gradient">SREENIKA</span>
              <br />
              <span>SECURITY</span>
              <br />
              <span>SOLUTIONS</span>
            </motion.h1>

            <motion.p
              className="hero__tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Your Safety, Our Priority
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Link to="/optic-bot" className="btn btn-primary btn-lg">
                <Shield size={16} />
                Consult Optic Bot
              </Link>
              <Link to="/services" className="btn btn-ghost btn-lg">
                View Services
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__3d-element"
            style={{
              scale: videoScale,
              rotateX: videoRotateX,
              rotateY: videoRotateY,
              opacity: videoOpacity,
            }}
          >
            <div className="hero__video-frame">
              <div className="hero__video-hud">
                <span className="hero__hud-label label-caps">
                  <span className="status-pip status-pip--active" /> Live Feed
                </span>
                <span className="hero__hud-label data-mono">CAM-01 // HD</span>
              </div>
              <video
                ref={videoRef}
                className="hero__video"
                autoPlay
                loop
                muted
                playsInline
                poster="/Realtime.webp"
              >
                <source src="/SSS CCTV VIDEO 01.mp4" type="video/mp4" />
              </video>
              <div className="hero__video-scanline" />
              <div className="hero__video-corners">
                <span /><span /><span /><span />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hero__scroll-indicator">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronRight size={20} style={{ transform: 'rotate(90deg)' }} />
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="stats-bar">
        <div className="container stats-bar__inner">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stats-bar__item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <span className="stats-bar__value">{stat.value}</span>
              <span className="stats-bar__label label-caps">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT US ═══ */}
      <section className="about-section">
        <div className="container">
          <motion.div
            className="about-section__header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-caps">About Us</span>
            <h2>Dependable Security,<br />Innovative Solutions</h2>
          </motion.div>

          <div className="about-section__grid">
            <motion.div
              className="about-section__text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p>
                Founded in 2017, Sreenika Security Solutions has spent over 8 years
                building a reputation for trust, quality, and reliability across Telangana
                and Andhra Pradesh. We serve both public institutions—highways, government
                offices, municipalities, and schools—and private enterprises including
                corporate offices, residential properties, and commercial businesses.
              </p>
              <p>
                Our mission is to provide dependable, innovative, and affordable security
                solutions that protect people, properties, and businesses with the latest
                technology. With branch offices in Mancherial and JNTU, Hyderabad, we
                ensure rapid response and personalized service across every district.
              </p>

              <div className="about-section__values">
                {coreValues.map(({ icon: Icon, label }) => (
                  <div key={label} className="about-section__value-item">
                    <Icon size={20} />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <Link to="/services" className="btn btn-ghost" style={{ marginTop: 'var(--space-5)' }}>
                Explore Our Services <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div
              className="about-section__card glass-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="card-header">
                <span className="label-caps">Why Choose SSS</span>
              </div>
              <ul className="about-section__why-list">
                <li><strong>8 Years</strong> proven track record in government & private sectors</li>
                <li><strong>Certified Team</strong> of experienced technical professionals</li>
                <li><strong>2-Year Warranty</strong> with emergency support</li>
                <li><strong>Quick Installation</strong> and timely maintenance</li>
                <li><strong>Custom Solutions</strong> tailored to specific needs</li>
                <li><strong>Affordable Pricing</strong> for professional-grade systems</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ PARTNER BRANDS ═══ */}
      <section className="brands-section">
        <div className="container">
          <motion.div
            className="brands-section__header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="label-caps">Trusted Partners</span>
            <h3>World-Class Technology Partners</h3>
          </motion.div>

          <div className="brands-slider">
            <div className="brands-slider__track">
              {[...partnerBrands, ...partnerBrands].map((brand, i) => (
                <div key={`${brand.name}-${i}`} className="brands-slider__item">
                  <img src={brand.logo} alt={brand.name} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="cta-section">
        <div className="container cta-section__inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-caps" style={{ color: 'var(--steel-blue)' }}>Ready to Secure?</span>
            <h2>Get a Free Security<br />Consultation Today</h2>
            <p style={{ maxWidth: '480px', margin: '0 auto var(--space-6)' }}>
              Speak with our AI-powered Optic Bot or reach us directly through WhatsApp for a customized security assessment.
            </p>
            <div className="cta-section__buttons">
              <Link to="/optic-bot" className="btn btn-primary btn-lg">
                <Shield size={16} /> Talk to Optic Bot
              </Link>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
