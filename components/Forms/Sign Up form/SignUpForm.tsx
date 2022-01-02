import React from "react";
import Input from "../../Input/Input";
import classes from './SignUpForm.module.css';
import MainButton from "../../MainButton/MainButton";
import {useRouter} from "next/router";
import {ValidateEmail, ValidatePassword} from "../../../Utils/Uitls";

const SignUpForm: React.FC<{ userType: 'employer' | 'applicant' }> = (props) => {
    const router = useRouter();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
    const onEmailBlur = () => {
        if (!ValidateEmail(email)) {
            setError('Please enter a valid email');
        } else {
            setError('');
        }
    };
    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value.trim());
    };
    const onPasswordBlur = () => {
        if (!ValidatePassword(password)) {
            setError('Password must be at least 8 characters long and contain at least one number and one uppercase letter and one special character');
        } else {
            setError('');
        }
    };
    const onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value.trim());
    };
    const onConfirmPasswordBlur = () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            setError('');
        }
    };
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value.trim());
    };
    const onNameBlur = () => {
        if (name.length < 3) {
            setError('Name must be at least 3 characters long');
        } else {
            setError('');
        }
    };
    const onSignUpClickHandler = async (e:React.FormEvent) => {
        e.preventDefault()
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${props.userType}/auth/signup`;
        console.log(url);
        let data = null;
        if (props.userType === "employer") {
            if (ValidateEmail(email) &&
                ValidatePassword(password) &&
                password === confirmPassword) {
                data = {
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                };
            }
        }
        if (props.userType === "applicant") {
            if (ValidateEmail(email) &&
                ValidatePassword(password) &&
                password === confirmPassword &&
                name.length >= 3) {
                data = {
                    name: name,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                };
            }
        }
        if (!data) {
            return;
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        if (responseData.success) {
            router.push(`/${props.userType}/login`);

        } else {
            setError(responseData.message);
        }

    }

    const onLoginClick = (e: React.FormEvent) => {
        e.preventDefault()
        router.replace(`/${props.userType}/login`)
    }
    return (
        <form className={classes.form}>
            <p className={classes.form__title}>
                {props.userType === "employer" ? "Employer Sign Up" : "Applicant Sign Up"}
            </p>
            {props.userType === 'applicant' &&
            <Input type={'text'} placeholder={'Enter Name'} label={'Name'} classes={[classes.input]}
                   onChange={onNameChange} onBlur={onNameBlur}/>}
            <Input type={'email'} classes={[classes.input]} placeholder={'Enter Email'} label={'Email:'}
                   onChange={onEmailChange} onBlur={onEmailBlur}/>
            <Input type={'password'} classes={[classes.input]} placeholder={'Enter Password'} label={'Password'}
                   onChange={onPasswordChange} onBlur={onPasswordBlur}/>
            <Input type={'password'} classes={[classes.input]} placeholder={'Enter the same Password'}
                   label={'Confirm Password'} onChange={onConfirmPasswordChange} onBlur={onConfirmPasswordBlur}/>
            <MainButton text={'Sign Up'} onClickHandler={onSignUpClickHandler} classes={[classes.form__button]}/>
            <MainButton text={'Have an Account? Click here to Login'} onClickHandler={onLoginClick}
                        classes={[classes.form__button, classes.login__button]}/>
            {error && <p className={classes.error}>{error}</p>}
        </form>
    );
};

export default SignUpForm;