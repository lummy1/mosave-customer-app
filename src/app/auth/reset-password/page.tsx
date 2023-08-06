"use client"
import Public from '@/app/components/Layouts/Public'
import Link from 'next/link'
import React, {ChangeEvent, FormEvent, FormEventHandler, useState } from 'react'

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })

    const { password, confirmPassword  } = formData;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData);
    }

  return (
    <Public>
          <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"> Reset Password </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={onSubmit}>
              <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                  <input type="password" name="password" id="password" value={password} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
              </div>
              <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm new password</label>
                  <input type="confirm-password" name="confirmPassword" id="confirm-password" value={confirmPassword} onChange={onChange}  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
              </div>
              <div className="flex items-start">
                  <div className="flex items-center h-5">   
                    <input id="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={true} />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/terms">Terms and Conditions</Link></label>
                  </div>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset password</button>
          </form>
    </Public>
  )
}

export default ResetPassword