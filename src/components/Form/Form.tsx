import React, { FC, memo, useEffect, useState } from 'react';
import cl from "./Form.module.scss"
import { fetchAuth } from '../../store/reducers/UserSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';

interface IFormProps {
    className? : string
}
const Form:FC<IFormProps> = ({className}) => {





    
    const [password , setPassword] = useState<string>("")
    const [username, setUsername] = useState<string>("")

    const error = useAppSelector(state => state.UserSlice.error)
    const isAuth = useAppSelector(state => state.UserSlice.isAuth)
    const token = useAppSelector(state => state.UserSlice.userToken)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    useEffect( () => {
        if (isAuth){
            sessionStorage.setItem('isAuth', "true");
            sessionStorage.setItem("token" , token)
            navigate("/")
        }
    } , [isAuth, navigate, token] )

    const send =  () => {
        dispatch(fetchAuth({password, username}))
    }  
    


    const changePassword:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value)
    }
    const changeLogin:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setUsername(e.target.value)
    }

    return (
    <div className={className ? [cl.form, className].join(" ") : cl.form}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input onChange={changeLogin} value={username} type="text" placeholder="Login" id="username"/>

        <label  htmlFor="password">Password</label>
        <input onChange={changePassword} value={password} type="password" placeholder="Password" id="password"/>
        <button  onClick={send}>Log In</button>
        {error && <p className={cl.mistakeText}>Неверный пароль, попробуйте другой и нажмите снова "Enter"</p>}
    </div>
    );
};

export default memo(Form);