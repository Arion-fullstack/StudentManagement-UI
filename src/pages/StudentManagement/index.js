import React, { useEffect, useState } from 'react';
import { styled as styledMui } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import ItemStudent from '../../components/ItemStudent';
import { getStudentList, getListStudent, gePaginateStudent, getMessageError } from "./studentSlice"
import jwtDecode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from '@mui/material';
import { Box } from '@mui/system';
import MySnackbar from '../../components/MySnackbar';
import { getToken } from '../Login/authSlice'

const StyledTableCell = styledMui(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const Wrapper = styled.div`
    max-width: 1000px;
    margin: 50px auto;
`
const TableBottom = styled(Box)`
    padding-block: 20px !important;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: flex-end;
`
const StudentManagement = () => {

    const dispatch = useDispatch();
    const students = useSelector(getListStudent)
    const paginate = useSelector(gePaginateStudent)
    const token = useSelector(getToken)
    const messageError = useSelector(getMessageError)
    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
    const handleChange = (event, value) => dispatch(getStudentList(value));

    //check role edit permissions
    const decode = jwtDecode(token || '');
    const rolesFromServer = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    let isPermission = false;

    if (typeof (rolesFromServer) === "array")
        isPermission = rolesFromServer.includes("Admin")
    else isPermission = rolesFromServer === "Admin"

    // dispatch action get list student
    useEffect(() => {
        dispatch(getStudentList(1));
    }, [])

    // show message error
    useEffect(() => {
        if (messageError.length > 0) {
            setIsOpenSnackbar(true)
        }
        const updateStateSnackbar = setTimeout(() => {
            setIsOpenSnackbar(false)
        }, 2000)

        return () => clearTimeout(updateStateSnackbar)
    }, [messageError]);

    return (
        <Wrapper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Student First Name</StyledTableCell>
                            <StyledTableCell align="left">Student Last Name</StyledTableCell>
                            <StyledTableCell align="left">Student Email</StyledTableCell>
                            {
                                isPermission && <StyledTableCell align="center">Action</StyledTableCell>
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.length > 0 ? students.map((row, index) => (
                            <ItemStudent isPermission={isPermission} row={row} key={index} />
                        ))
                            : <TableRow>
                                <StyledTableCell colSpan="4" className='center'>
                                    <h3>{messageError.length > 0 ? messageError : "No students exist"}</h3>
                                </StyledTableCell>
                            </TableRow>}
                    </TableBody>
                </Table>

                {students.length > 0 && paginate && <TableBottom>
                    <Pagination count={paginate.totalPage} color="primary" onChange={handleChange} />
                </TableBottom>}

            </TableContainer>
            {
                isOpenSnackbar && <MySnackbar isOpen={isOpenSnackbar} severity="error" title={messageError} />
            }
        </Wrapper >
    );
};

export default StudentManagement;