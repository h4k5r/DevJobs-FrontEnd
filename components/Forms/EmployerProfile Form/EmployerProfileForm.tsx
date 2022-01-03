import Input from "../../Input/Input";
import classes from './EmployerProfileForm.module.css'
import MainButton from "../../MainButton/MainButton";
import React, {useEffect, useRef, useState} from "react";
import useInput from "../../../Hooks/useInput";

const EmployerProfileForm: React.FC = () => {
    const [logo, setLogo] = useState<FileList>();
    const {
        value: name,
        onChange: onNameChange,
        onBlur: onNameBlur,
        hasError: nameError,
        isValid: isNameValid,
        setValue: setName
    } = useInput((name) => {
        return name.length > 0;
    });
    const {
        value: address,
        onChange: onAddressChange,
        onBlur: onAddressBlur,
        hasError: addressError,
        isValid: isAddressValid,
        setValue: setAddress
    } = useInput((address) => {
        return address.length > 0;
    });

    const {
        value: website,
        onChange: onWebsiteChange,
        onBlur: onWebsiteBlur,
        hasError: websiteError,
        isValid: isWebsiteValid,
        setValue: setWebsite
    } = useInput((website) => {
        return website.length > 0;
    });
    // const [name, setName] = useState<string>();
    const nameRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
    const addressRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
    const websiteRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/employer/profile`;


    useEffect(() => {
        (async () => {
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        setName(res.employer.companyName);
                        setAddress(res.employer.companyAddress);
                        setWebsite(res.employer.companyWebsite);
                        nameRef.current.value = res.employer.companyName;
                        addressRef.current.value = res.employer.companyAddress;
                        websiteRef.current.value = res.employer.companyWebsite;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })()
    }, [url]);

    // //Submit
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!(isNameValid && isAddressValid && isWebsiteValid)) return;

        (async () => {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    companyName: name,
                    companyAddress: address,
                    companyWebsite: website
                })
            });
            const res = await response.json();
            if (res.success) {
                console.log(res);
            } else {
                console.log(res);
            }
        })()
    };

    return (
        <form className={classes.form}>
            <p className={classes.form__title}>Employer Profile</p>
            <Input type={'text'} label={'Company Name'} classes={[]} onChange={onNameChange} onBlur={onNameBlur}
                   inputRef={nameRef}/>
            {nameError && <p className={classes.form__error}>Enter A valid Name</p>}

            <Input type={'text'} label={'Company Address'} classes={[]} onChange={onAddressChange}
                   onBlur={onAddressBlur} inputRef={addressRef}/>
            {addressError && <p className={classes.form__error}>Enter A valid Address</p>}

            <Input type={'text'} label={'Company Website'} classes={[]} onChange={onWebsiteChange}
                   onBlur={onWebsiteBlur} inputRef={websiteRef}/>
            {websiteError && <p className={classes.form__error}>Enter A valid Website</p>}

            {/*<Input type={'file'} label={'Company Logo'} classes={[]} />*/}
            <MainButton text={'Update Profile'} onClickHandler={onSubmit} classes={[classes.form__mainButton]}/>
        </form>
    )
}
export default EmployerProfileForm;