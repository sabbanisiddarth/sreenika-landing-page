import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Send, X, Bot, User, FileText, AlertTriangle, Image as ImageIcon } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import './OpticBot.css'

/* Vault Labels for source citations */
const VAULT_LABELS = {
  technical: '📋 Technical Repository',
  transactional: '📊 Transactional Ledger',
  operational: '⚙️ Operational Brain',
}

/* ─── Enriched Knowledge Base for RAG simulation ─── */
const KNOWLEDGE_BASE = {
  services: 'Sreenika Security Solutions provides 7 core professional services: CCTV Camera Installation (Residential & Commercial), Biometric Attendance Systems, Access Control Systems, Home Security Systems, Video Door Phones, Fire Alarm Systems, and Annual Maintenance Contracts (AMC). Every solution is bespoke — engineered around your specific site, risk profile, and budget.',

  brands: 'SSS is an authorized multi-brand partner covering: Dahua, Hikvision, CP PLUS, Bosch, Samsung, D-Link, Godrej, Zebronics, Vintron, Syntel, and Syrotech. Unlike single-brand dealers, this gives us the flexibility to recommend the best-fit product for your exact requirement — not just what one manufacturer makes.',

  about: 'Sreenika Security Solutions was founded in 2017 and has built an 8+ year track record across Telangana and Andhra Pradesh. We operate from two strategic branches — Mancherial and JNTU Hyderabad — serving government institutions, corporate offices, residential communities, industrial facilities, and public infrastructure projects.',

  warranty: 'Every SSS installation is backed by a 2-year comprehensive warranty and emergency support. Our Annual Maintenance Contracts (AMC) go further — offering scheduled preventive maintenance, priority response SLAs (4hr/8hr/24hr tiers), and parts coverage. Most clients find that an AMC pays for itself after the first emergency call-out is avoided.',

  sectors: 'SSS has deep domain experience across both public and private sectors. Public sector: National Highways, Government Institutions, Municipality Offices, Schools, and Public Infrastructure. Private sector: Corporate Offices, IT Parks, Retail & Warehousing, Residential Properties, Gated Communities, Industrial Facilities, and Hospitality venues.',

  pricing: 'Our pricing is always customized — because a 4-camera home system and a 200-camera industrial site are fundamentally different projects. What we guarantee is professional-grade equipment, certified installation, and transparent billing. The first step is a no-obligation site survey where our consultant assesses your space and designs a system that fits your budget exactly.',

  cctv: 'Our CCTV solutions cover the full spectrum: HD, Full HD, and 4K resolution; IP and analog systems; bullet, dome, PTZ, fisheye, and varifocal camera types; IR/starlight/full-color night vision; DVR/NVR recording infrastructure; remote monitoring via mobile app (iOS & Android); and cloud or local storage options. We design camera placement for maximum coverage with minimum blind spots.',

  biometric: 'Our Biometric Attendance Systems include fingerprint scanners, face recognition terminals, iris scan, and RFID/smart card readers. These integrate with existing payroll and HR software, generate automated time-and-attendance reports, and can be synchronized across multiple branches in real time. Ideal for offices, factories, hospitals, and government institutions.',

  access: 'Access Control Systems from SSS range from single-door setups to enterprise-grade multi-door controllers. Options include electromagnetic locks, electric strikes, visitor management modules, anti-passback enforcement, and elevator access control. All systems can be integrated with your existing HR infrastructure for seamless employee lifecycle management.',

  fire: 'Our Fire Alarm Systems are fully compliant with IS 2189 standards and NBC fire codes. We supply and install conventional and addressable panels, optical smoke detectors, heat sensors, CO detectors, manual call points, hooters, and strobes. We also coordinate with firefighting panel vendors for integrated life-safety systems. Fire NOC documentation support is available.',

  home: 'For residential clients, our Home Security Systems include intrusion alarm panels, PIR motion sensors, door and window magnetic sensors, glass break detectors, and GSM/Wi-Fi dialers for instant mobile alerts. All systems can integrate with smart home ecosystems. We also offer Video Door Phones (VDP) for apartment buildings and individual villas — with two-way audio/video and mobile app access.',

  amc: 'An Annual Maintenance Contract with SSS is the smartest investment you can make after installation. It covers scheduled preventive visits, remote diagnostics, priority technician dispatch, parts coverage, and system health reporting. Our AMC clients experience zero unplanned downtime on average. Renewal rates speak for themselves — over 90% of our clients renew every year.',

  scale: 'SSS is actively expanding. With an established base across Telangana and AP, we are positioned to serve multi-city corporate rollouts, government framework contracts, and large-scale residential developments. If you are planning a phased deployment across multiple sites, we can offer volume pricing and dedicated account management.',

  consult: 'Every major SSS engagement begins with a professional site survey — free of charge. Our consultant visits your property, assesses coverage requirements, identifies vulnerabilities, and designs a system that addresses your exact risk profile. No generic quotes. No surprises. Just a clear, itemized proposal within 24–48 hours of the survey.',
}

