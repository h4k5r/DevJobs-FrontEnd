import {NextPage} from "next";
import useHideSearch from "../../Hooks/useHideSearch";
import EmployerProfileForm from "../../components/Forms/EmployerProfile Form/EmployerProfileForm";
import useTokenValidator from "../../Hooks/useTokenValidator";

const Profile:NextPage = () => {
    useHideSearch()
    useTokenValidator()
    return (
        <EmployerProfileForm/>
    )
}
export default Profile;