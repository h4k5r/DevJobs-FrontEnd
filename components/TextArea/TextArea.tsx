import React from "react";
import classes from './TextArea.module.css';
import {CombineClasses} from "../../Utils/Uitls";

const TextArea: React.FC<{
    label: string;
    placeholder: string;
    classes?: string[];
    containerClasses?: string[];
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}> = (props) => {
    const {
        label,
        placeholder,
        classes: classesFromProps = [],
        containerClasses = [],
        onFocus,
        onBlur,
        onChange
    } = props;
    return (
        <div className={CombineClasses(classes.container,...containerClasses)}>
            <label>{label}</label>
            <textarea className={CombineClasses(classes.textArea,...classesFromProps)} placeholder={placeholder} onFocus={onFocus} onBlur={onBlur} onChange={onChange}/>
        </div>
    );
};
export default TextArea;