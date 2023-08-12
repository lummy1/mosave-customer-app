"use client"
import ButtonLoader from '@/app/components/ButtonLoader'
import Public from '@/app/components/Layouts/Public'
import { reset, resetPassword } from '@/redux/features/auth/authSlice'
import { AppDispatch, useAppSelector } from '@/redux/store/store'
import Link from 'next/link'
import React, {ChangeEvent, FormEvent, FormEventHandler, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'
import { toast } from 'react-toastify';
import { strengthColor, strengthIndicator } from '@/app/utils/password-strength'
import { IBoolean, IPasswordType, IPasswordValidation, IResetPassword, IString } from '@/app/utils/interface'
import { validationSchema } from '@/app/validations/resetPasswordValidation'

const ResetPassword = () => {
    const initialValues = {password: '', confirmPassword: ''}
    const [formData, setFormData] = useState<IResetPassword>(initialValues)
    const [errors, setErrors] = useState<IResetPassword>(initialValues);
    const [level, setLevel] = useState<IPasswordValidation>({ label: '', color: '', bgColor: '', percent: 0 });
    const [type, setType] = useState<IPasswordType>({ type1: 'password', type2: 'password' })
    const [touched, setTouched] = useState<IBoolean>({firstName: false, lastName: false, email: false, phone: false, password: false, confirmPassword: false, terms: false });
    const [disabled, setDisabled] = useState(true);

    const { password, confirmPassword  } = formData;
    const { user, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth)
    const dispatch = useDispatch<AppDispatch>();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const setPassword = (value: string) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    const onSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData);
        dispatch(resetPassword(formData))
    }

    useEffect(() => {
        validationSchema.validate(formData, { abortEarly: false })
            .then(() => {
                setErrors(initialValues);
            })
            .catch((err: any) => {
                const errs: IResetPassword = initialValues;
                err.inner.forEach((error:any) => {
                    console.log(touched[error.path]);
                    if (touched[error.path]) errs[error.path] = error.message;
                })
                setErrors(errs);
            });

        validationSchema.isValid(formData).then(valid => setDisabled(!valid));
    }, [formData]);

    useEffect(() => {
        setPassword('');
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            toast.success(message);
            redirect("/auth/login");
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, dispatch])

  return (
    <Public>
          <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"> Reset Password </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={onSubmit}>
              <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                  <input type="password" name="password" id="password" value={password} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                  {password.length > 0 && (
                            <div>
                                <div className="flex justify-between my-1">
                                    <span className={`${level?.color} text-sm font-medium  dark:text-white`}>{level?.label}</span>
                                    <span className="text-sm font-medium text-blue-700 dark:text-white">{level?.percent}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                    <div className={`${level?.bgColor} w-[${level?.percent}%] h-2.5 rounded-full`}></div>
                                </div>
                            </div>
                        )}
                        <small className="mt-2 text-xs text-red-600 dark:text-red-600">{touched.password && errors.password}</small>
                </div>
              <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm new password</label>
                  <input type="confirm-password" name="confirmPassword" id="confirm-password" value={confirmPassword} onChange={onChange}  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                  <small className="mt-2 text-xs text-red-600 dark:text-red-600">{touched.confirmPassword && errors.confirmPassword}</small>
              </div>
              <div className="flex items-start">
                  <div className="flex items-center h-5">   
                    <input id="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={true} />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/terms">Terms and Conditions</Link></label>
                  </div>
              </div>
              <button type="submit" className={`${isLoading ? "cursor-not-allowed bg-blue-400 opacity-25" : " "} w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>
              <ButtonLoader isLoading={isLoading} text='Reset password' loadingText='Loading' />                
                </button>
          </form>
    </Public>
  )
}

export default ResetPassword