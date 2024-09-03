import React, { FC, useCallback } from 'react';
import Button from '../../shared/Button/Button';
import cl from './DateButtons.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteDate } from '../../store/reducers/DatesSlice';
import { IDate } from '../../models/IDate';

interface IProps {
    date : IDate,
    changeFunction : (date:IDate) => void
}
const Datebuttons:FC<IProps> = ({date, changeFunction}) => {
    const dispatch = useAppDispatch()
    const token = useAppSelector( state => state.UserSlice.userToken )
  
    const deleteFunction = useCallback( () => {
      dispatch(deleteDate({token : token, id : date.id}))
    } , [token, date.id, dispatch] )
    return (
        <div className={cl.dateButtons}>
            <Button onClick={() => {
                changeFunction(date)
            }}>Изменить</Button>
            <Button  onClick={deleteFunction}>Удалить</Button>
      </div>
    );
};

export default Datebuttons;