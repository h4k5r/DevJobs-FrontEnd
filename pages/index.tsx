import type {NextPage} from 'next'
import classes from '../styles/Home.module.css'
import Jobs from "../components/Jobs/Jobs";
import useShowSearch from "../Hooks/useShowSearch";
import useTokenValidator from "../Hooks/useTokenValidator";
import {useSelector} from "react-redux";
import {RootState} from "../Store";
import {useEffect} from "react";
import {useRouter} from "next/router";

const Home: NextPage = () => {
    useShowSearch();
    useTokenValidator();
    const isEmployer = useSelector<RootState>(state => state.authReducer.isEmployer);
    console.log(isEmployer);
    const router = useRouter();
    useEffect(() => {
        if (isEmployer) {
            router.replace('/employer/jobs');
        }
    }, [isEmployer,router]);
    return (
        <div className={classes.HomeContainer}>
            <Jobs/>
        </div>
    )
}

export default Home
