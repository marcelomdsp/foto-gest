import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'FotoGest - Sistema de Gerenciamento',
  description: 'Sistema de pagamentos para fotógrafos',
  themeColor: '#9810fa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  )
}