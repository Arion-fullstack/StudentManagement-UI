import * as request from '../common/APIClient';

export const getStudentListApi = async (page = 1) => {
    try {
        return await request.get(`students?page=${page}`)
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export const createStudentApi = async (student) => {
    try {
        return await request.post('students', student)
    }
    catch (error) {
        console.log(error);
    }
}

export const searchStudentApi = async (name) => {
    try {
        return await request.get(`students/search?name=${name}`)
    }
    catch (error) {
        console.log(error);
    }
}

export const getStudentApi = async (id) => {
    try {
        return await request.get(`students/${id}`)
    }
    catch (error) {
        console.log(error);
    }
}

export const updateStudentApi = async (student) => {
    try {
        return await request.put(`students/${student.id}`, student)
    }
    catch (error) {
        console.log(error);
    }
}

export const deleteStudentApi = async (id) => {
    try {
        return await request.destroy(`students/${id}`)
    }
    catch (error) {
        console.log(error);
    }
}

export const deleteAllStudentApi = async () => {
    try {
        return await request.destroy(`students`)
    }
    catch (error) {
        console.log(error);
    }
}

