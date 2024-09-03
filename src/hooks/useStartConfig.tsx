import  { useEffect } from 'react';
import { useAppDispatch } from './redux';
import { changeAuth, changeToken } from '../store/reducers/UserSlice';

const useStartConfig = () => {
    const dispatch = useAppDispatch()
    useEffect( () => {
        const data = sessionStorage.getItem("isAuth")
        const token = sessionStorage.getItem("token")
        if (data && token){
            dispatch(changeAuth(true))
            dispatch(changeToken(token))
        }
    } , [dispatch] )
};

export default useStartConfig;