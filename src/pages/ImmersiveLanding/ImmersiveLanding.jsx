import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import { 
  Shield, 
  Camera, 
  Fingerprint, 
  Home, 
  Phone, 
  Flame, 
  Wrench, 
  ArrowRight, 
  ChevronRight, 
  Activity, 
  Instagram, 
  MessageSquare 
} from 'lucide-react'
import './ImmersiveLanding.css'

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

const stats = [
  { value: '08+', label: 'Years Operations' },
  { value: '02', label: 'Command Hubs' },
  { value: '99.9%', label: 'Active Uptime' },
]

const sssServices = [
  {
    icon: Camera,
    title: 'CCTV Camera Installation',
    desc: 'Residential & commercial surveillance systems with HD/4K cameras, NVR setups, and secure remote mobile monitoring.',
    tag: 'SERV // 01'
  },
  {
    icon: Fingerprint,
    title: 'Biometric Attendance Systems',
    desc: 'Advanced biometric hardware solutions for accurate attendance tracking, smart access logs, and workforce management.',
    tag: 'SERV // 02'
  },
  {
    icon: Shield,
    title: 'Access Control Systems',
    desc: 'Secure entry management utilizing smart cards, encrypted PIN codes, and localized biometric clearance systems.',
    tag: 'SERV // 03'
  },
  {
    icon: Home,
    title: 'Home Security Systems',
    desc: 'Complete residential fortification featuring smart locks, active intrusion sensors, localized alarms, and remote integration.',
    tag: 'SERV // 04'
  },
  {
    icon: Phone,
    title: 'Video Door Phones',
    desc: 'High-definition video intercom arrays tailored for gated communities, apartments, and corporate entrances.',
    tag: 'SERV // 05'
  },
  {
    icon: Flame,
    title: 'Fire Alarm Systems',
    desc: 'Fully compliant active fire detection, featuring networked smoke triggers, thermal sensors, and instant distress alerts.',
    tag: 'SERV // 06'
  },
  {
    icon: Wrench,
    title: 'Annual Maintenance Contracts (AMC)',
    desc: 'Comprehensive, proactive maintenance structures ensuring continuous hardware uptime, priority support, and regular health audits.',
    tag: 'SERV // 07'
  }
]

