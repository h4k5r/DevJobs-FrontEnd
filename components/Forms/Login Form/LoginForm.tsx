import React from "react";
import Input from "../../Input/Input";
import classes from './LoginForm.module.css';
import MainButton from "../../MainButton/MainButton";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {EmailLogin} from "../../../Store/Auth-Slice";
import {ValidateEmail, ValidatePassword} from "../../../Utils/Uitls";

const LoginForm: React.FC<{ userType: 'employer' | 'applicant' }> = (props) => {
    const router = useRouter();
    const dispatch = useDispatch()
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value.trim());
    };
    const onEmailBlur = () => {
        if (!ValidateEmail(email)) {
            setError('Please enter a valid email address');
        } else {
            setError('');
        }
    }
    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value.trim());
    };
    const onPasswordBlur = () => {
        if (!ValidatePassword(password)) {
            setError('Enter a valid password');
        } else {
            setError('');
        }
    }
    const onLoginClick = (e: React.FormEvent) => {
        e.preventDefault();
        if (ValidateEmail(email) && ValidatePassword(password)) {
            dispatch(EmailLogin(
                email,
                password,
                props.userType,
                () => {
                    router.push('/');
                },
                (error) => {
                    setError(error.message);
                }
            ));
        }
    }
    const onSignUpClick = (e: React.FormEvent) => {
        e.preventDefault();
        router.replace(`/${props.userType}/signup`);
    };
    return (
        <form className={classes.form}>
            <p className={classes.form__title}>
                {props.userType === 'employer' ? 'Employer Login' : 'Applicant Login'}
            </p>
            <Input type={'email'} classes={[classes.input]} placeholder={'Enter Email'} label={'Email:'}
                   onChange={onEmailChange} onBlur={onEmailBlur}/>
            <Input type={'password'} classes={[classes.input]} placeholder={'Enter password'} label={'Password'}
                   onChange={onPasswordChange} onBlur={onPasswordBlur}/>
            <MainButton text={'Login'} onClickHandler={onLoginClick} classes={[classes.form__button]}/>
            <MainButton text={'New User? Click Here to create a new account'} onClickHandler={onSignUpClick}
                        classes={[classes.form__button, classes.signUp__button]}/>
            {error && <p className={classes.error}>{error}</p>}
        </form>
    );
};

export default LoginForm;