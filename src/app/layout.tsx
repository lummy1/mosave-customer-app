import './globals.css'
import type { Metadata } from 'next'
import Client from './components/Client'


export const metadata: Metadata = {
  title: 'Moloyal Web',
  description: 'Moloyal app for savings and ticketing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Client >
      {children}
    </Client>
  )
}
