import React from "react";
import classes from "./Input.module.css";
import {CombineClasses} from "../../Utils/Uitls";

const Input: React.FC<{
    type: string,
    placeholder: string,
    label: string,
    classes: string[],
    ref?: React.RefObject<HTMLInputElement>
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}> = (props) => {
    return (
        <div className={classes.input__container}>
            <label>{props.label}</label>
            <input type={props.type} className={CombineClasses(...props.classes, classes.input)}
                   placeholder={props.placeholder} ref={props.ref} onChange={props.onChange} onBlur={props.onBlur}/>
        </div>
    );
};
export default Input;