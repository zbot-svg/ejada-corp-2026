'use client'

import React from 'react'

export const BeforeLogin: React.FC = () => {
  return (
    <div style={{
      textAlign: 'center',
      marginBottom: '24px',
    }}>
      <div style={{
        fontSize: '10px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: 'rgba(255,255,255,0.35)',
        marginBottom: '8px',
      }}>
        Ejada Systems
      </div>
      <h2 style={{
        fontSize: '20px',
        fontWeight: 800,
        color: 'white',
        margin: '0 0 6px 0',
        letterSpacing: '-0.02em',
      }}>
        Welcome Back
      </h2>
      <p style={{
        fontSize: '13px',
        color: 'rgba(255,255,255,0.4)',
        margin: 0,
        lineHeight: 1.5,
      }}>
        Sign in to manage content and site settings.
      </p>
    </div>
  )
}

export default BeforeLogin
