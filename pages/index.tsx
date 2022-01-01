import type {NextPage} from 'next'
import classes from '../styles/Home.module.css'
import Jobs from "../components/Jobs/Jobs";
import useShowSearch from "../Hooks/useShowSearch";

const Home: NextPage = () => {
    useShowSearch();
    return (
        <div className={classes.HomeContainer}>
            <Jobs/>
        </div>
    )
}

export default Home
