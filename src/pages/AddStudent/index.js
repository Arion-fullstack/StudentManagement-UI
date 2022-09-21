import React, { useState } from 'react'
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStudent } from '../StudentManagement/studentSlice'
import { Box, Button, Snackbar, Stack, TextField } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
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
    padding: 20px;
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

function AddStudent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [isOpen, setIsOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false)
    const vertical = 'bottom'
    const horizontal = 'left'
    const onSubmit = async (data) => {
        try {
            await setIsDisabled(true)
            await dispatch(createStudent(data))
            await setIsOpen(true)
            await setTimeout(() => navigate("/"), 600)
        }
        catch (error) {
            console.log(error)
        }

    }
    return (
        <Wrapper>
            <Box sx={style}>
                <Header>
                    Create Student
                </Header>
                <WrapForm>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4} sx={{ width: '100%' }}>
                            <TextField error={errors.firstName ? true : false} label="First Name" {...register("firstName", { required: true })} />
                            {errors.firstName && <span className='dqwdwqfwq'>Please enter a valid firstName</span>}
                            <TextField error={errors.lastName ? true : false} label="Last Name" {...register("lastName", { required: true })} />
                            {errors.lastName && <span className='dqwdwqfwq'>Please enter a valid lastName</span>}
                            <TextField error={errors.email ? true : false} label="Email" {...register("email", {
                                required: true, pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: "Please enter a valid email"
                                }
                            })} />
                            {errors.email && <span className='dqwdwqfwq'>Please enter a valid email</span>}
                            <Stack justifyContent="flex-end" direction="row" spacing={2}>
                                <Button
                                    onClick={() => navigate("/")}
                                    size="large" color="secondary"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={isDisabled}
                                    variant="contained"
                                    size='large'
                                    type="submit"
                                >
                                    Create
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </WrapForm>
            </Box>
            <Snackbar
                open={isOpen}
                key={vertical + horizontal} autoHideDuration={600}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Create student success
                </Alert>
            </Snackbar>
        </Wrapper >
    )
}

export default AddStudent
