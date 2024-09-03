import React, { FC, memo, useEffect } from 'react';
import cl from "./DatesContainer.module.scss"
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchDates } from '../../store/reducers/DatesSlice';
import DateItem from '../DateItem/DateItem';
import { IDate } from '../../models/IDate';

interface IDatesContainer{
    className? : string,
    changeFunction : (date:IDate) => void
}
const DatesContainer:FC<IDatesContainer> = ({className, changeFunction}) => {
    const dispatch = useAppDispatch()
    const userToken = useAppSelector(state => state.UserSlice.userToken)

    useEffect( () => {
        dispatch(fetchDates(userToken))
    } , [dispatch, userToken] )

    const dates = useAppSelector( state => state.DatesSlice.dates )
    return (
        <div className={ className ? [cl.container, className].join(" ") : cl.container}>
                {dates.map((e, i) => 
                    <div key={i} className={cl.dateWrap}>
                        <DateItem changeFunction = {changeFunction} date={e} key={i} />
                    </div>
                )}

        </div>
    );
};

export default memo(DatesContainer);