import React, {useEffect, useRef, useState} from "react";
import classes from './JobForm.module.css'
import Input from "../../Input/Input";
import MainButton from "../../MainButton/MainButton";
import TextArea from "../../TextArea/TextArea";
import {ValidateUrl} from "../../../Utils/Uitls";
import useInput from "../../../Hooks/useInput";
import useTokenValidator from "../../../Hooks/useTokenValidator";
import {useRouter} from "next/router";

const JobForm: React.FC<{ mode: 'new' | 'edit', id?: string }> = (props) => {
    const router = useRouter()
    useTokenValidator();
    const {mode, id} = props;
    const titleRef = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>;
    const descriptionRef = useRef<HTMLTextAreaElement>(null) as React.MutableRefObject<HTMLTextAreaElement>;
    const salaryRef = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>;
    const currencyRef = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>;
    const locationRef = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>;
    const requirementsRef = useRef<HTMLTextAreaElement>(null) as React.MutableRefObject<HTMLTextAreaElement>;
    const responsibilitiesRef = useRef<HTMLTextAreaElement>(null) as React.MutableRefObject<HTMLTextAreaElement>;
    const urlRef = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>;
    const radioGroupRef = React.createRef<HTMLDivElement>();


    const {
        value: title,
        isValid: isTitleValid,
        onBlur: onTitleBlur,
        setValue: setTitleValue,
        onChange: onTitleChange,
        hasError: hasTitleError
    } = useInput(enteredValue => {
        return enteredValue.trim().length > 0;
    });

    const {
        value: description,
        isValid: isDescriptionValid,
        onBlur: onDescriptionBlur,
        setValue: setDescriptionValue,
        onChange: onDescriptionChange,
        hasError: hasDescriptionError
    } = useInput(enteredValue => {
        return enteredValue.trim().length > 0;
    });

    const {
        value: salary,
        isValid: isSalaryValid,
        onBlur: onSalaryBlur,
        setValue: setSalaryValue,
        onChange: onSalaryChange,
        hasError: hasSalaryError
    } = useInput(enteredValue => {
        let salary = parseInt(enteredValue);
        return !isNaN(salary) && salary > 0;
    });

    const {
        value: currency,
        isValid: isCurrencyValid,
        onBlur: onCurrencyBlur,
        setValue: setCurrencyValue,
        onChange: onCurrencyChange,
        hasError: hasCurrencyError
    } = useInput(enteredValue => {
        return enteredValue.trim().length < 3;
    });

    const {
        value: location,
        isValid: isLocationValid,
        onBlur: onLocationBlur,
        setValue: setLocationValue,
        onChange: onLocationChange,
        hasError: hasLocationError
    } = useInput(enteredValue => {
        return enteredValue.trim().length > 0;
    });

    const {
        value: requirements,
        isValid: isRequirementsValid,
        onBlur: onRequirementsBlur,
        setValue: setRequirements,
        onChange: onRequirementsChange,
        hasError: hasRequirementsError
    } = useInput(enteredValue => {
        return enteredValue.trim().length > 0;
    });

    const {
        value: roleResponsibilities,
        isValid: isRoleResponsibilitiesValid,
        onBlur: onRoleResponsibilitiesBlur,
        setValue: setRoleResponsibilities,
        onChange: onRoleResponsibilitiesChange,
        hasError: hasRoleResponsibilitiesError
    } = useInput(enteredValue => {
        return enteredValue.trim().length > 0;
    });

    const {
        value: formUrl,
        isValid: isFormUrlValid,
        onBlur: onFormUrlBlur,
        setValue: setFormUrl,
        onChange: onFormUrlChange,
        hasError: hasFormUrlError
    } = useInput(enteredValue => {
        return ValidateUrl(enteredValue);
    });
    useEffect(() => {
        if (mode === 'edit' && id) {
            (
                async () => {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employer/job/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    const data = await response.json();
                    console.log(data.job);
                    if (data.success) {
                        setTitleValue(data.job.title);
                        titleRef.current.value = data.job.title;
                        setDescriptionValue(data.job.description);
                        descriptionRef.current.value = data.job.description;
                        setSalaryValue(data.job.salary);
                        salaryRef.current.value = data.job.salary;
                        setCurrencyValue(data.job.currency);
                        currencyRef.current.value = data.job.currency;
                        setLocationValue(data.job.location);
                        locationRef.current.value = data.job.location;
                        setRequirements(data.job.requirements.join(','));
                        requirementsRef.current.value = data.job.requirements.join(',');
                        setRoleResponsibilities(data.job.responsibilities.join(','));
                        responsibilitiesRef.current.value = data.job.responsibilities.join(',');
                        setFormUrl(data.job.formUrl);
                        urlRef.current.value = data.job.formUrl;
                    }
                }
            )()
        }
    }, [id]);

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
        if (isTitleValid && isDescriptionValid && isSalaryValid && isCurrencyValid && isLocationValid && isRequirementsValid && isRoleResponsibilitiesValid && isFormUrlValid) {
            console.log({
                title,
                description,
                salary,
                currency,
                location,
                requirements,
                roleResponsibilities,
                formUrl,
                radioButton: radioButton.value
            })
            const url = mode === 'edit' ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${id}` : `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs`;
            const method = mode === 'edit' ? 'PUT' : 'POST';
            const body = JSON.stringify({
                job: {
                    title: title,
                    description: description,
                    salary: salary,
                    location: location,
                    currency: currency,
                    requirements: requirements,
                    whatYoullDo: roleResponsibilities,
                    type: radioButton.value,
                    formUrl: formUrl
                }
            });
            (async () => {
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: body
                });
                const data = await response.json();
                if (data.success) {
                    router.replace(`/employer/jobs`);
                }
            })()

        }
    }

    return (
        <form className={classes.form}>
            <p className={classes.form__title}>{mode === "new" ? 'Post New Job' : 'Edit Job'}</p>
            <Input type={'text'} placeholder={'Enter Title'} label={'Title'} classes={[]} onChange={onTitleChange}
                   onBlur={onTitleBlur} inputRef={titleRef}/>
            {hasTitleError && <p className={classes.form__error}>Enter A valid Title</p>}
            <TextArea label={'Description'} placeholder={'Enter Description'} onBlur={onDescriptionBlur}
                      textRef={descriptionRef}
                      onChange={onDescriptionChange}/>
            {hasDescriptionError && <p className={classes.form__error}>Enter A valid Description</p>}
            <Input type={'text'} placeholder={'Enter Salary'} label={'Salary'} classes={[]} onChange={onSalaryChange}
                   inputRef={salaryRef} onBlur={onSalaryBlur}/>
            {hasSalaryError && <p className={classes.form__error}>Enter A valid Salary</p>}
            <Input type={'text'} placeholder={'Enter Currency'} label={'Currency'} classes={[]} inputRef={currencyRef}
                   onChange={onCurrencyChange} onBlur={onCurrencyBlur}/>
            {hasCurrencyError && <p className={classes.form__error}>Enter A valid Currency</p>}
            <div ref={radioGroupRef} className={classes.radioGroup}>
                <p>Select Job Type</p>
                <label htmlFor={'ft'}>Full Time</label>
                <input type={"radio"} name={'type'} id={'ft'} defaultChecked={true} value={'Full Time'}/>
                <label htmlFor={'pt'}>Part Time</label>
                <input type={"radio"} name={'type'} id={'pt'} value={'Part Time'}/>
            </div>
            <Input type={'text'} placeholder={'Enter Location'} label={'Location'} classes={[]} inputRef={locationRef}
                   onChange={onLocationChange} onBlur={onLocationBlur}/>
            {hasLocationError && <p className={classes.form__error}>Enter A valid Location</p>}
            <TextArea placeholder={'Enter Requirements seperated by commas'} label={'Requirements'} classes={[]}
                      textRef={requirementsRef}
                      onChange={onRequirementsChange} onBlur={onRequirementsBlur}/>
            {hasRequirementsError && <p className={classes.form__error}>Enter valid Requirements</p>}
            <TextArea placeholder={'Enter Role Responsibilities seperated by commas'} label={'Role Responsibilities'}
                      textRef={responsibilitiesRef}
                      classes={[]} onChange={onRoleResponsibilitiesChange}
                      onBlur={onRoleResponsibilitiesBlur}/>
            {hasRoleResponsibilitiesError && <p className={classes.form__error}>Enter valid Role Responsibilities</p>}
            <Input type={'text'} placeholder={'Enter Form Url'} label={'Form URL'} classes={[]} inputRef={urlRef}
                   onChange={onFormUrlChange} onBlur={onFormUrlBlur}/>
            {hasFormUrlError && <p className={classes.form__error}>Enter A valid Form URL</p>}
            <MainButton text={"Post Job"} onClickHandler={onSubmitJob} classes={[classes.form__mainButton]}/>
        </form>
    );
};
export default JobForm;
//