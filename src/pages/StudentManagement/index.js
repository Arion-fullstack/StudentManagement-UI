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
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from '@mui/material';
import { Box } from '@mui/system';
import MySnackbar from '../../components/MySnackbar';


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
    const students = []
    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
    const handleChange = (event, value) => console.log(value);
    return (
        <Wrapper>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Student First Name</StyledTableCell>
                            <StyledTableCell align="left">Student Last Name</StyledTableCell>
                            <StyledTableCell align="left">Student Email</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            students.map((row, index) => (
                                <ItemStudent row={row} key={index} />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                isOpenSnackbar && <MySnackbar isOpen={isOpenSnackbar} severity="error" title={"dwq"} />
            }
        </Wrapper >
    );
};

export default StudentManagement;