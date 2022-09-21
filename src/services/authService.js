import * as request from '../common/APIClient';


export const loginApi = async (data) => {
    try {
        return await request.post(`auth/login`, data)
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export const registerApi = async (data) => {
    try {
        return await request.post(`auth/register`, data)
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export const logoutApi = async () => {
    try {
        return await request.post(`auth/logout`)
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export const refreshTokenApi = async () => {
    try {
        return await request.post(`auth/refresh-token`)
    }
    catch (error) {
        return Promise.reject(error);
    }
}