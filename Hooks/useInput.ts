import {useState} from "react";

const UseInput = (validationFunction:(enteredValue:any) => boolean) => {
    const [value, setValue] = useState("");
    const [hasError, setHasError] = useState(false);
    const onChange = (event:any) => {
        setValue(event.target.value);
        if(validationFunction(event.target.value)) {
            setHasError(false);
        } else {
            setHasError(true);
        }
    };
    const onBlur = () => {
        if(!validationFunction(value)) {
            setHasError(true);
        } else {
            setHasError(false);
        }
    };
    return {
        value,
        hasError,
        isValid: validationFunction(value),
        onChange,
        onBlur,
        setValue
    };

}
export default UseInput;