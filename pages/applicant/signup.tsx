import {NextPage} from "next";
import SignUpForm from "../../components/Forms/Sign Up form/SignUpForm";
import useHideSearch from "../../Hooks/useHideSearch";

const ApplicantSignup: NextPage = () => {
    useHideSearch();
    return (
        <div>
            <SignUpForm userType={'applicant'}/>
        </div>
    );
};
export default ApplicantSignup;