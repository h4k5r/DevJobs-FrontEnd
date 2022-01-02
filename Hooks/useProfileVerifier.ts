import {useRouter} from "next/router";
import {parseStringToBoolean} from "../Utils/Uitls";
import {AuthActions, Logout} from "../Store/Auth-Slice";
import {useDispatch} from "react-redux";

const UseProfileVerifier = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/employer/auth/isProfileVerified`
    fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                dispatch(Logout());
                router.replace('/');
            }
        })
        .catch(err => {
            console.log(err);
        })
}
export default UseProfileVerifier;