/* ─── Persona-driven sales responses keyed by knowledge topic ─── */
const PERSONA_RESPONSES = {
  services: "Great question to start with. Sreenika Security Solutions isn't a one-product shop — we've built our reputation across seven professional service lines, each one engineered for a specific security challenge. Whether you're looking to protect a home, a corporate campus, or a government facility, we have the right solution. Let me ask — what type of property or site are you thinking about securing? That'll help me point you to exactly what fits.",

  brands: "Here's something most people don't realize until they've been burned by a single-brand dealer: not every camera is the right camera for every environment. That's why SSS carries over 10 authorized brands — Dahua, Hikvision, CP PLUS, Bosch, and more. We pick what works best for your site, your budget, and your long-term needs. No brand loyalty bias. Just the right tool for the job.",

  about: "Eight years in this industry in Telangana and AP — that's not just experience, that's a track record. We've completed installations for government highways, corporate campuses, schools, residential communities, and everything in between. Two branches, hundreds of active clients, and a team that still answers calls on weekends. That's the kind of company you want handling your security.",

  warranty: "This is where SSS is genuinely different. Every installation we do comes backed by a 2-year warranty and real emergency support — not a call center that logs a ticket. And for clients who want total peace of mind, our AMC is structured so you never have to think about your system again. We handle the maintenance, the monitoring, and the emergencies. You just live your life.",

  sectors: "We've worked across virtually every sector in the region. Government institutions, national highways, corporate IT parks, retail chains, factories, hospitals, gated communities — if there's a security requirement, we've likely solved a version of it before. That cross-sector experience is one of the reasons our solutions are so well-calibrated. Tell me about your industry — I can pull up relevant case types right away.",

  pricing: "I won't quote you a number without seeing your site first — and any company that does is guessing. What I can tell you is that our pricing is always transparent, always itemized, and always aligned to your actual needs. We don't upsell what you don't need. The process starts with a free site survey — our consultant comes to you, assesses the space, and within 48 hours you have a proposal you can actually evaluate. Want to get that scheduled?",

  cctv: "CCTV is our bread and butter — and we go deep on it. HD, 4K, IP, analog, PTZ, dome, bullet, fisheye — full-color night vision, mobile remote access, cloud or local NVR storage. But more important than the specs is the placement strategy. A camera in the wrong spot is just an expensive wall decoration. Our team designs coverage around your actual blind spots and risk zones. What kind of property are we looking at?",

  biometric: "Biometric systems have come a long way from the clunky fingerprint readers of a decade ago. Modern face recognition terminals process in under half a second, work in low light, and sync across multiple branches in real time. For businesses managing shift workers, field staff, or multi-location teams — this is the system that eliminates buddy punching, payroll disputes, and HR headaches permanently.",

  access: "Access control is really about two things: keeping the right people in the right places, and knowing exactly who went where and when. Our systems scale from a single controlled door to a full enterprise deployment with elevator access, anti-passback, and visitor management. And they tie directly into your HR system — so when an employee exits the company, their access is revoked automatically. No forgotten cards floating around.",

  fire: "Fire safety is non-negotiable — both legally and morally. Our fire alarm systems are fully IS 2189 compliant and NBC code-ready, which matters when you're applying for occupancy certificates or insurance. We handle everything from the initial design to the NOC documentation. Smoke detectors, heat sensors, addressable panels, hooters — the complete life-safety stack. This is one area where you really don't want to cut corners.",

  home: "For homes and apartments, security isn't just about cameras — it's about the confidence that when you lock your door and leave, everything you care about is protected. Our residential systems combine smart alarm sensors, Video Door Phones, remote monitoring, and instant mobile alerts. You'll know the moment a door opens, a window is touched, or someone approaches your main entrance. All from your phone, wherever you are.",

  amc: "Think of our AMC as security insurance that actually pays out. For a fixed annual fee, you get scheduled preventive maintenance, priority technician response, parts coverage, and remote system health checks. Our AMC clients don't call us in a panic — they call us for their quarterly visit. Emergency calls are for prospects who haven't signed up yet. Which category would you prefer to be in?",

  scale: "If you're thinking multi-site or long-term, that's actually where SSS gets very interesting. We're actively expanding our enterprise capability — volume pricing, dedicated account management, phased deployment planning. If you've got a rollout across multiple locations in AP or Telangana, let's talk properly. I'd want to connect you with our project lead directly.",

  consult: "The smartest thing to do right now is book a site survey — it's free, it's commitment-free, and it gives you a real plan instead of a generic brochure. Our consultant comes to your property, maps the coverage requirements, identifies the gaps, and gives you a transparent proposal within 48 hours. No pressure, no hard sell. Just a professional assessment you can actually use. Should I help you get that on the calendar?",
}

