"use client"
import React from 'react'
import Header from '../Header'
import SidebarNav from '../SidebarNav'

import SidebarNav2 from '../SidebarNav2'
import SidebarNav3 from '../SidebarNav3'

import Header2 from '../Header2'
import Template from '../Template'
import Footer from '../Footer'

const Private = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
            <Header />
            {/* Sidebar */}
            <SidebarNav3 />
            <main className="p-4 md:ml-64 h-auto pt-20    max-w-screen-xl md:min-h-screen rounded-lg">
                {/* <Template /> */}
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Private