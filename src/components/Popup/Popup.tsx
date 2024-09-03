import React, { FC, useCallback, useMemo, useState } from 'react';
import { IDate } from '../../models/IDate';
import cl from "./Popup.module.scss";
import PopupIem from '../PopupItem/PopupIem';
import Button from '../../shared/Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { postDates, putDate } from '../../store/reducers/DatesSlice';

export enum ACTIONS {
    ADD = "ADD",
    UPDATE = "UPDATE"
}

export type TypePopupDate = Omit<IDate, "id">
interface IPopup {
    date: TypePopupDate,
    action : ACTIONS,
    closePopup : () => void,
    id : string

}
const Popup:FC<IPopup> = ({date, action, closePopup, id}) => {


    const [newDate, setDate] = useState<TypePopupDate>({...date})
    const [mistake, setMistake] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const userToken = useAppSelector(state => state.UserSlice.userToken)

    const changeHandler = useCallback ( (e:React.ChangeEvent<HTMLInputElement>, k:(keyof TypePopupDate)) => {
        setDate( (value) => ({...value, [k] : e.target.value}) )
    } , [] )  /// Нужно исправить, это конструкция рендерит каждый input к сожалению (((())))

    const title = useMemo( () => {
        if (action === ACTIONS.ADD){
            return "Добавить элемент"
        }
        return "Изменить элемент"
    } , [action] )
    const buttonTitle = useMemo( () => {
        if (action === ACTIONS.ADD){
            return "ДОБАВИТЬ"
        }
        return "ИЗМЕНИТЬ"
    } , [action] )


    const closePopupHandler = useCallback( () => {
        closePopup()
    } , [closePopup] ) 

    const check = useCallback( () => {
        for (let key of Object.keys(newDate)){
            if (!newDate[(key as keyof TypePopupDate)] && key!== "id"){
                setMistake(true)
                return false
            }
        }
        setMistake(false)
        return true
    } , [newDate] )

    const clickHandler = useCallback( () => {
        if (check()){
            if (action === ACTIONS.ADD){
                dispatch(postDates({date : newDate, token : userToken}))
            }
            else{
                dispatch(putDate({date : newDate, id : id, token : userToken} ))
            }
            closePopup()
        }
    } , [dispatch, newDate, userToken, check, closePopup, action, id] )




    return (
        <>
        <div onClick={closePopupHandler} className={cl.blackArea}>

        </div>
        <div className={cl.container}>
            <p className={cl.title}>{title}</p>
            <div className={cl.popup}>
                {Object.keys(newDate).filter(e => e!== "id").map( (k, i) => {
                    
                    return (
                        <PopupIem  key={i} changeHandler={changeHandler} value={newDate[(k as keyof TypePopupDate)]} k={(k as keyof TypePopupDate)} />
                    )
                } )}
            </div>
            {mistake &&
                        <p className={cl.mistakeText}>Вы заполнили не все поля! Заполните все и попробуейте снова</p>
            }

            <Button onClick={clickHandler} className={cl.button}>{buttonTitle}</Button>

        </div>
        </>
    );
};

export default Popup;