function findRelevantSource(query) {
  const q = query.toLowerCase()
  const matches = []

  for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
    const words = value.toLowerCase()
    const queryWords = q.split(/\s+/)
    let score = 0
    for (const word of queryWords) {
      if (word.length > 2 && words.includes(word)) score++
    }
    if (score > 0) matches.push({ key, value, score: score / queryWords.length })
  }

  matches.sort((a, b) => b.score - a.score)
  return matches.length > 0 ? matches[0] : null
}

function generateResponse(query, variant) {
  const source = findRelevantSource(query)

  if (!source || source.score < 0.15) {
    // Admin gets an operational/diagnostic framing; public/client get a consultative redirect
    const fallbackText = variant === 'admin'
      ? "Query is outside my indexed knowledge base. I've logged this for review. For precise data, cross-reference the Transactional Ledger or escalate to field staff. No action taken on my end without your instruction."
      : "That's a great question — and I want to make sure you get the right answer, not just a fast one. Our team specialist can address this directly. I'd recommend reaching out via WhatsApp for an immediate response, or I can log this and have someone call you back. Which works better for you?"
    return {
      text: fallbackText,
      source: null,
      vault: null,
      confidence: 0,
    }
  }

  const confidence = Math.min(source.score * 1.5, 0.99)
  const vault = variant === 'admin' ? 'operational' : variant === 'client' ? 'transactional' : 'technical'

  // Use the persona-driven sales response if available; fall back to raw KB value
  const personaText = PERSONA_RESPONSES[source.key]
  const responseText = variant === 'admin'
    ? source.value  // Admin gets clean, direct KB data
    : (personaText || source.value)  // Public/Client get the consultative pitch version

  return {
    text: responseText,
    source: `Knowledge Base: ${source.key.toUpperCase()}`,
    vault,
    confidence: confidence.toFixed(2),
  }
}

