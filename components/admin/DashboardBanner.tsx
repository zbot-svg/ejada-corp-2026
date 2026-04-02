'use client'

import React from 'react'

const cards = [
  {
    label: 'Collections',
    items: ['Case Studies', 'Partners', 'Capabilities', 'Sectors', 'Insights', 'Contact Submissions'],
    accent: '#0070C0',
  },
  {
    label: 'Globals (Sections)',
    items: ['Hero', 'Who We Are', 'What We Believe', 'Orchestrator Model', 'Values', 'What We Enable', 'Proof Points', 'Contact'],
    accent: '#1FED93',
  },
  {
    label: 'Configuration',
    items: ['Site Settings', 'Navigation', 'Footer'],
    accent: '#F39C12',
  },
]

export const DashboardBanner: React.FC = () => {
  return (
    <div style={{
      padding: '24px 0',
      marginBottom: '8px',
    }}>
      {/* Welcome header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'var(--theme-text)',
          opacity: 0.4,
          marginBottom: '6px',
        }}>
          Ejada CMS
        </div>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 800,
          color: 'var(--theme-text)',
          margin: 0,
          letterSpacing: '-0.02em',
        }}>
          Dashboard
        </h2>
        <p style={{
          fontSize: '13px',
          color: 'var(--theme-text)',
          opacity: 0.5,
          margin: '4px 0 0 0',
        }}>
          Manage Ejada website content across English and Arabic. Changes are versioned and published instantly.
        </p>
      </div>

      {/* Quick reference cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
      }}>
        {cards.map(card => (
          <div key={card.label} style={{
            background: 'var(--theme-elevation-1)',
            borderRadius: '8px',
            padding: '16px',
            border: '1px solid var(--theme-color-gray-100)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: card.accent,
              }} />
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--theme-text)',
              }}>
                {card.label}
              </div>
            </div>
            <div style={{
              fontSize: '12px',
              lineHeight: 1.7,
              color: 'var(--theme-text)',
              opacity: 0.6,
            }}>
              {card.items.join(' · ')}
            </div>
          </div>
        ))}
      </div>

      {/* Locale reminder */}
      <div style={{
        marginTop: '12px',
        padding: '10px 14px',
        borderRadius: '6px',
        background: 'rgba(0, 112, 192, 0.06)',
        border: '1px solid rgba(0, 112, 192, 0.12)',
        fontSize: '12px',
        color: 'var(--theme-text)',
        opacity: 0.7,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{ fontSize: '14px' }}>🌐</span>
        <span>Use the locale switcher at the top of each editor to toggle between <strong>English</strong> and <strong>العربية</strong> content.</span>
      </div>
    </div>
  )
}

export default DashboardBanner
