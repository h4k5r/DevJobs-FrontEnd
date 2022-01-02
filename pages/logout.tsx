import {NextPage} from "next";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Logout as LogoutAction} from "../Store/Auth-Slice";
import {useRouter} from "next/router";

const Logout:NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        dispatch(LogoutAction());
        router.replace("/");
    },[dispatch])
    return (
        <div>
            <h1>Logout</h1>
        </div>
    )
}

export default Logout;