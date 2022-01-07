import {NextPage} from "next";
import useHideSearch from "../../Hooks/useHideSearch";
import useTokenValidator from "../../Hooks/useTokenValidator";
import {EmployerJobs} from "../../components/Jobs/Jobs";

const Jobs: NextPage = () => {
    useHideSearch()
    useTokenValidator();

    return (
        <div>
            <EmployerJobs/>
        </div>
    )
}
export default Jobs;