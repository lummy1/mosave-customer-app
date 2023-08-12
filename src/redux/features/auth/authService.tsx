import { get, removeItem, store } from "@/app/utils/storage";
import axios from "axios";
import {
  IForgotPassword,
  ILogin,
  IRegister,
  IResetPassword,
  IVerifyOTP,
} from "@/app/utils/interface";
import AuthConstants from "@/redux/config/authConstant";

const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
const user = get(AuthConstants());
const token = user.token;

const register = async (data: IRegister) => {
  const response = await axios.post(baseUrl + "/customer/register", data);
  if (response.data) {
    store(AuthConstants(), response.data.data);
  }

  return response.data;
};

// Login user
const login = async (data: ILogin) => {
  const response = await axios.post(baseUrl + "/customer/login", data);
  if (response.data) {
    console.log(response.data);
    if (response.data.error == false) {
      store(AuthConstants(), response.data.data);
    }
  }
  return response.data;
};

// customer forgot Password
const forgotPassword = async (data: IForgotPassword) => {
  const response = await axios.post(baseUrl + "/customer/forgotpass", data);
  if (response.data) {
    console.log(response.data.data);
  }
  return response.data;
};

// reset password
const resetPassword = async (data: IResetPassword) => {
  const response = await axios.post(baseUrl + "/customer/resetpassword", data);
  if (response.data) {
    console.log(response.data.data);
  }
  return response.data;
};

// verify email or phone
const verifyEmail = async (data: IVerifyOTP) => {
  const response = await axios.post(baseUrl + "/customer/otpverify", data);
  if (response.data) {
    console.log(response.data.data);
  }
  return response.data;
};

// get user profile
const profile = async () => {
  const response = await axios.get(baseUrl + "/api/users/profile");
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.get(baseUrl + "/api/users/logout", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.data) {
    removeItem(AuthConstants());
  }
  return response.data;
};

const authService = {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  profile,
  logout,
};

export default authService;
