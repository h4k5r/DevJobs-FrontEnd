import {NextPage} from "next";
import LoginForm from "../../components/Forms/Login Form/LoginForm";
import useHideSearch from "../../Hooks/useHideSearch";

const EmployerLogin: NextPage = () => {
    useHideSearch();
    return (
        <div>
            <LoginForm userType={'employer'}/>
        </div>
    )
}
export default EmployerLogin;