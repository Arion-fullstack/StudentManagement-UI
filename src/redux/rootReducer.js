import studentSlice from '../pages/StudentManagement/studentSlice'
import authSlice from '../pages/Login/authSlice'

const rootReducer = {
    studentSlice: studentSlice.reducer,
    authSlice: authSlice.reducer
}

export default rootReducer