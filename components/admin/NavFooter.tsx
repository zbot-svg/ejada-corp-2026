'use client'

import React from 'react'

export const NavFooter: React.FC = () => {
  return (
    <div style={{
      padding: '12px 16px',
      borderTop: '1px solid var(--theme-color-gray-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <div style={{
          width: '16px',
          height: '16px',
          borderRadius: '4px',
          background: 'linear-gradient(135deg, #001081 0%, #0018A0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '9px',
          fontWeight: 900,
          color: '#1FED93',
          lineHeight: 1,
        }}>
          e
        </div>
        <span style={{
          fontSize: '10px',
          fontWeight: 600,
          color: 'var(--theme-text)',
          opacity: 0.35,
          letterSpacing: '0.05em',
        }}>
          Ejada Systems
        </span>
      </div>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: '10px',
          fontWeight: 600,
          color: '#0070C0',
          textDecoration: 'none',
          opacity: 0.8,
        }}
      >
        View Site →
      </a>
    </div>
  )
}

export default NavFooter
