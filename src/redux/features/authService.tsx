import { get, removeItem, store } from '@/app/utils/storage';
import axios from 'axios';
import AuthConstants from '../config/authConstant';
import { ILogin, IRegister } from '@/app/utils/interface';


const baseUrl = process.env.REACT_APP_BASEURL;
const user = get(AuthConstants());
const token = user.token;



const register = async (data: IRegister) => {
  const response = await axios.post(baseUrl + '/api/users', data);
  if (response.data) {
    store(AuthConstants(), response.data.data)
  }

  return response.data;
}

// Login user
const login = async (data: ILogin) => {
  const response = await axios.post(baseUrl + '/api/users/login', data)

  if (response.data) {
    store(AuthConstants(), response.data.data);
  }
  return response.data
}


// get user profile
const profile = async () => {
  const response = await axios.get(baseUrl + '/api/users/profile',)
  return response.data;
}

// Logout user
const logout = async () => {
  const response = await axios.get(baseUrl + '/api/users/logout', {
    headers: { 'Authorization': `Bearer ${token}` }
})
  if (response.data) {
    removeItem(AuthConstants())
  }
  return response.data;

}

const authService = {
  register, login, profile, logout
}



export default authService