export default function ImmersiveLanding() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [hoveredValue, setHoveredValue] = useState(null)

  // Scroll mapping for background 3D particle orb mesh (keeping background behavior intact!)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Background 3D Spatial Canvas Engine (Keeping exactly as requested!)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const spherePoints = []
    const sphereRadius = 160
    const pointCount = 180

    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pointCount)
      const theta = Math.sqrt(pointCount * Math.PI) * phi
      spherePoints.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
        ox: Math.sin(phi) * Math.cos(theta),
        oy: Math.sin(phi) * Math.sin(theta),
        oz: Math.cos(phi)
      })
    }

    const gridPoints = []
    const gridRows = 12
    const gridCols = 12
    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        gridPoints.push({
          x: (c - gridCols / 2) * 50,
          y: 120,
          z: (r - gridRows / 2) * 50,
          ox: (c - gridCols / 2) * 50,
          oy: 120,
          oz: (r - gridRows / 2) * 50
        })
      }
    }

    let mouseX = 0
    let mouseY = 0
    let currentRotX = 0.5
    let currentRotY = 0.5
    let targetRotX = 0.5
    let targetRotY = 0.5

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left - width / 2) / (width / 2)
      mouseY = (e.clientY - rect.top - height / 2) / (height / 2)
      targetRotY = mouseX * 0.8
      targetRotX = -mouseY * 0.8
    }

    window.addEventListener('mousemove', handleMouseMove)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      const scrollVal = scrollYProgress.get()

      currentRotX += (targetRotX - currentRotX) * 0.05
      currentRotY += (targetRotY - currentRotY) * 0.05

      const angleY = currentRotY + scrollVal * Math.PI * 2.5
      const angleX = currentRotX + scrollVal * Math.PI * 0.8

      const fov = 400
      const zoom = 1 + scrollVal * 1.5

      // Holographic Security Grid
      ctx.strokeStyle = 'rgba(70, 130, 180, 0.04)'
      ctx.lineWidth = 1
      ctx.beginPath()

      const projectedGrid = gridPoints.map((pt) => {
        const explodeFactor = scrollVal > 0.4 ? 1 + (scrollVal - 0.4) * 3 : 1
        const x = pt.x * explodeFactor
        const y = pt.y + scrollVal * 150
        const z = pt.z * explodeFactor

        const cosY = Math.cos(angleY * 0.3)
        const sinY = Math.sin(angleY * 0.3)
        const rx = x * cosY - z * sinY
        const rz = x * sinY + z * cosY

        const depth = fov / (fov + rz + 300)
        return {
          x: width / 2 + rx * depth * zoom,
          y: height / 2 + y * depth * zoom,
          visible: depth > 0,
        }
      })

      for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
          const idx = r * gridCols + c
          const pt = projectedGrid[idx]
          if (!pt.visible) continue

          if (c < gridCols - 1) {
            const rightPt = projectedGrid[idx + 1]
            if (rightPt.visible) {
              ctx.moveTo(pt.x, pt.y)
              ctx.lineTo(rightPt.x, rightPt.y)
            }
          }
          if (r < gridRows - 1) {
            const downPt = projectedGrid[idx + gridCols]
            if (downPt.visible) {
              ctx.moveTo(pt.x, pt.y)
              ctx.lineTo(downPt.x, downPt.y)
            }
          }
        }
      }
      ctx.stroke()

      // Central Orb
      const projectedSphere = spherePoints.map((pt) => {
        const scaleFactor = 1 - scrollVal * 0.5
        const swirl = scrollVal * 8.0

        const cosS = Math.cos(swirl * pt.z)
        const sinS = Math.sin(swirl * pt.z)

        const tx = (pt.ox * cosS - pt.oy * sinS) * sphereRadius * scaleFactor
        const ty = pt.oy * sphereRadius * scaleFactor
        const tz = (pt.ox * sinS + pt.oy * cosS) * sphereRadius * scaleFactor

        const cosX = Math.cos(angleX)
        const sinX = Math.sin(angleX)
        const ry = ty * cosX - tz * sinX
        let rz = ty * sinX + tz * cosX

        const cosY = Math.cos(angleY)
        const sinY = Math.sin(angleY)
        const rx = tx * cosY - rz * sinY
        rz = tx * sinY + rz * cosY

        const depth = fov / (fov + rz + 200)
        return {
          x: width / 2 + rx * depth * zoom,
          y: height / 2 + ry * depth * zoom,
          visible: depth > 0,
          depth,
          rawZ: rz
        }
      })

      ctx.strokeStyle = `rgba(150, 204, 255, ${0.10 - scrollVal * 0.06})`
      ctx.lineWidth = 0.5
      ctx.beginPath()

      for (let i = 0; i < projectedSphere.length; i++) {
        const pt1 = projectedSphere[i]
        if (!pt1.visible) continue

        let neighbors = 0
        for (let j = i + 1; j < projectedSphere.length; j++) {
          if (neighbors >= 3) break
          const pt2 = projectedSphere[j]
          if (!pt2.visible) continue

          const dx = pt1.x - pt2.x
          const dy = pt1.y - pt2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 65) {
            ctx.moveTo(pt1.x, pt1.y)
            ctx.lineTo(pt2.x, pt2.y)
            neighbors++
          }
        }
      }
      ctx.stroke()

      projectedSphere.forEach((pt, i) => {
        if (!pt.visible) return

        const isBack = pt.rawZ > 0
        const pulse = Math.sin(Date.now() * 0.003 + i) * 0.4 + 0.6
        const alpha = (isBack ? 0.12 : 0.55) * pulse * (1 - scrollVal * 0.6)
        
        ctx.fillStyle = `rgba(150, 204, 255, ${alpha})`
        const size = (isBack ? 1.5 : 3.5) * pt.depth * zoom
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [scrollYProgress])

  return (
    <div className="immersive-landing" ref={containerRef}>
      {/* Background Geodesic Spatial particle canvas */}
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} />
        <div className="scanlines" />
        <div className="radial-vignette" />
      </div>

      {/* ═══ MINIMAL LUXURY HUD ACTIVE MONITOR ═══ */}
      <div className="hud-overlay">
        <div className="hud-bottom-status" style={{ borderTop: 'none', borderBottom: '1px solid rgba(192, 192, 192, 0.05)' }}>
          <motion.div 
            className="text-gradient"
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(11px, 2vw, 15px)', 
              letterSpacing: '0.15em',
              fontWeight: 'bold'
            }}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            SREENIKA SECURITY SOLUTIONS
          </motion.div>
          {/* Platinum Active Label Removed per user request */}
        </div>
      </div>

      {/* ═══ SECTION 1: LANDING INITIATION (HERO) ═══ */}
      <section className="immersive-section immersive-hero">
        <div className="container immersive-hero__container">
          <div className="immersive-hero__content">
            {/* Elegant Luxury Corporate Logo - Directly on landing background without card framework and much bigger! */}
            <motion.img
              src="/Sreenika Security Solutions LOGO.png"
              alt="Sreenika Security Solutions"
              className="hero-corporate-logo-direct"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />

            <motion.h1 
              className="immersive-hero__title"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', marginTop: 'var(--space-2)' }}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              SREENIKA
              <span className="text-gradient">SECURITY</span>
              SOLUTIONS
            </motion.h1>

            <motion.div 
              className="editorial-wipe"
              initial={{ width: 0 }}
              animate={{ width: '80%' }}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.4 }}
            />

            <motion.p 
              className="immersive-hero__desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Empowering residential nodes, transit corridors, and corporate environments with premium, 
              end-to-end security architectures. Built on trust, maintained with absolute integrity since 2017.
            </motion.p>
          </div>

          {/* Premium Branch Network Panel - Elegantly Rounded */}
          <motion.div 
            className="asymmetric-hud-panel data-mono glass-card"
            style={{ borderRadius: '16px', borderLeft: '4px solid var(--steel-blue)' }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="panel-header">
              <span className="label-caps" style={{ color: 'var(--primary)', letterSpacing: '0.2em' }}>OUR BRANCHES</span>
            </div>
            
            <motion.div 
              className="hud-data-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span style={{ fontSize: '12px', color: 'var(--on-surface)' }}>Mancherial Common Hub</span>
            </motion.div>
            
            <motion.div 
              className="hud-data-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span style={{ fontSize: '12px', color: 'var(--on-surface)' }}>JNTU, Hyderabad Node</span>
            </motion.div>
            
            <div className="hairline-divider" style={{ margin: 'var(--space-3) 0' }} />
            
            <p className="hud-log-ticker" style={{ borderRadius: '8px', fontSize: '10px' }}>
              PROUDLY SERVING TELANGANA & ANDHRA PRADESH WITH SECURE AND DEPENDABLE REGIONAL TEAMS.
            </p>
          </motion.div>
        </div>

        <div className="down-arrow-hud">
          <ChevronRight size={18} className="rotate-90-icon" />
          <motion.span 
            className="label-caps"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            SCROLL TO EXPLORE SERVICES
          </motion.span>
        </div>
      </section>

      {/* ═══ SECTION 2: ARCHITECTING REAL SERVICES ═══ */}
      <section className="immersive-section" id="matrix-pillars">
        <div className="container">
          <motion.div 
            className="section-head"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-caps text-gradient">TACTICAL CORE PORTFOLIO</span>
            <h2>Our Specialized Security Services</h2>
            <p>We install, configure, and maintain seven professional-grade security structures designed for absolute safety.</p>
          </motion.div>

          {/* Luxury rounded grid for all 7 real services */}
          <div className="matrix-pillars-grid">
            {sssServices.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div 
                  className="matrix-pillar-card glass-card"
                  style={{ borderRadius: '16px' }}
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                >
                  <div className="pillar-hud-top">
                    <span className="data-mono text-gradient">{service.tag}</span>
                    <span className="data-mono">// SERVICE-ACTIVE</span>
                  </div>
                  
                  <div className="pillar-icon-box" style={{ borderRadius: '12px' }}>
                    <Icon size={26} />
                  </div>
                  
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {service.title}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                  >
                    {service.desc}
                  </motion.p>
                  
                  <div className="pillar-hud-footer">
                    <span className="status-pip status-pip--active" />
                    <span className="data-mono text-caps" style={{ color: 'var(--primary)' }}>SECURE_NET</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: LUXURIOUS ABOUT US (Surveillance feed card completely removed per user request) ═══ */}
      <section className="immersive-section surveillance-section" id="about-us">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            
            {/* Centered Column: Rich, Premium About us details */}
            <motion.div 
              className="surveillance-control-deck"
              style={{ alignItems: 'center', textAlign: 'center' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="label-caps text-gradient" style={{ letterSpacing: '0.2em' }}>DEPENDABLE SECURITY — CORE HERITAGE</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', textTransform: 'uppercase', margin: 'var(--space-3) 0' }}>
                Dependable Security,<br />Innovative Solutions
              </h2>
              
              <motion.p 
                style={{ color: 'var(--on-surface-variant)', lineHeight: '1.75', fontSize: '15px' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Founded in 2017, Sreenika Security Solutions has spent over 8 years building an unshakeable reputation for trust, quality, and technical precision across Telangana and Andhra Pradesh. 
                We serve both high-profile public infrastructures—highways, government departments, and educational networks—as well as prestigious private entities, corporate estates, and retail sectors.
              </motion.p>
              
              <motion.p 
                style={{ color: 'var(--on-surface-variant)', lineHeight: '1.75', fontSize: '15px', marginTop: 'var(--space-3)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Our core mission is to provide exceptionally reliable, state-of-the-art, and affordable security grids that safeguard businesses and properties. By leveraging branches in Mancherial and JNTU, Hyderabad, we deploy prompt on-site engineering and dedicated local support teams.
              </motion.p>

              <div className="about-luxury-features" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%', marginTop: 'var(--space-4)', justifyContent: 'center', alignItems: 'center' }}>
                <motion.div className="about-luxury-feat" style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }} whileHover={{ scale: 1.02 }}>
                  <Shield size={18} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontSize: '13px', letterSpacing: '0.05em' }}><strong>8 Years</strong> of Proven Security System Calibration</span>
                </motion.div>
                <motion.div className="about-luxury-feat" style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }} whileHover={{ scale: 1.02 }}>
                  <Wrench size={18} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontSize: '13px', letterSpacing: '0.05em' }}><strong>2-Year Warranty</strong> & Emergency Support Protocols</span>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: REALTIME STRATEGIC CONSOLE ═══ */}
      <section className="immersive-section" id="control-console">
        <div className="container">
          <motion.div 
            className="console-hud-frame glass-card"
            style={{ borderRadius: '20px', overflow: 'hidden' }}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="console-header" style={{ borderBottom: '1px solid rgba(192, 192, 192, 0.05)' }}>
              <div className="console-title-group">
                <Activity className="text-gradient blinking-pip" size={20} />
                <h2>SSS CORPORATE PERFORMANCE GRID</h2>
              </div>
            </div>

            <div className="console-body" style={{ padding: 'var(--space-6)' }}>
              <div className="stats-interactive-row">
                {stats.map((stat, idx) => (
                  <motion.div 
                    className={`stat-panel glass-card ${hoveredValue === idx ? 'highlighted' : ''}`}
                    style={{ borderRadius: '14px', padding: 'var(--space-6)', cursor: 'default' }}
                    key={idx}
                    onMouseEnter={() => setHoveredValue(idx)}
                    onMouseLeave={() => setHoveredValue(null)}
                    whileHover={{ y: -4, borderColor: 'var(--primary)' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                  >
                    <span className="stat-num text-gradient" style={{ fontSize: '3rem', fontWeight: 'bold' }}>{stat.value}</span>
                    <span className="stat-tag label-caps" style={{ color: 'var(--outline)', marginTop: '4px' }}>{stat.label}</span>
                    <div className="stat-tech-ticks">
                      <span /><span /><span /><span />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 5: COOPERATIVE ECOSYSTEMS AUTO-SCROLL SLIDER ═══ */}
      <section className="immersive-section brand-matrix-section">
        <div className="container">
          <motion.div 
            className="brand-matrix-head"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-caps text-gradient">COOPERATIVE ECOSYSTEMS</span>
            <h2>State-Grade Hardware Partners</h2>
            <p>Our security structures are deployed in integration with world-class hardware technology leaders.</p>
          </motion.div>

          {/* Premium Free-Flowing Auto Marquee Slider - No boxes, completely free elements */}
          <div className="brands-slider" style={{ marginTop: 'var(--space-6)' }}>
            <div className="brands-slider__track">
              {[...partnerBrands, ...partnerBrands].map((brand, i) => (
                <motion.div 
                  key={`${brand.name}-${i}`} 
                  className="brands-slider__item"
                  style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
                  whileHover={{ scale: 1.1 }}
                >
                  <img src={brand.logo} alt={brand.name} className="blueprint-brand-img" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: ELITE CENTRAL CONVERSION DIRECT CTA (BIGGER & CENTERED) ═══ */}
      <section className="immersive-section center-cta-section" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(10, 10, 10, 0.9) 100%)', textAlign: 'center', padding: 'var(--space-10) 0' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="label-caps text-gradient" style={{ letterSpacing: '0.25em' }}>READY TO FORTIFY?</span>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 'bold', margin: 'var(--space-3) 0 var(--space-4)', textTransform: 'uppercase' }}>
              Connect With Us Today
            </h2>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: '15px', lineHeight: '1.7', marginBottom: 'var(--space-7)' }}>
              Consult our dedicated local design teams directly through WhatsApp or explore our premium updates on Instagram. Secure your space with platinum-grade protection.
            </p>

            <div className="center-cta-wrapper">
              
              {/* WhatsApp Premium CTA - Enlarged & Centralized */}
              <motion.a 
                href="https://wa.me/917780177002?text=Hi%20I%20am%20interested%20in%20your%20services" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{ 
                  borderRadius: '30px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 'var(--space-3)',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  padding: '16px 40px',
                  width: '100%',
                  maxWidth: '360px',
                  boxShadow: '0 8px 30px rgba(76, 175, 80, 0.25)'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 35px rgba(76, 175, 80, 0.45)' }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare size={20} /> WHATSAPP DIRECT CHASSIS
              </motion.a>

              {/* Instagram Premium CTA - Enlarged & Centralized */}
              <motion.a 
                href="https://insta.openinapp.co/mgg8v" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-ghost"
                style={{ 
                  borderRadius: '30px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: 'var(--space-3)',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  padding: '16px 40px',
                  width: '100%',
                  maxWidth: '360px',
                  border: '1.5px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}
                whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Instagram size={20} /> INSTAGRAM NETWORK PORTAL
              </motion.a>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER & TAXONOMIC METADATA ═══ */}
      <footer className="immersive-footer" style={{ borderTop: 'none', background: '#080808' }}>
        <div className="container immersive-footer__inner">
          <div className="footer-left">
            <img src="/Sreenika Security Solutions LOGO.png" alt="SSS" className="footer-logo" />
            <p>Protecting commercial nodes, gated perimeters, and critical infrastructures across Telangana & Andhra Pradesh since 2017.</p>
            <span className="footer-meta-tag data-mono" style={{ borderRadius: '8px' }}>// LICENSE CLASS-04 SECURITY</span>
          </div>

          {/* Removed Portal Index navigation link grid per user request for absolute single-page delivery */}
        </div>

        <div className="footer-bottom-tech data-mono">
          <span>© {new Date().getFullYear()} SREENIKA SECURITY SOLUTIONS. PLATINUM SECURITY COMPLIANT //</span>
        </div>
      </footer>
    </div>
  )
}
