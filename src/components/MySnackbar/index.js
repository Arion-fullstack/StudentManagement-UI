import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

const MySnackbar = ({ isOpen, title, severity }) => {

    const vertical = 'bottom'
    const horizontal = 'left'
    return (
        <Snackbar
            open={isOpen}
            key={vertical + horizontal
            } autoHideDuration={600} >
            <Alert severity={severity} sx={{ width: '100%' }}>
                {title}
            </Alert>
        </Snackbar >
    )
}

MySnackbar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    severity: PropTypes.string
}

MySnackbar.defaultProps = {
    isOpen: false,
    title: "",
    severity: "success"
}

export default MySnackbar
