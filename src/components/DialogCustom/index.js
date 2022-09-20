import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const funcDefault = () => { }

const DialogCustom = ({ openDialog, onCloseDialog, label, onDelete }) => {
    const handleDelete = () => {
        onDelete()
        onCloseDialog();
    }

    return (
        <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={onCloseDialog}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Notification"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {label}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onCloseDialog}>Cancel</Button>
                <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}
DialogCustom.propsTypes = {
    openDialog: PropTypes.bool.isRequired,
    onCloseDialog: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
}

DialogCustom.defaultProps = {
    openDialog: false,
    onCloseDialog: funcDefault,
    label: funcDefault,
    onDelete: funcDefault,
}
export default DialogCustom
