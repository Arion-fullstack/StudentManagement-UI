import React, { useState, memo } from 'react';
import { Button, Fab, TableRow, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { styled as styledMui } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import styled from "styled-components"
import DialogCustom from '../DialogCustom';

import { useDispatch } from "react-redux"
import { deleteStudent, updateStudent } from "../../pages/StudentManagement/studentSlice"

const StyledTableRow = styledMui(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const StyledTableCell = styledMui(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflow: 'hidden'
};

const Header = styled.div`
    background-color: #ccc;
    color: #fff;
    padding: 20px;
`
const WrapForm = styled.div`
    padding: 20px;
    margin-top: 20px;
`

const ItemStudent = ({ row, isPermission }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClickOpen = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    const handleDelete = () => dispatch(deleteStudent(row.id))
    const onSubmit = data => {
        dispatch(updateStudent({ ...data, id: row.id }));
        handleClose()
    };

    return (
        <StyledTableRow key={row.firstName}>
            <StyledTableCell component="th" scope="row">
                {row.firstName}
            </StyledTableCell>
            <StyledTableCell align="left">{row.lastName}</StyledTableCell>
            <StyledTableCell align="left">{row.email}</StyledTableCell>
            {
                isPermission && <StyledTableCell spacing={2}>
                    <Stack justifyContent="flex-end" direction="row" spacing={2}>
                        <Fab size="medium" color="secondary" aria-label="edit" onClick={handleOpen}>
                            <EditIcon />
                        </Fab>
                        <Fab size="medium" color="error" aria-label="delete" onClick={handleClickOpen}>
                            <DeleteIcon />
                        </Fab>
                    </Stack>
                    {
                        open && <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Header>
                                    Edit Student
                                </Header>
                                <WrapForm>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Stack spacing={4} sx={{ width: '100%' }}>
                                            <TextField error={errors.firstName ? true : false} defaultValue={row.firstName} label="First Name" {...register("firstName", { required: true })} />
                                            {errors.firstName && <span className='dqwdwqfwq'>Please enter a valid firstName</span>}
                                            <TextField error={errors.lastName ? true : false} defaultValue={row.lastName} label="Last Name" {...register("lastName", { required: true })} />
                                            {errors.lastName && <span className='dqwdwqfwq'>Please enter a valid lastName</span>}
                                            <TextField error={errors.email ? true : false} defaultValue={row.email} label="Email" {...register("email", {
                                                required: true, pattern: {
                                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: "Please enter a valid email"
                                                }
                                            })} />
                                            {errors.email && <span className='dqwdwqfwq'>Please enter a valid email</span>}
                                            <Stack justifyContent="flex-end" direction="row" spacing={2}>
                                                <Button
                                                    size="large" color="secondary"
                                                    onClick={handleClose}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    size='large'
                                                    type="submit"
                                                >
                                                    Update
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    </form>
                                </WrapForm>
                            </Box>
                        </Modal>
                    }
                    {
                        openDialog && <DialogCustom
                            onDelete={handleDelete}
                            openDialog={openDialog}
                            onCloseDialog={handleCloseDialog}
                            label={`Delete Student: ${row.firstName + " " + row.lastName}`} />
                    }

                </StyledTableCell>
            }

        </StyledTableRow >
    );
};
ItemStudent.propTypes = {
    row: PropTypes.object,
    isPermission: PropTypes.bool
};
ItemStudent.defaultProps = {
    row: {},
    isPermission: false
}
export default memo(ItemStudent);



