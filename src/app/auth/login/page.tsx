"use client";
import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store/store";
import { toast } from "react-toastify";
import { login, reset } from "@/redux/features/auth/authSlice";
import { redirect, useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Public from "@/app/components/Layouts/Public";
import { validationSchema } from "@/validations/loginValidation";
import { IBoolean, ILogin, IString } from "@/utils/interface";
import ButtonLoader from "@/app/components/Loader/ButtonLoader";

const Login = () => {
  const initialValue = { email: "", password: "" };
  const [formData, setFormData] = useState<ILogin>(initialValue);
  const [formErrors, setFormErrors] = useState<ILogin>(initialValue);
  const [touched, setTouched] = useState<IBoolean>({
    email: false,
    password: false,
  });
  const [disabled, setDisabled] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const [mount, setMount] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );
  const { email, password } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onFocus = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const userData = { email, password };
    console.log(userData);
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      toast.success(message);
      //navigate('/dashboard', { state: { from: location?.pathname }, replace: true });
      redirect("/dashboard"); // or router.push("/dashboard");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  useEffect(() => {
    // yup.reach(validationSchema)
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setFormErrors(initialValue);
      })
      .catch((err: any) => {
        console.log(initialValue);
        const errors: ILogin = initialValue;
        err.inner.forEach((error: any) => {
          if (touched[error.path]) errors[error.path] = error.message;
        });
        setFormErrors(errors);
      });

    validationSchema.isValid(formData).then((valid) => setDisabled(!valid));
  }, [formData]);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      {mount && (
        <Public>
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Login to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={email}
                onFocus={onFocus}
                onChange={onChange}
                className="inputClass"
                required={true}
              />
              <small className="form-error">
                {touched.email && formErrors.email}
              </small>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordType}
                  autoComplete="off"
                  name="password"
                  id="password"
                  onFocus={onFocus}
                  value={password}
                  onChange={onChange}
                  className="inputClass"
                  required={true}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      setPasswordType(
                        passwordType === "password" ? "text" : "password"
                      )
                    }
                  >
                    {passwordType === "password" ? (
                      <FaEyeSlash className="dark:text-white" />
                    ) : (
                      <FaEye className="dark:text-white" />
                    )}
                  </button>
                </div>
              </div>
              <small className="form-error">
                {touched.password && formErrors.password}
              </small>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="checkboxClass"
                    required={false}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={disabled}
              className={`${
                isLoading || disabled ? "disabled" : " "
              } w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
            >
              <ButtonLoader
                isLoading={isLoading}
                text="Login"
                loadingText="Logging in"
              />
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Register
              </Link>
            </p>
          </form>
        </Public>
      )}
    </>
  );
};

export default Login;
