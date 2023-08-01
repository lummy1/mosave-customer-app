import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService';
import AuthConstants from '../config/authConstant';
import { get } from '@/app/utils/storage';
import { ILogin, IRegister } from '@/app/utils/interface';

const user = get(AuthConstants());

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isFullLoading: false,
    response: null,
    message: '' 
}

// Register user
export const register = createAsyncThunk(
    'auth/register',
    async (user: IRegister, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user: ILogin, thunkAPI) => {
    try {
        const res = await authService.login(user);
        return res;

    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const logout = createAsyncThunk('auth/logout', async (user, thunkAPI) => {    
    try {
        const res = await authService.logout();
        return res;
    } catch (error: any) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                state.user = action.payload.data
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = String(action.payload)
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                state.user = action.payload.data
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = String(action.payload)
                state.user = null
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })            
            .addCase(logout.fulfilled, (state, action) => {
                console.log(action);
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload.message
                state.user = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = String(action.payload)
                state.user = null
            })
    }
})
export const { reset } = authSlice.actions;

export default authSlice.reducer;