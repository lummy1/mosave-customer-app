"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Avatar, Dropdown } from 'flowbite-react'
import ThemeToggle from './ThemeToggle'
// import avatar from '/imgs/profiles/img1.jpg';
import Image from 'next/image'
import { logout } from '@/redux/features/auth/authSlice';
import { AppDispatch } from '@/redux/store/store';
import { IUser } from '../../utils/interface';
import PropTypes from 'prop-types';


type IProperty = {userData: object, openSidebar: boolean, onSidebarOpen(): any, onSidebarClose(): any }

const Header = (props: IProperty) => {
    const {userData, openSidebar, onSidebarOpen, onSidebarClose } = props;
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
        <nav className="md:ml-64 fixed z-50 md:w-[calc(100vw-276px)] w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        {/* // <nav className='flex items-center justify-between bg-white fixed w-full z-50 md:w-[calc(100vw-276px)] h-[74px] pr-5 pl-5 sm:pl-6 sm:pr-10 py-[18px]'> */}
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button onClick={() => !openSidebar ? onSidebarOpen() : onSidebarClose()} id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="p-2 text-gray-600 rounded cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg id="toggleSidebarMobileHamburger" className={`${!openSidebar ? '' : 'hidden'} w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg id="toggleSidebarMobileClose" className={`${!openSidebar ? 'hidden' : ''} w-6 h-6`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                        <Link href="/" className="md:hidden flex ml-2 md:mr-24">
                            <Image className="mx-auto h-10 w-auto mr-2" src="/imgs/logo/logo.png" alt="logo" width={0} height={0} sizes="100vw" />
                        </Link>
                        <div className="hidden md:block lg:pl-3.5">
                            <div className="relative mt-1 lg:w-96">
                               <div>
                                    <h1 className='text-xl font-bold dark:text-white'>Dashboard</h1>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button onClick={() => !openSidebar ? onSidebarOpen() : onSidebarClose()} id="toggleSidebarMobileSearch" type="button" className="p-2 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Search</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </button>

                        <ThemeToggle />

                        {/*  Profile */}
                        <div className="flex items-center ml-3 dark:text-white">
                            <Dropdown inline label={<Avatar alt="User Profile" img={userInfo?.image?.url === '' ? '/imgs/profiles/img1.jpg' : userInfo?.image?.url} rounded />}>
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
                                <Dropdown.Item as={Link} href={'/settings'}>
                                    settings
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

Header.propTypes = {
    onSidebarOpen: PropTypes.func,
    onSidebarClose: PropTypes.func,
    openSidebar: PropTypes.bool.isRequired,
    userData: PropTypes.object
};

export default Header