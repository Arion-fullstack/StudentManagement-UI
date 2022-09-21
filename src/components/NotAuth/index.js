import React from 'react';
import { getToken, logout } from '../../pages/Login/authSlice'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';

const NotAuth = () => {
    const token = useSelector(getToken)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    if (!token) {
        return <Navigate to={'/login'} replace={true} />;
    }
    const handleLogout = async () => {
        await dispatch(logout());
        await navigate('/login');
    }
    return (
        <Box className='center'>
            <h1 >Bạn không có quyền truy cập</h1>
            <h3>
                Nếu có lỗi phát sinh, vui lòng liên hệ bộ phận kỹ thuật!
            </h3>
            <Box >
                <Button onClick={() => navigate("/")}>
                    Quay lại
                </Button>
                <Button onClick={handleLogout} >
                    Đăng xuất
                </Button>
            </Box>
        </Box >
    );
};

export default NotAuth;