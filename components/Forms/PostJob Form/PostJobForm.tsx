import React, {useRef, useState} from "react";
import classes from './PostJobForm.module.css'
import Input from "../../Input/Input";
import MainButton from "../../MainButton/MainButton";
import TextArea from "../../TextArea/TextArea";
import {ValidateUrl} from "../../../Utils/Uitls";

const PostJobForm: React.FC = () => {
    const [error, setError] = useState<string>('')
    const radioGroupRef = React.createRef<HTMLDivElement>();
    // const radioGroupRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const [title, setTitle] = useState<string>('');
    const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value.trim())
    }
    const onTitleBlur = () => {
        if (title.length === 0) {
            setError('Title is required')
        }
    }
    const onTitleFocus = () => {
        setError('')
    }

    const [description, setDescription] = useState<string>('');
    const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value.trim())
    }
    const onDescriptionBlur = () => {
        if (description.length === 0) {
            setError('Description is required')
        }
    }
    const onDescriptionFocus = () => {
        setError('')
    }

    const [salary, setSalary] = useState<string>('');
    const onSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSalary(event.target.value.trim())
    }
    const onSalaryBlur = () => {
        if (salary.length === 0) {
            setError('Salary is required')
        }
    }
    const onSalaryFocus = () => {
        setError('')
    }

    const [currency, setCurrency] = useState<string>('');
    const onCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value.trim())
    }
    const onCurrencyBlur = () => {
        if (currency.length === 0) {
            setError('Currency is required')
        }
    }
    const onCurrencyFocus = () => {
        setError('')
    }

    const [location, setLocation] = useState<string>('');
    const onLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value.trim())
    }
    const onLocationBlur = () => {
        if (location.length === 0) {
            setError('Location is required')
        }
    }
    const onLocationFocus = () => {
        setError('')
    }
    const [requirements, setRequirements] = useState<string>('');
    const onRequirementsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRequirements(event.target.value.trim())
    }
    const onRequirementsBlur = () => {
        if (requirements.length === 0) {
            setError('Requirements is required')
        }
    }
    const onRequirementsFocus = () => {
        setError('')
    }
    const [roleResponsibilities, setRoleResponsibilities] = useState<string>('');
    const onRoleResponsibilitiesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRoleResponsibilities(event.target.value.trim())
    }
    const onRoleResponsibilitiesBlur = () => {
        if (roleResponsibilities.length === 0) {
            setError('Role and responsibilities is required')
        }
    }
    const onRoleResponsibilitiesFocus = () => {
        setError('')
    }
    const [formUrl, setFormUrl] = useState<string>('');
    const onFormUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormUrl(event.target.value.trim())
    }
    const onFormUrlBlur = () => {
        if (ValidateUrl(formUrl)) {
            setError('Form URL is required')
        }
    }
    const onFormUrlFocus = () => {
        setError('')
    }
    const onSubmitJob = (e: React.FormEvent) => {
        //get selected radio button
        // const radioGroup: HTMLDivElement | undefined = radioGroupRef.current;
        const radioGroup: HTMLDivElement | null = radioGroupRef.current;

        if (!radioGroup) {
            return;
        }
        const radioButton: HTMLInputElement | null = radioGroup.querySelector('input[type="radio"]:checked');
        if (!radioButton) {
            return;
        }


        e.preventDefault();
        if (
            title.length === 0 ||
            description.length === 0 ||
            salary.length === 0 ||
            currency.length === 0 ||
            location.length === 0 ||
            requirements.length === 0 ||
            roleResponsibilities.length === 0 ||
            formUrl.length === 0
        ) {
            setError('All fields are required')
        } else {
            setError('')
        }
        if (!error) {
            //send data to server
        }
    }

    return (
        <form className={classes.form}>
            <p className={classes.form__title}>Post New Job</p>
            <Input type={'text'} placeholder={'Enter Title'} label={'Title'} classes={[]} onChange={onTitleChange}
                   onBlur={onTitleBlur} onFocus={onTitleFocus}/>
            <TextArea label={'Description'} placeholder={'Enter Description'}/>
            <Input type={'text'} placeholder={'Enter Salary'} label={'Salary'} classes={[]} onChange={onSalaryChange}
                   onBlur={onSalaryBlur} onFocus={onSalaryFocus}/>
            <Input type={'text'} placeholder={'Enter Currency'} label={'Currency'} classes={[]}
                   onChange={onCurrencyChange} onBlur={onCurrencyBlur} onFocus={onCurrencyFocus}/>
            <div ref={radioGroupRef} className={classes.radioGroup}>
                <p>Select Job Type</p>
                <label htmlFor={'ft'}>Full Time</label>
                <input type={"radio"} name={'type'} id={'ft'} defaultChecked={true} value={'Full Time'}/>
                <label htmlFor={'pt'}>Part Time</label>
                <input type={"radio"} name={'type'} id={'pt'} value={'Part Time'}/>
            </div>
            <Input type={'text'} placeholder={'Enter Location'} label={'Location'} classes={[]}
                   onChange={onLocationChange} onBlur={onLocationBlur} onFocus={onLocationFocus}/>
            <TextArea placeholder={'Enter Requirements seperated by commas'} label={'Requirements'} classes={[]}
                      onChange={onRequirementsChange} onFocus={onRequirementsFocus} onBlur={onRequirementsBlur}/>
            <TextArea placeholder={'Enter Role Responsibilities seperated by commas'} label={'Role Responsibilities'}
                      classes={[]} onChange={onRoleResponsibilitiesChange} onFocus={onRoleResponsibilitiesFocus}
                      onBlur={onRoleResponsibilitiesBlur}/>
            <Input type={'text'} placeholder={'Enter Form Url'} label={'Form URL'} classes={[]}
                   onChange={onFormUrlChange} onFocus={onFormUrlFocus} onBlur={onFormUrlBlur}/>
            <MainButton text={"Post Job"} onClickHandler={onSubmitJob} classes={[classes.form__mainButton]}
                        disabled={!!error}/>
            {!!error && <p className={classes.form__error}>{error}</p>}
        </form>
    );
};
export default PostJobForm;
//