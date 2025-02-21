import { Preloader } from '@ui';
import React from 'react';
import { useSelector, UseSelector } from 'react-redux';
import {Outlet, Navigate} from 'react-router-dom';
import { RootState } from '../../services/store';


export const ProtectedRoute = () => {

    const { isInit, isLoading, user } = useSelector((store: RootState) => store.user);
    
    if (!isInit || isLoading) {
        return <Preloader />
    }
    if (!user) {
        return <Navigate replace to='/login' />
    }
    return <Outlet />;
};