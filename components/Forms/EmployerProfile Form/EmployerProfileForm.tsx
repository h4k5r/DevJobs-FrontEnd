import Input from "../../Input/Input";
import classes from './EmployerProfileForm.module.css'
import MainButton from "../../MainButton/MainButton";
import React, {createRef, useEffect, useRef, useState} from "react";

const EmployerProfileForm: React.FC = () => {
    const [logo, setLogo] = useState<FileList>();
    const [employer,setEmployer] = useState({name:'',address:'',website:''});
    const {name,address,website} = employer;
    const setName = (name:string) => {
        setEmployer(prevState => {
            return {...prevState,name}
        })
    }
    const setAddress = (address:string) => {
        setEmployer(prevState => {
            return {...prevState,address}
        })
    }
    const setWebsite = (website:string) => {
        setEmployer(prevState => {
            return {...prevState,website}
        })
    }

    const nameRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
    const addressRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
    const websiteRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
    const logoRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

    const [error, setError] = useState('');
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
                        setEmployer(prevState => {
                            return {
                                name: res.employer.companyName,
                                address: res.employer.companyAddress,
                                website: res.employer.companyWebsite
                            }
                        })
                        nameRef.current.value = name;
                        addressRef.current.value = address;
                        websiteRef.current.value = website;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })()
    }, [employer]);
    //Name
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const onNameFocus = (_: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
    };
    const onNameBlur = (_: React.ChangeEvent<HTMLInputElement>) => {
        if (name === '') {
            setError('Name is required');
        }
    };
    //Address
    const onAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };
    const onAddressFocus = (_: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
    };
    const onAddressBlur = (_: React.ChangeEvent<HTMLInputElement>) => {
        if (address === '') {
            setError('Address is required');
        }
    };
    //Website
    const onWebSiteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWebsite(event.target.value);
    };
    const onWebSiteFocus = (_: React.ChangeEvent<HTMLInputElement>) => {
            setError('');
    };
    const onWebSiteBlur = (_: React.ChangeEvent<HTMLInputElement>) => {
        if (website === '') {
            setError('Website is required');
        }
    };
    //Logo
    const onLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.files);
        setLogo(event.target.files? event.target.files : undefined);

    };
    const onLogoFocus = (_: React.ChangeEvent<HTMLInputElement>) => {

    };
    const onLogoBlur = (_: React.ChangeEvent<HTMLInputElement>) => {

    };
    //Submit
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name || !address || !website || name.length === 0 || address.length === 0 || website.length === 0) {
            console.log(name, address, website);
            setError('All fields are required');
            return
        } else {
            setError('');
        }

        (async () => {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    companyName:name,
                    companyAddress:address,
                    companyWebsite:website
                })
            });
            const res = await response.json();
            // console.log(res);
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
            <Input type={'text'} label={'Company Name'} classes={[]} onChange={onNameChange}
                   onFocus={onNameFocus} onBlur={onNameBlur} inputRef={nameRef} value={name}/>
            <Input type={'text'} label={'Company Address'} classes={[]} onChange={onAddressChange}
                   onFocus={onAddressFocus} onBlur={onAddressBlur} inputRef={addressRef} value={address}/>
            <Input type={'text'} label={'Company Website'} classes={[]} onChange={onWebSiteChange}
                   onFocus={onWebSiteFocus} onBlur={onWebSiteBlur} inputRef={websiteRef} value={website}/>
            {/*<Input type={'file'} label={'Company Logo'} classes={[]} onChange={onLogoChange}*/}
            {/*       onFocus={onLogoFocus} onBlur={onLogoBlur}/>*/}
            <MainButton text={'Update Profile'} onClickHandler={onSubmit} classes={[classes.form__mainButton]}/>
            {error && <p className={classes.form__error}>{error}</p>}
        </form>
    )
}
export default EmployerProfileForm;