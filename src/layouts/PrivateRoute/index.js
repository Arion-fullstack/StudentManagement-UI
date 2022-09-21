import React from 'react'
import PropTypes from 'prop-types'
import { getToken } from '../../pages/Login/authSlice'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

const propTypes = {
    roles: PropTypes.array
}

const PrivateRoute = ({ roles }) => {
    const token = useSelector(getToken)
    const location = useLocation()

    if (!token) {
        return <Navigate to={'/login'} replace={true} />;
    }
    const decode = jwtDecode(token || '');
    const rolesFromServer = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

    let isRole = false
    if (rolesFromServer) {
        if (typeof (rolesFromServer) === 'array') {
            rolesFromServer.forEach(el => {
                isRole = roles.includes(el)
            });
        }
        else isRole = roles.includes(rolesFromServer)
    }
    if (isRole)
        return <Outlet />;
    return <Navigate to={'/not-auth'} state={{ url: location.pathname }} replace={true} />;
}

PrivateRoute.propTypes = propTypes
PrivateRoute.defaultProps = {
    roles: []
}

export default PrivateRoute
