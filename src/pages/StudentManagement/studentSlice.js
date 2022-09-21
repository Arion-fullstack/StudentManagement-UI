import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
	getStudentListApi,
	createStudentApi,
	searchStudentApi,
	getStudentApi,
	updateStudentApi,
	deleteStudentApi,
	deleteAllStudentApi
} from '../../services/studentService'

export const getStudentList = createAsyncThunk(
	"studentList/getStudentListApi",
	async (page) => {
		return await getStudentListApi(page)
	})
export const createStudent = createAsyncThunk(
	"studentList/createStudentApi",
	async (student) => {
		return await createStudentApi(student)
	})
export const updateStudent = createAsyncThunk(
	"studentList/updateStudentApi",
	async (student) => {
		return await updateStudentApi(student)
	})
export const deleteStudent = createAsyncThunk(
	"studentList/deleteStudentApi",
	async (id) => {
		return await deleteStudentApi(id)
	})
export const deleteAllStudent = createAsyncThunk(
	"studentList/deleteAllStudentApi",
	async () => {
		return await deleteAllStudentApi()
	})
export const searchStudent = createAsyncThunk(
	"studentList/searchStudentApi",
	async (value) => {
		return await searchStudentApi(value)
	})

const initialState = {
	data: [],
	paginate: {},
	messageError: ""
}

const studentSlice = createSlice({
	name: "studentList",
	initialState,
	reducers: {
	},
	extraReducers: {
		[getStudentList.fulfilled]: (state, action) => {
			if (action.payload) {
				state.data = action.payload.data
				state.paginate = action.payload.paginate
			}
		},
		[getStudentList.rejected]: (state, action) => {
			state.data = [];
			if (action.error.code === 'ERR_BAD_REQUEST') {
				state.messageError = "Not have access!"
			}
		},
		[deleteStudent.fulfilled]: (state, action) => {
			const index = state.data.findIndex(item => item.id === action.payload.data.id);
			state.data.splice(index, 1);
		},
		[updateStudent.fulfilled]: (state, action) => {
			console.log(action)
			state.data.forEach(item => {
				if (item.id === action.payload.data.id) {
					item.firstName = action.payload.data.firstName
					item.firstName = action.payload.data.firstName
					item.email = action.payload.data.email
					return
				}
			})
		},
		[deleteAllStudent.fulfilled]: (state) => {
			state.data = [];
		},

		[searchStudent.fulfilled]: (state, action) => {
			state.data = action.payload.data
			state.paginate = action.payload.paginate
		}
	},
})

export const getListStudent = state => state.studentSlice.data
export const getMessageError = state => state.studentSlice.messageError
export const gePaginateStudent = state => state.studentSlice.paginate

export default studentSlice

