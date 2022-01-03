import {NextPage} from "next";
import useHideSearch from "../../Hooks/useHideSearch";
import useTokenValidator from "../../Hooks/useTokenValidator";

const Jobs:NextPage = () => {
    useHideSearch()
    useTokenValidator();

    return (
        <div>
            <h1>Jobs</h1>
        </div>
    )
}
export default Jobs;