"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Avatar, Dropdown } from 'flowbite-react'
import ThemeToggle from './ThemeToggle'
// import avatar from '/imgs/160x160/img1.jpg';
import Image from 'next/image'
import { logout } from '@/redux/features/authSlice';
import { AppDispatch } from '@/redux/store/store';
import { IUser } from '../utils/interface';

const Header = () => {
    const [userInfo, setUser] = useState<IUser>({
        image: {
            url: '',
            publicId: ''
        },
        firstName: '',
        lastName: '',
        email: ''
    })
    const dispatch = useDispatch<AppDispatch>();

    const logoutUser = () => {
        dispatch(logout())
    }

    return (
        <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg id="toggleSidebarMobileClose" className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                        <Link href="/" className="flex ml-2 md:mr-24">
                            <Image className="mx-auto h-10 w-auto mr-2" src="/imgs/logo/logo.png" alt="logo" width={0} height={0} sizes="100vw" />
                        </Link>
                        <form action="/" method="GET" className="hidden lg:block lg:pl-3.5">
                            <label htmlFor="topbar-search" className="sr-only">Search</label>
                            <div className="relative mt-1 lg:w-96">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input type="text" name="email" id="topbar-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" />
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center">
                        <button id="toggleSidebarMobileSearch" type="button" className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Search</span>

                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </button>

                        <ThemeToggle />

                        {/*  Profile */}
                        <div className="flex items-center ml-3">
                            <Dropdown inline label={<Avatar alt="User Profile" img={userInfo?.image?.url === '' ? '/imgs/160x160/img1.jpg' : userInfo?.image?.url} rounded />}>
                                <Dropdown.Header>
                                    <span className="block text-sm"> {userInfo.firstName + ' ' + userInfo.lastName}</span>
                                    <span className="block truncate text-sm font-medium"> {userInfo.email}</span>
                                </Dropdown.Header>
                                <Dropdown.Item as={Link} href={'/dashboard'}>
                                    Dashboard
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} href={'/profile'}>
                                    Profile
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} href={'/blogs'}>
                                    Blogs
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item as={'button'} onClick={logoutUser}>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header