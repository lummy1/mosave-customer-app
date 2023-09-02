"use client"
import Public from '@/app/components/Layouts/Public'
import { strengthColor, strengthIndicator } from '@/utils/password-strength'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { validationSchema } from "@/validations/registerValidation";
import { IBoolean, IPasswordType, IRegister } from '@/utils/interface'
import ButtonLoader from '@/app/components/ButtonLoader'
import { AppDispatch, useAppSelector } from '@/redux/store/store'
import { redirect } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { register, reset } from '@/redux/features/auth/authSlice'
import { toast } from 'react-toastify';

const Register = () => {
    const initialValues = { firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '', terms: false }
    const [formData, setFormData] = useState<IRegister>(initialValues)
    const [errors, setErrors] = useState<IRegister>(initialValues);
    const [type, setType] = useState<IPasswordType>({ type1: 'password', type2: 'password' })
    const [level, setLevel] = useState({ label: '', color: '', bgColor: '', percent: 0 });
    const [touched, setTouched] = useState<IBoolean>({firstName: false, lastName: false, email: false, phone: false, password: false, confirmPassword: false, terms: false });
    const [disabled, setDisabled] = useState(true);
    const { firstName, lastName, email, phone, password, confirmPassword, terms } = formData;
    const { type1, type2 } = type;
    const { user, isLoading, isError, isSuccess, message } = useAppSelector((state) => state.auth )
    const dispatch = useDispatch<AppDispatch>();

    const setPassword = (value: string) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    const changePasswordType = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const button: HTMLButtonElement = e.currentTarget;
        setType((prevState) => ({ ...prevState, [button.name]: type[button.name] === "password" ? 'text' : 'password' }))
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.name === 'terms' ? e.target.checked : e.target.value,
        }))
    }

    const onFocus = (e: ChangeEvent<HTMLInputElement>) => { 
        const { name } = e.target;
        setTouched({...touched, [name]: true});
     }

    useEffect(() => {
        validationSchema.validate(formData, { abortEarly: false })
            .then(() => {
                setErrors(initialValues);
            })
            .catch((err: any) => {
                const errs: IRegister = initialValues;
                err.inner.forEach((error:any) => {
                    if (touched[error.path]) errs[error.path] = error.message;
                })
                setErrors(errs);
            });

        validationSchema.isValid(formData).then(valid => setDisabled(!valid));
    }, [formData]);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        if (!terms) {
            toast.error('Please accept the terms and conditions')
          } else if (password !== confirmPassword) {
            toast.error('Password does not match');
          } else {
            const userData = { firstName, lastName, email, phone, password, confirmPassword, terms }
            dispatch(register(userData))
          }
    }

    useEffect(() => {
        setPassword('');
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            toast.success(message);
            redirect("/auth/verify")
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, dispatch])

    return (
        <Public>
            <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="/dashboard" onSubmit={onSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="w-full">
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                        <input type="text" name="firstName" autoComplete='off' id="firstName" onFocus={onFocus} value={firstName} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                        {/* <small className="form-error">{errors && errors.firstName}</small> */}
                        <small className="form-error">{touched.firstName && errors.firstName}</small>
                    </div>
                    <div className="w-full">
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                        <input type="text" name="lastName" autoComplete='off' id="lastName" onFocus={onFocus} value={lastName} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                        <small className="form-error">{touched.lastName && errors.lastName}</small>
                    </div>

                    <div className="">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" autoComplete='off' id="email" onFocus={onFocus} value={email} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <small className="form-error">{touched.email && errors.email}</small>
                    </div>

                    <div className="w-full">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                        <input type="text" name="phone" autoComplete='off' id="phone" onFocus={onFocus} value={phone} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                        <small className="form-error">{touched.phone && errors.phone}</small>
                    </div>
                    <div className="">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <div className="relative">
                            <input type={type1} autoComplete='new-password' onFocus={onFocus} name="password" id="password" value={password} onChange={(e) => { onChange(e); setPassword(e.target.value); }} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
                                <button type='button' name='type1' onClick={changePasswordType}>
                                    {type1 === "password" ? <FaEyeSlash className="dark:text-white"/> : <FaEye className="dark:text-white"/>}
                                </button>
                            </div>
                        </div>
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
                        <small className="form-error">{touched.password && errors.password}</small>
                    </div>
                    <div className="">
                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <div className="relative">
                            <input type={type2} autoComplete='new-password' name="confirmPassword" id="confirm-password" onFocus={onFocus} value={confirmPassword} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
                                <button type='button' name='type2' onClick={changePasswordType}>
                                    {type2 === "password" ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <small className="form-error">{touched.confirmPassword && errors.confirmPassword}</small>
                    </div>
                    {/* <div> */}
                    <div className="flex items-start sm:col-span-2">
                        <div className="flex items-center h-5">
                            <input name="terms" checked={terms} onFocus={onFocus} onChange={onChange} id="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the {' '}
                                <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/terms">Terms and Conditions</Link></label>
                        </div>
                    </div>
                    <small className="text-xs text-red-600 dark:text-red-600">{touched.terms && errors.terms}</small>
                    {/* </div> */}
                    <button type="submit" disabled={disabled} className={`${isLoading || disabled ? "disabled" : " "} sm:col-span-2 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>
                    <ButtonLoader isLoading={isLoading} text='Register' loadingText='Loading' />    
                    </button>
                    <p className="sm:col-span-2 text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <Link href="/auth/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                    </p>
                </div>
            </form>
        </Public>
    )
}

export default Register