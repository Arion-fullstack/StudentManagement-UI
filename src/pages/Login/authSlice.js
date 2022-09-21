import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { loginApi, logoutApi, registerApi } from "../../services/authService"
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();

export const login = createAsyncThunk(
    "auth/login",
    async (data) => {
        return await loginApi(data)
    }
)
export const register = createAsyncThunk(
    "auth/register",
    async (data) => {
        return await registerApi(data)
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        return await logoutApi()
    }
)

const initialState = {
    token: localStorage.getItem("token") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    username: "",
    message: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            const token = action.payload.data.token
            const refreshToken = action.payload.data.refreshToken
            localStorage.setItem("token", token)
            localStorage.setItem("refreshToken", refreshToken)
            state.token = token
            state.refreshToken = refreshToken
            state.username = action.payload.data.username
            state.message = action.payload.message
        },
        [logout.fulfilled]: (state, action) => {
            localStorage.removeItem("token")
            localStorage.removeItem("refreshToken")
        },
        [register.fulfilled]: (state, action) => {
            console.log(action.payload)
        }
    },
})

export const getRefreshToken = state => state.authSlice.refreshToken
export const getToken = state => state.authSlice.token

export default authSlice