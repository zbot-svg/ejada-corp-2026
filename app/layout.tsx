import type { Metadata } from 'next'
import { headers } from 'next/headers'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { SmoothScroll } from '@/components/providers/smooth-scroll'
import { MagneticCursor } from '@/components/providers/cursor'
import { ScrollProgress } from '@/components/ui/scroll-progress'

export const metadata: Metadata = {
  title: 'Ejada Systems — National Transformation Orchestrator',
  description: "Saudi Arabia's leading technology transformation partner. 20 years orchestrating enterprise transformation across finance, government, healthcare, and beyond.",
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''
  const isArabic = pathname.startsWith('/ar')
  const isAdmin = pathname.startsWith('/admin')

  return (
    <html
      lang={isArabic ? 'ar' : 'en'}
      dir={isArabic ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;500;600;700;800&family=Noto+Sans+Arabic:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={isAdmin ? undefined : { cursor: 'none' }}>
        {isAdmin ? (
          /* Admin panel: no custom cursor, smooth scroll, or progress bar */
          children
        ) : (
          <ThemeProvider defaultTheme="light">
            <SmoothScroll>
              <MagneticCursor />
              <ScrollProgress />
              {children}
            </SmoothScroll>
          </ThemeProvider>
        )}
      </body>
    </html>
  )
}
