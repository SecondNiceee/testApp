import React, { useCallback, useState } from 'react';
import DatesContainer from '../components/DatesContainer/DatesContainer';
import AddDate from '../components/AddDate/AddDate';
import { CSSTransition } from 'react-transition-group';
import { IDate } from '../models/IDate';
import Popup, { ACTIONS } from '../components/Popup/Popup';

interface IOpen {
     isOpen : boolean,
     date : IDate,
     action : ACTIONS
}
const Dates = () => {

    const [open , setOpen] = useState<IOpen>({
        date : {
            id : "",
            companySigDate : "",
            companySignatureName : "",
            documentName : "",
            documentStatus : "",
            documentType : "",
            employeeNumber : "",
            employeeSigDate : "",
            employeeSignatureName : ""
        },
        isOpen : false,
        action : ACTIONS.ADD
    })

    const addFunction = useCallback( () => {
        setOpen((value) => ({...value, isOpen: true, action:ACTIONS.ADD}))
    } , [] )

    const changeFunction = useCallback( (date:IDate) => {
        setOpen({date:date , isOpen : true, action : ACTIONS.UPDATE})
    } , [] )

    const closePopup = useCallback( () => {
        setOpen( (value) => ({...value , isOpen : false}) )
    } , [] )
    
    return (
        <div className='dates'>
            <div className="container">
                <h1 className='title'>Это страница данных</h1>
                <DatesContainer changeFunction = {changeFunction} className='dates-container'/>
                <AddDate onClick={addFunction} className='dates-add' />
            </div>

            <CSSTransition 
            in = {open.isOpen}
            timeout={0}
            unmountOnExit
            mountOnEnter
            >
                <Popup closePopup = {closePopup} action={open.action} date={open.date } id={open.date.id}  />
            </CSSTransition>
        </div>
    );
};

export default Dates;