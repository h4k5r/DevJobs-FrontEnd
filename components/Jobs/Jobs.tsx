import React from "react";
import Image from "next/image";
import classes from "./Jobs.module.css";
import CompanyImage from "../../Images/ant-design_search-outlined.svg"


const Jobs: React.FC<{}> = () => {
    let Jobs = []
    for (let i: number = 0; i < 10; i++) {
        Jobs.push(<JobCard key={i}/>)
    }
    return (
        <div className={classes.jobs__container}>
            {Jobs}
        </div>
    );
};
export default Jobs;
const JobCard: React.FC<{}> = () => {
    return (
        <div className={classes.jobCard}>
            <div className={classes.jobCard__background}>

            </div>
            <div className={classes.jobCard__image}>
                <Image src={CompanyImage} alt={'company-Image'} width={"100%"} height={"100%%"} layout={"fixed"}/>
            </div>
            <div className={classes.jobCard__info}>
                <p className={classes.jobCard__info__time}>{"Time"}&#9;|&#9;{"Type"}</p>
                <h3 className={classes.jobCard__info__title}>{"Job Title"}</h3>
                <p className={classes.jobCard__info__company}>{"Company"}</p>
                <p className={classes.jobCard__info__location}>{"Location"}</p>
            </div>
        </div>
    );
};
