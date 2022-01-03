import React from "react";
import classes from "./Input.module.css";
import {CombineClasses} from "../../Utils/Uitls";

const Input: React.FC<{
    type: string,
    placeholder?: string,
    label: string,
    value?: string,
    classes: string[],
    containerClasses?: string[],
    inputRef?: React.RefObject<HTMLInputElement>
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
}> = (props) => {
    const {
        type,
        placeholder,
        label,
        value,
        containerClasses = [],
        inputRef,
        onChange,
        onBlur,
        onFocus,
        classes: inputClasses
    } = props;
    return (
        <div className={CombineClasses(classes.input__container, ...containerClasses)}>
            <label>{label}</label>
            <input type={type} className={CombineClasses(...inputClasses, classes.input)} value={value}
                   placeholder={placeholder} ref={inputRef} onChange={onChange} onBlur={onBlur} onFocus={onFocus}/>
        </div>
    );
};
export default Input;