import React from 'react';
import Navbar from '../navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

const Layout = () => {
    return <>
    <CssBaseline />
        <Navbar />
        <Outlet />
    
    </>;
}

export default Layout;


