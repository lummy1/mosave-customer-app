'use client'
import React from 'react'
import { Inter } from 'next/font/google'
import ReduxProvider from '@/redux/provider/provider'
import { usePathname } from 'next/navigation'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
    return {
        props: {
            heading: 'The best headlines around!',
            details: 'This response is static.',
        },
    };
}

const Client = ({ children }: { children: React.ReactNode }, heading: string = "Moloyal Page") => {
    const currentPath = usePathname();
    const publicPath = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password', '/auth/verify']
    const path = publicPath.find((p) => p === currentPath);
    return (
        <>
            <html lang="en">
                <Head>
                    <title id="title">{heading}</title>
                    <link rel="icon" href="../moloyal.ico" />
                </Head>
                <body className={`${inter.className}`} suppressHydrationWarning={true}>
                    <ToastContainer />
                    <ReduxProvider>
                        {/* {path != undefined ? <PublicHeader /> : <NavBar />} */}
                        {children}
                    </ReduxProvider>
                </body>
            </html>
        </>
    )
}

export default Client