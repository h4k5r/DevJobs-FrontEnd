import type {NextPage} from 'next'
import NavBar from "../components/NavBar/NavBar";
import Jobs from "../components/Jobs/Jobs";

const Home: NextPage = () => {
    return (
        <div>
            <NavBar showSearchBar={true}/>
            <Jobs/>
        </div>
    )
}

export default Home
