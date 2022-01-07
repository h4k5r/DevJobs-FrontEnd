import React, {useEffect, useState} from "react";
import classes from "./Jobs.module.css";
import {useRouter} from "next/router";
import MainButton from "../MainButton/MainButton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Store";
import {JobActions} from "../../Store/Jobs-slice";


const Jobs: React.FC<{}> = () => {
    const jobs = useSelector<RootState>(state => state.jobReducer.jobs) as {
        id: string
        title: string,
        company: string,
        location: string,
        type: string,
        time: string,
    }[];
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs`)
            .then(res => res.json())
            .then(data => {
                dispatch(JobActions.setJobs(data.jobs));
                // setJobs(data.jobs);
            })
            .catch(err => console.log(err))
    }, [])
    const onLoadMoreClickHandler = () => {
        // http://localhost:{{port}}/jobs?start=1&limit=10
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs?start=${jobs.length}&limit=10`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch(JobActions.addJobs(data.jobs));
                }
            })
            .catch(_ => {
            })
    }
    return (<>
            <div className={classes.jobs__container}>
                {jobs.map(value => {
                    return <JobCard key={value.id} title={value.title} id={value.id} company={value.company}
                                    type={value.type} location={value.location} time={value.time}/>
                })}
            </div>
            <MainButton text={"Load More"} onClickHandler={onLoadMoreClickHandler}
                        classes={[classes.loadMore__button]}/>

        </>
    );
};
export default Jobs;
const JobCard: React.FC<{
    id: string
    title: string,
    company: string,
    location: string,
    type: string,
    time: string,
}> = (props) => {
    const router = useRouter();
    const onCardClick = () => {
        router.push(`/job/${props.id}`)
    }
    return (
        <div className={classes.jobCard} onClick={onCardClick}>
            <div className={classes.jobCard__background}>

            </div>
            {/*<div className={classes.jobCard__image}>*/}
            {/*    <Image src={CompanyImage} alt={'company-Image'} width={"100%"} height={"100%%"} layout={"fixed"}/>*/}
            {/*</div>*/}
            <div className={classes.jobCard__info}>
                <p className={classes.jobCard__info__time}>{props.time}&#9;|&#9;{props.type}</p>
                <h3 className={classes.jobCard__info__title}>{props.title}</h3>
                <p className={classes.jobCard__info__company}>{props.company}</p>
                <p className={classes.jobCard__info__location}>{props.location}</p>
            </div>
        </div>
    );
};

export const EmployerJobs: React.FC<{}> = () => {
    const [jobs, setJobs] = useState<{
        id: string
        title: string,
        location: string,
        type: string,
        time: string,
    }[]>([]);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employer/jobs`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.jobs);
                setJobs(data.jobs);
            })
            .catch(err => console.log(err))
    }, [])

    const onLoadMoreClickHandler = () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employer/jobs?start=${jobs.length}&limit=10`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setJobs(data.jobs);
                }
            })
            .catch(_ => {
            })
    }
    return (
        <>
            <div className={classes.jobs__container}>
                {jobs.map(value => {
                    return <EmployerJobCard key={value.id} title={value.title} id={value.id}
                                            type={value.type} location={value.location} time={value.time}/>
                })}
            </div>
            <MainButton text={"Load More"} onClickHandler={onLoadMoreClickHandler}
                        classes={[classes.loadMore__button]}/>
        </>
    )
}
const EmployerJobCard: React.FC<{
    id: string
    title: string,
    location: string,
    type: string,
    time: string,
}> = (props) => {
    const router = useRouter();
    const onCardClick = () => {
        router.push(`/employer/job/${props.id}`)
    }

    return (
        <div className={classes.jobCard} onClick={onCardClick}>
            <div className={classes.jobCard__background}>

            </div>
            {/*<div className={classes.jobCard__image}>*/}
            {/*    <Image src={CompanyImage} alt={'company-Image'} width={"100%"} height={"100%%"} layout={"fixed"}/>*/}
            {/*</div>*/}
            <div className={classes.jobCard__info}>
                <p className={classes.jobCard__info__time}>{props.time}&#9;|&#9;{props.type}</p>
                <h3 className={classes.jobCard__info__title}>{props.title}</h3>
                <p className={classes.jobCard__info__location}>{props.location}</p>
            </div>
        </div>
    )
}
