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

const ItemStudent = ({ row }) => {
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
            <StyledTableCell spacing={2}>
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
                                        <TextField defaultValue={row.firstName} label="firstName" {...register("firstName", { required: true })} />
                                        <TextField defaultValue={row.lastName} label="lastName" {...register("lastName", { required: true })} />
                                        <TextField defaultValue={row.email} label="Email" {...register("email", { required: true })} />
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
        </StyledTableRow >
    );
};
ItemStudent.propTypes = {
    row: PropTypes.object
};
ItemStudent.defaultProps = {
    row: {}
}
export default memo(ItemStudent);