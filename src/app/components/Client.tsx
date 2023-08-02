'use client'
import React from 'react'
import { Inter } from 'next/font/google'
import PublicHeader from './PublicHeader'
import ReduxProvider from '@/redux/provider/provider'
import { usePathname } from 'next/navigation'
import NavBar from './NavBar';
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
    return {
        props: {
            heading: 'The best headlines around!',
            details: 'This response is static.',
        },
    };
}

const Client = ({ children }: { children: React.ReactNode }, heading: string ="Moloyal Page") => {
    const pathname = usePathname();
    return (
        <>
            <html lang="en">
                <Head>
                    <title id="title">{heading}</title>
                    <link rel="icon" href="../moloyal.ico" />
                </Head>
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