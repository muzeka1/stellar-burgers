import { Preloader } from '@ui';
import React from 'react';
import {useSelector} from 'react-redux';
import {Outlet, Navigate} from 'react-router-dom';


export const ProtectedRoute = () => {
    const { isInit, isLoading, user } = {isInit: true, isLoading: false, user: {name: "123"}};
    
    if (!isInit || isLoading) {
        return <Preloader />
    }
    if (!user) {
        return <Navigate replace to='/login' />
    }
    return <Outlet />;
};