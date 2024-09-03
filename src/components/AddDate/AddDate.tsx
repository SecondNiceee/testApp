import React, { FC } from 'react';
import cl from "./AddDate.module.scss"

interface IAddDate {
    onClick : () => void,
    className? : string
}
const AddDate:FC<IAddDate> = ({className, onClick}) => {
    return (
        <div onClick={onClick} className={className ? [cl.container, className].join(" ") : cl.container}>
            <p>+</p>
        </div>
    );
};

export default AddDate;