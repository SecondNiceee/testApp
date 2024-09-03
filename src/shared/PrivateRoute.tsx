import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { Navigate } from 'react-router-dom';

interface IProps {
    children : React.ReactElement
}
const PrivateRoute = ({children}:IProps) => {
    const isAuth = useAppSelector(state => state.UserSlice.isAuth)
    if (isAuth){
        return children
    }
    return <Navigate to="/sign"/>
};

export default PrivateRoute;