'use client'

import { useState } from 'react'
import { SectionLabel, CTAButton } from '@/components/ui'
import { pageContent } from '@/lib/content'

export default function Contact() {
  const { contact } = pageContent
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', sector: '', message: '',
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <section id="contact" className="relative bg-navy-deep overflow-hidden section-pad">
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <SectionLabel light>Get in Touch</SectionLabel>
            <h2 className="text-white font-black leading-tight tracking-tight mb-4"
              style={{ fontSize: 'clamp(32px, 5vw, 60px)', letterSpacing: '-0.025em' }}>
              {contact.headline}
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-10 max-w-sm">
              {contact.body}
            </p>

            <div className="space-y-4">
              {[
                { label: 'Address', value: contact.address },
                { label: 'Email', value: contact.email },
                { label: 'Phone', value: contact.phone },
                { label: 'Web', value: contact.website },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="text-xs font-bold uppercase tracking-widest text-white/30 w-16">{label}</div>
                  <div className="text-white/70 text-sm">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/5 border border-white/10 p-8 lg:p-10">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-sky-400/20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Message Sent</h3>
                <p className="text-white/50 text-sm">We&apos;ll be in touch within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Ahmed Al-Rashid" required />
                  <FormField label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} placeholder="Al Rajhi Bank" />
                </div>
                <FormField label="Work Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="ahmed@alrajhibank.com" required />
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+966 11 000 0000" />
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
                      Sector
                    </label>
                    <select
                      value={form.sector}
                      onChange={(e) => setForm({ ...form, sector: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 text-white/70 text-sm py-2.5
                        focus:outline-none focus:border-sky-400 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-navy-deep">Select sector</option>
                      <option value="finance" className="bg-navy-deep">Financial Services</option>
                      <option value="government" className="bg-navy-deep">Government</option>
                      <option value="healthcare" className="bg-navy-deep">Healthcare</option>
                      <option value="transport" className="bg-navy-deep">Transport</option>
                      <option value="retail" className="bg-navy-deep">Retail</option>
                      <option value="real-estate" className="bg-navy-deep">Real Estate</option>
                      <option value="other" className="bg-navy-deep">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your transformation priorities..."
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 text-white/70 text-sm py-2.5
                      focus:outline-none focus:border-sky-400 transition-colors resize-none placeholder:text-white/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-sky-400 text-navy-deep font-bold text-sm uppercase tracking-widest
                    hover:bg-white transition-colors duration-200 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function FormField({
  label, type = 'text', value, onChange, placeholder, required
}: {
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
        {label}{required && ' *'}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border-b border-white/20 text-white/70 text-sm py-2.5
          focus:outline-none focus:border-sky-400 transition-colors placeholder:text-white/20"
      />
    </div>
  )
}
