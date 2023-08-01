"use client"
import React, { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, useAppSelector } from '@/redux/store/store';
import { toast } from 'react-toastify';
import { reset } from '@/redux/features/authSlice';
import { redirect, useRouter } from 'next/navigation';
import {FaEye, FaEyeSlash} from 'react-icons/fa'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [passwordType, setPasswordType] = useState('password')


    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { user, isLoading, isError, isSuccess, message } = useAppSelector(
        (state) => state.auth
    )

    const { email, password } = formData;


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const userData = { email, password }
        console.log(userData);
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            toast.success(message);
            console.log(router)
            //navigate('/dashboard', { state: { from: location?.pathname }, replace: true });
            redirect('/dashboard')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, dispatch])

    return (

        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <Image className="mx-auto h-10 w-auto mr-2" src="/imgs/logo/logo.png" alt="logo" width={0} height={0} sizes="100vw" />
                    {/* Moloyal */}
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" autoComplete='off' value={email} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <div className="relative">
                                    <input type={passwordType} autoComplete='off' name="password" id="password" value={password} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
                                        <button type='button' onClick={()=> setPasswordType( passwordType === "password" ? 'text' : 'password')}>                                        
                                        {passwordType === "password" ?  <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>

                                <small className="hidden mt-2 text-xs text-red-600 dark:text-red-600">Error Message</small>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={false} />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <Link href="/auth/forgot-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link href="/auth/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login