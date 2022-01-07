import {NextPage} from "next";
import {useRouter} from "next/router";
import JobForm from "../../../components/Forms/Job Form/JobForm";

const EmployerJob: NextPage = () => {
    const router = useRouter();
    const {id} = router.query;
    return (
        <div>
            <JobForm mode={'edit'} id={id as string}/>
        </div>
    );
}
export default EmployerJob;