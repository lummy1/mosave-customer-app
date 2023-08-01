'use client'
import React from 'react'
import { Inter } from 'next/font/google'
import PublicHeader from './PublicHeader'
import ReduxProvider from '@/redux/provider/provider'
import { usePathname, useRouter } from 'next/navigation'
import NavBar from './NavBar';

const inter = Inter({ subsets: ['latin'] })

const Client = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <>
            {/* ... rest of your code */}
            <html lang="en">
                <body className={`${inter.className}`} suppressHydrationWarning={true}>
                    <ReduxProvider>
                        {pathname === '/auth/login' || pathname === '/auth/register' || pathname === '/auth/forgot-password' || pathname === '/auth/reset-password' ?
                            <PublicHeader /> : <NavBar />}
                        <main className="">
                            {children}
                        </main>
                    </ReduxProvider>
                </body>
            </html>
        </>
    )
}

export default Client