import React, { FC, memo } from 'react';
import cl from "./Button.module.scss"

interface IButton {
    children : React.ReactNode,
    className? : string
    onClick? : () => void
}
const Button:FC<IButton> = ({children, className, onClick = () => {}}) => {
    return (
        <button onClick={onClick} className={className ? [cl.button, className].join(" ") : cl.button}>
            {children}
        </button>
    );
};

export default memo(Button);