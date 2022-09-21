import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Fade, Paper, Popper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import styled from 'styled-components'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useLocation } from 'react-router-dom';
import DialogCustom from '../../components/DialogCustom';
import { useDispatch } from 'react-redux'
import { deleteAllStudent, searchStudent, getStudentList } from "../../pages/StudentManagement/studentSlice"
import { styled as muiStyled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../pages/Login/authSlice';

const Wrapper = styled.div`
    background-color: #1565C0;
    padding: 20px 50px;
    color: #fff;
    h2{
        padding: 0;
        margin: 0;
    }
`

const Search = muiStyled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = muiStyled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = muiStyled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Header = () => {

    const navigate = useNavigate()
    const localtion = useLocation()
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [value, setValue] = useState("");


    const handleClickOpen = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    const handleDelete = () => dispatch(deleteAllStudent())
    const handleChange = event => setValue(event.target.value)

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    const handleRedirect = (url) => {
        setOpen(false)
        navigate(url)
    }

    const handleLogout = async () => {
        await dispatch(logout())
        await navigate("/login")
    }
    useEffect(() => {
        const handler = setTimeout(() => {
            value.length > 0
                ?
                dispatch(searchStudent(value))
                :
                dispatch(getStudentList(1))
        }, 600);
        return () => clearTimeout(handler);
    }, [value]);
    const menuList = [
        {
            name: "Add Student",
            icon: <AddIcon />,
            onClick: () => handleRedirect("/add-student"),
        },
        {
            name: "Delete All",
            icon: <DeleteIcon />,
            onClick: handleClickOpen,
        },
        {
            isDivider: true
        },
        {
            name: "Logout",
            icon: <LogoutIcon />,
            onClick: handleLogout,
        }
    ]
    return (
        <Wrapper>
            <Stack justifyContent="space-between" direction="row" spacing={2}>
                <h2>Student Management System</h2>
                {
                    localtion.pathname.split("/")[1] !== 'add-student'
                    &&
                    <Stack justifyContent="space-between" direction="row" spacing={2}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                onChange={handleChange}
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/2.jpg" onClick={handleClick('bottom-end')} />
                        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Paper sx={{ width: 320, maxWidth: '100%' }}>
                                        <MenuList>
                                            {
                                                menuList.map((item, index) => {
                                                    if (item.isDivider)
                                                        return <Divider key={index} />
                                                    else return <MenuItem key={index} onClick={item.onClick}>
                                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                                        <ListItemText>{item.name}</ListItemText>
                                                        <Typography variant="body2" color="text.secondary">
                                                            ⌘X
                                                        </Typography>
                                                    </MenuItem>
                                                })
                                            }
                                        </MenuList>
                                    </Paper>
                                </Fade>
                            )}
                        </Popper>
                    </Stack>

                }
                <DialogCustom
                    onDelete={handleDelete}
                    openDialog={openDialog}
                    onCloseDialog={handleCloseDialog}
                    label={`Delete All Student`} />
            </Stack>
        </Wrapper>
    );
};

export default Header;