export default function OpticBot({ variant = 'public' }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [modelStatus, setModelStatus] = useState('initializing') // initializing, loading, ready, error
  const [loadingProgress, setLoadingProgress] = useState(0)
  const chatEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const { user } = useAuth()

  // Simulate loading the 2GB Gemma model via wllama
  useEffect(() => {
    let progress = 0
    setModelStatus('loading')
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setModelStatus('ready')
        
        // Add welcome message once model is "loaded"
        setMessages([
          {
            id: 'welcome',
            role: 'bot',
            text: variant === 'admin'
              ? "AI Command Center online. Operational Brain (Gemma 4-E2B) is active and indexed. I have full visibility into inventory, lead pipeline, service requests, and system health. I can also flag frontend/backend anomalies, draft proposals, analyze sales performance, and run business diagnostics — but I will never act on anything without your explicit go-ahead. What are we working on?"
              : variant === 'client'
              ? "Welcome back. I'm Optic Bot — your dedicated security consultant here at Sreenika Security Solutions. I have access to your installation history, service records, and AMC status. Whether you need a system health check, want to discuss an upgrade, or have a question about your coverage — I'm here. What can I do for you today?"
              : "Good to have you here. I'm Optic Bot — the security intelligence embedded in Sreenika Security Solutions. Eight years, two states, hundreds of installations — that's the knowledge base I work from. I'm here to help you find exactly the right security solution for your property, answer any questions you have, and connect you with our team when you're ready to take the next step. So — what are you looking to protect?",
            vault: variant === 'admin' ? 'operational' : variant === 'client' ? 'transactional' : 'technical',
          }
        ])
      }
      setLoadingProgress(Math.floor(progress))
    }, 400)
    
    return () => clearInterval(interval)
  }, [variant])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
      image: selectedImage,
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setSelectedImage(null)
    setIsTyping(true)

    // Simulate AI thinking
    await new Promise(r => setTimeout(r, 800 + Math.random() * 1200))

    const response = generateResponse(userMessage.text, variant)
    const botMessage = {
      id: (Date.now() + 1).toString(),
      role: 'bot',
      text: response.text,
      source: response.source,
      vault: response.vault,
      confidence: response.confidence,
    }

    setIsTyping(false)
    setMessages(prev => [...prev, botMessage])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setSelectedImage(ev.target.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={`optic-bot optic-bot--${variant}`}>
      <div className="optic-bot__header">
        <div className="optic-bot__header-left">
          <div className="optic-bot__icon">
            <Shield size={20} />
          </div>
          <div>
            <h2 className="optic-bot__title">OPTIC BOT</h2>
            <span className="label-caps optic-bot__subtitle">
              <span className="status-pip status-pip--active" />
              {variant === 'admin' ? 'AI Command Center' : variant === 'client' ? 'Client AI Consultant' : 'AI Security Consultant'}
            </span>
          </div>
        </div>
        <span className="data-mono optic-bot__vault-label">
          {VAULT_LABELS[variant === 'admin' ? 'operational' : variant === 'client' ? 'transactional' : 'technical']}
        </span>
      </div>

      <div className="optic-bot__messages">
        {modelStatus !== 'ready' ? (
          <div className="optic-bot__loading-state">
            <Bot size={48} color="var(--steel-blue)" style={{ opacity: 0.5, marginBottom: '1rem' }} />
            <h3>Initializing Gemma Model</h3>
            <p className="data-mono" style={{ color: 'var(--outline)', marginBottom: '1rem' }}>Loading gemma-4-E2B-it-UD-IQ2_M.gguf (2GB)</p>
            <div className="device-limit-bar" style={{ width: '200px', margin: '0 auto', background: 'var(--surface-container)' }}>
              <div className="device-limit-bar__fill" style={{ width: `${loadingProgress}%` }} />
            </div>
            <p className="data-mono" style={{ marginTop: '0.5rem', color: 'var(--steel-blue)' }}>{loadingProgress}%</p>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`optic-bot__message optic-bot__message--${msg.role}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="optic-bot__message-avatar">
                  {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className="optic-bot__message-content">
                  {msg.image && (
                    <div className="optic-bot__message-image">
                      <img src={msg.image} alt="Uploaded" />
                    </div>
                  )}
                  <p>{msg.text}</p>
                  {msg.source && (
                    <div className="optic-bot__citation">
                      <FileText size={12} />
                      <span className="data-mono">
                        Source: {msg.source} | Confidence: {msg.confidence} | Vault: {VAULT_LABELS[msg.vault]}
                      </span>
                    </div>
                  )}
                  {!msg.source && msg.role === 'bot' && msg.id !== 'welcome' && (
                    <div className="optic-bot__citation optic-bot__citation--warning">
                      <AlertTriangle size={12} />
                      <span className="data-mono">Below confidence threshold — redirecting to human support</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {isTyping && modelStatus === 'ready' && (
          <motion.div
            className="optic-bot__typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Bot size={16} />
            <div className="optic-bot__typing-dots">
              <span /><span /><span />
            </div>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="optic-bot__input-area">
        {selectedImage && (
          <div className="optic-bot__image-preview">
            <img src={selectedImage} alt="Preview" />
            <button onClick={() => setSelectedImage(null)} className="optic-bot__image-remove">
              <X size={14} />
            </button>
          </div>
        )}
        <div className="optic-bot__input-row">
          {variant === 'admin' && (
            <>
              <button
                className="optic-bot__attach-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Upload image for analysis"
              >
                <ImageIcon size={18} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </>
          )}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              variant === 'admin'
                ? 'Issue command, run diagnostic, or query operational data...'
                : variant === 'client'
                ? 'Ask about your system, AMC, or request a service update...'
                : 'Tell me about your property or ask about our security services...'
            }
            className="optic-bot__input"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() && !selectedImage}
            className="optic-bot__send-btn"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
