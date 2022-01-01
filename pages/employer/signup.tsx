import {NextPage} from "next";
import SignUpForm from "../../components/Forms/Sign Up form/SignUpForm";
import useHideSearch from "../../Hooks/useHideSearch";

const EmployerSignUp: NextPage = () => {
    useHideSearch();
    return (
        <div>
            <SignUpForm userType={'employer'}/>
        </div>
    )
}
export default EmployerSignUp;