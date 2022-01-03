import {NextPage} from "next";
import PostJobForm from "../../components/Forms/PostJob Form/PostJobForm";
import {useSelector} from "react-redux";
import {RootState} from "../../Store";
import {useEffect} from "react";
import {useRouter} from "next/router";
import useHideSearch from "../../Hooks/useHideSearch";

const PostJob:NextPage = () => {
    useHideSearch()
    const isAuthenticated = useSelector((state:RootState) => state.authReducer.isAuthenticated);
    const isEmployer = useSelector<RootState>(state => state.authReducer.isEmployer);
    const router = useRouter();
    useEffect(() => {
        if(!isAuthenticated) {
            router.push('/employer/login');
        }
        if(!isEmployer) {
            router.push('/');
        }
    }, [isAuthenticated, isEmployer, router]);

    return (
        <div>
            <PostJobForm/>
        </div>
    )
}
export default PostJob;