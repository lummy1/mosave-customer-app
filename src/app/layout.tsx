"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import PublicHeader from './components/PublicHeader'
import ReduxProvider from '@/redux/provider/provider'
import SidebarNav from './components/SidebarNav'
import { usePathname, useRouter } from 'next/navigation'
import NavBar from './components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Moloyal Web',
  description: 'Moloyal app for savings and ticketing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter();
  console.log(router);
  const pathname = usePathname();
  console.log(pathname);
  return (
    <html lang="en">
      <body className={`${inter.className}`} suppressHydrationWarning={true}>
        <ReduxProvider>
          {pathname === '/auth/login' || pathname === '/auth/register' || pathname === '/auth/forgot-password' || pathname === '/auth/reset-password' ?
           <PublicHeader />  : <NavBar />}
          <main className="">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  )
}
