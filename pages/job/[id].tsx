import {NextPage} from "next";
import {useRouter} from "next/router";
import Image from "next/image";
import {useEffect, useState} from "react";
import {JobInterface} from "../../Interface/Interfaces";
import logo from "../../Images/dashicons_filter.svg"
import MainButton from "../../components/MainButton/MainButton";
import classes from './job.module.css'
import NavBar from "../../components/NavBar/NavBar";

const ViewJob: NextPage = () => {
    const router = useRouter();
    const {id} = router.query;
    // console.log(id)

    const [job, setJob] = useState<JobInterface>({
        id: "asdasd",
        created_at: "20-10-1998",
        company: "Potato Farm",
        company_logo: logo,
        company_url: "https://www.potatofarm.com",
        title: "Potato Farmer",
        type: "Full Time",
        description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        location: "Potato Farm, London",
        requirements: ["Able to piclk up a potato"],
        url: "https://www.potatofarm.com/apply",
        what_you_will_do: ["You will be a potato farmer"],
        salary: "£10,000",
    })
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${id}`)
            .then(res => res.json())
            .then(data => {
                const {job} = data;
                console.log()
                try {
                    const receivedJob:JobInterface = {
                        id: job.id,
                        created_at: job.created_at,
                        company: job.company,
                        company_logo: job.company_logo?job.company_logo:logo,
                        company_url: job.company_url,
                        title: job.title,
                        type: job.type,
                        description: job.description,
                        location: job.location,
                        requirements: job.requirements,
                        url: job.url,
                        what_you_will_do: job.what_you_will_do,
                        salary: job.salary,
                    };
                    setJob(receivedJob);
                } catch (e) {
                    console.log(e)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [id]);
    return (<>
            <NavBar showSearchBar={false}/>
            <div>
                <div className={classes.company}>
                    <div className={classes.company__logoContainer}>
                        <Image src={job.company_logo} height={150} width={150} layout={"intrinsic"} alt={job.company}/>
                    </div>
                    <div className={classes.company__contentContainer}>
                        <div className={classes.company__contentSubContainer}>
                            <p className={classes.company__contentContainer__title}>{job.company}</p>
                            <p className={classes.company__contentContainer__link}>{job.company_url}</p>
                        </div>
                        <MainButton text={'Company Site'} onClickHandler={() => {
                        }} classes={[classes.company__Button]}/>
                    </div>
                </div>
                <div className={classes.job}>
                    <div className={classes.job__head}>
                        <div className={classes.job__head__content}>
                            <p className={classes.job__head__content__timeAndType}>{job.created_at} &bull; {job.type}</p>
                            <p className={classes.job__head__content__title}>{job.title}</p>
                            <p className={classes.job__head__content__location}>{job.location}</p>
                        </div>
                        <MainButton text={'Apply Now'} onClickHandler={() => {
                        }} classes={[classes.job__head__button]}/>
                    </div>
                    <div className={classes.job__body}>
                        <p>{job.description}</p>
                        <div>
                            <p className={classes.job__body__requirementTitle}>Requirements</p>
                            <ul>
                                {job.requirements.map((requirement, index) => {
                                    return <li key={index}
                                               className={classes.job__body__requirement}>{requirement}.</li>
                                })}
                            </ul>
                        </div>
                        <div>
                            <p className={classes.job__body__whatYouWillDoTitle}>What you will do</p>
                            <ul>
                                {job.what_you_will_do.map((what_you_will_do, index) => {
                                    return <li key={index}>{what_you_will_do}.</li>
                                })}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewJob;