"use client"
import React, { useState, useEffect } from 'react'
import { get, removeItem, store } from '../utils/storage';
import { Tooltip } from 'flowbite-react';
import { FaMoon } from 'react-icons/fa';
import { BiSun } from 'react-icons/bi'

const ThemeToggle = () => {
    const storedTheme = get('theme');
    const [theme, setTheme] = useState(storedTheme ? storedTheme : 'system');
    const [isMounted, setIsMounted] = useState(false)
    //const element =  typeof window !== "undefined" ? document.documentElement: null;
    const element = isMounted ? document.documentElement: null;
    const darkQuery = isMounted ? window.matchMedia('(prefers-color-scheme: dark)'): null;

    useEffect(() => {
        setIsMounted(true)
      }, [])

    useEffect(() => {
        if (get('theme') === "dark" || (!("theme" in localStorage) && darkQuery?.matches)) {
            element?.classList.add("dark");
        }
        else {
            element?.classList.remove("dark");
        }
    }, [])

    useEffect(() => {
        if (theme === "dark") {
            element?.classList.add("dark");
            store('theme', 'dark');
        } if (theme === "light") {
            element?.classList.remove("dark");
            store('theme', 'light');
        }
        else if (theme === "system") {
            removeItem('theme');
        }
    }, [theme]);
    return (
        <>
        {isMounted && (
        <Tooltip id='tooltip' content={`Switch to ${theme === 'light' ? 'dark' : 'light'}`} style={`${theme === 'light' ? 'dark' : 'light'}`}>
            <button onClick={(() => setTheme(theme === 'light' ? 'dark' : 'light'))} type="button" className="inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                {theme === 'light' ? (
                    <FaMoon size={20} />
                ) : (
                    <BiSun size={20} />
                )}
            </button>
        </Tooltip>
        )}
        </>
    )
}

export default ThemeToggle