'use client'

import React from 'react'

export const Icon: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      <div style={{
        width: '24px',
        height: '24px',
        borderRadius: '6px',
        background: 'linear-gradient(135deg, #001081 0%, #0018A0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 900,
        color: '#1FED93',
        lineHeight: 1,
      }}>
        e
      </div>
      <span style={{
        fontSize: '14px',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--theme-text)',
      }}>
        Ejada CMS
      </span>
    </div>
  )
}

export default Icon
