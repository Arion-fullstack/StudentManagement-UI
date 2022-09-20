import axios from "axios"
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();

const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
})

request.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            config.headers['refreshToken'] = localStorage.getItem("refreshToken")
        }
        return config;
    }, (error) => {
        return Promise.reject(error)
    }
);

request.interceptors.response.use(
    async res => {
        const prevRequest = res.config;
        const code = res.data.code
        if (code === 401) {
            const newAccessToken = await request.post(`auth/refresh-token`)
            localStorage.setItem("token", newAccessToken.data.data.token)
            localStorage.setItem("refreshToken", newAccessToken.data.data.refreshToken)
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken.data.data.token}`;
            prevRequest.headers['refreshToken'] = newAccessToken.data.data.refreshToken
            return request(prevRequest);
        }
        return res;
    },
    async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 401) {
            const newAccessToken = await request.post(`auth/refresh-token`)
            localStorage.setItem("token", newAccessToken.data.data.token)
            localStorage.setItem("refreshToken", newAccessToken.data.data.refreshToken)
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken.data.data.token}`;
            prevRequest.headers['refreshToken'] = newAccessToken.data.data.refreshToken
            return request(prevRequest);
        }
        return Promise.reject(error);
    }
);

export const get = async (path, options = {}) => {
    const response = await request.get(path, options)
    return response.data;
}

export const post = async (path, options = {}) => {
    const response = await request.post(path, options)
    return response.data;
}

export const destroy = async (path, options = {}) => {
    const response = await request.delete(path, options)
    return response.data;
}

export const put = async (path, options = {}) => {
    const response = await request.put(path, options)
    return response.data;
}

export default request