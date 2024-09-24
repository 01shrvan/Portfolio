'use client'

import { useState } from 'react'
import { ThemeProvider } from './ThemeContext'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <html lang="en" className={theme}>
      <head>
        <title>Shrvan Benke - Full-Stack Developer</title>
        <meta name="description" content="Portfolio of John Doe, Full-Stack Developer" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${theme === 'light' ? 'bg-[#F5E6D3] text-[#2C3E50]' : 'bg-[#2C3E50] text-[#F5E6D3]'} transition-colors duration-300`}>
        <ThemeProvider value={{ theme, setTheme }}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}