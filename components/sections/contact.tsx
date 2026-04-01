'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionLabel } from '@/components/ui/section-label'
import { TextReveal } from '@/components/primitives/text-reveal'
import { FadeUp, FadeRight } from '@/components/primitives/fade-up'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { MarqueeText } from '@/components/primitives/marquee'
import { pageContent } from '@/lib/content'

const sectors = [
  'Financial Services', 'Government & Public Sector', 'Healthcare',
  'Transportation', 'Retail & Consumer', 'Energy & Utilities', 'Real Estate',
]

export default function Contact() {
  const { contact } = pageContent
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', sector: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ backgroundColor: 'var(--color-text-primary)' }}
    >
      {/* Ambient marquee */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden select-none">
        <MarqueeText
          items={["LET'S BUILD", '·', 'GET IN TOUCH', '·', 'START A PROJECT', '·']}
          speed={40}
          className="opacity-[0.05]"
          textClassName="text-[clamp(40px,7vw,90px)] font-black text-white whitespace-nowrap"
        />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left — copy */}
          <div>
            <SectionLabel light>Get in Touch</SectionLabel>
            <TextReveal
              by="word" delay={0.1} stagger={0.06}
              className="font-black leading-tight tracking-tight text-white mb-6"
              style={{
                fontSize: 'clamp(32px,5vw,64px)',
                letterSpacing: '-0.03em',
              } as React.CSSProperties}
            >
              {contact.headline}
            </TextReveal>

            <FadeUp delay={0.4}>
              <p className="text-base leading-relaxed mb-12 max-w-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {contact.body}
              </p>
            </FadeUp>

            <FadeUp delay={0.5}>
              <div className="space-y-5">
                {[
                  { label: 'Address', value: contact.address },
                  { label: 'Email', value: contact.email },
                  { label: 'Phone', value: contact.phone },
                ].map(item => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-16 text-xs font-bold uppercase tracking-widest pt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {item.label}
                    </div>
                    <div className="text-sm text-white">{item.value}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right — form */}
          <FadeRight delay={0.2}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-16 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: 'var(--color-accent-mint)' }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M5 14l7 7 11-11" stroke="#001081" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Message received.</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    We'll be in touch within one business day.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'name', label: 'Full Name', type: 'text' },
                      { name: 'company', label: 'Company', type: 'text' },
                    ].map(field => (
                      <div key={field.name} className="relative">
                        <input
                          type={field.type}
                          name={field.name}
                          value={form[field.name as keyof typeof form]}
                          onChange={handleChange}
                          placeholder={field.label}
                          required
                          className="w-full bg-transparent border-b px-0 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-white/60"
                          style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'email', label: 'Email Address', type: 'email' },
                      { name: 'phone', label: 'Phone (optional)', type: 'tel' },
                    ].map(field => (
                      <div key={field.name} className="relative">
                        <input
                          type={field.type}
                          name={field.name}
                          value={form[field.name as keyof typeof form]}
                          onChange={handleChange}
                          placeholder={field.label}
                          required={field.name === 'email'}
                          className="w-full bg-transparent border-b px-0 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-white/60"
                          style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                        />
                      </div>
                    ))}
                  </div>

                  <select
                    name="sector"
                    value={form.sector}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b px-0 py-3 text-sm outline-none transition-colors duration-200 appearance-none cursor-pointer"
                    style={{
                      borderColor: 'rgba(255,255,255,0.2)',
                      color: form.sector ? 'white' : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    <option value="" disabled style={{ background: '#001081' }}>Select Sector</option>
                    {sectors.map(s => (
                      <option key={s} value={s} style={{ background: '#001081' }}>{s}</option>
                    ))}
                  </select>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={4}
                    required
                    className="w-full bg-transparent border-b px-0 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-200 resize-none focus:border-white/60"
                    style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                  />

                  <MagneticButton
                    type="submit"
                    variant="dark"
                    disabled={loading}
                    className="w-full justify-center py-4"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </FadeRight>
        </div>
      </div>
    </section>
  )
}
