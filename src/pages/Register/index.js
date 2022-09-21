import React, { useState } from 'react'
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Box, Button, Stack, TextField } from '@mui/material';
import { register as registerApi } from "../Login/authSlice"
import MySnackbar from '../../components/MySnackbar';

const Wrapper = styled.div`
    max-width: 1000px;
    margin: 50px auto;
`
const WrapForm = styled.div`
    padding: 20px;
    margin-top: 20px;
`
const Header = styled.div`
    background-color: #000;
    color: #fff;
    padding: 5px 20px;
`
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 1,
    overflow: 'hidden'
};
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [severity, setSeverity] = useState("success");
    const [isDisabled, setIsDisabled] = useState(false)

    if (localStorage.getItem('token') !== null) {
        return <Navigate to="/" replace={true} />
    }
    else {

        const onSubmit = async (data) => {
            try {
                if (data.password === data.password_2) {
                    await dispatch(registerApi(data))
                    await setTitle("Register Successfully")
                    await setIsOpen(true)
                    await navigate("/login")
                }
                else {
                    setIsOpen(true)
                    setTitle("Password does not match")
                    setSeverity("error")
                }
            }
            catch (error) {
                setIsOpen(true)
                setTitle("Sign in error " + error.message)
                setSeverity("error")
            }
            setTimeout(() => { setIsOpen(false) }, 1000);
        }
        return (
            <Wrapper>
                <Box sx={style}>
                    <Header>
                        <h2>Register</h2>
                    </Header>
                    <WrapForm>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4} sx={{ width: '100%' }}>
                                <TextField error={errors.userName ? true : false} label="Username" {...register("userName", { required: true })} />
                                <TextField error={errors.password ? true : false} type="password" label="Password" {...register("password", { required: true })} />
                                <TextField error={errors.password_2 ? true : false} type="password" label="Enter the password Password" {...register("password_2", { required: true })} />
                                <Stack justifyContent="flex-end" alignItems="center" direction="row" spacing={2}>
                                    <Link to="/login">Login</Link>
                                    <Button
                                        disabled={isDisabled}
                                        variant="contained"
                                        size='large'
                                        type="submit"
                                    >
                                        Register
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                    </WrapForm>
                </Box>

                {isOpen && <MySnackbar title={title} severity={severity} isOpen={isOpen} />}
            </Wrapper >
        );
    }
}

export default Register;