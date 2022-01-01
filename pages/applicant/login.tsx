import {NextPage} from "next";
import LoginForm from "../../components/Forms/Login Form/LoginForm";
import useHideSearch from "../../Hooks/useHideSearch";

const ApplicantLogin: NextPage = () => {
    useHideSearch();
    return (
        <div>
            <LoginForm userType={'applicant'}/>
        </div>
    )
}
export default ApplicantLogin;