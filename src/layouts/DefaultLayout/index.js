import React from 'react'
import Header from '../Header'
import { Outlet } from 'react-router-dom'

function DefaultLayout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default DefaultLayout
