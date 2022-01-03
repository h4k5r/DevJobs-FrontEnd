import {useEffect} from "react";
import {parseStringToBoolean} from "../Utils/Uitls";
import {useDispatch} from "react-redux";
import {AuthActions, Logout} from "../Store/Auth-Slice";

const UseTokenValidator = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('token');
        const isEmployerString = localStorage.getItem('isEmployer');
        const isEmployer = parseStringToBoolean(isEmployerString ? isEmployerString : "");
        let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/applicant/auth/validateToken`;
        if (isEmployer) {
            url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/employer/auth/validateToken`
        }
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch(AuthActions.setToken(token));
                    if (isEmployer) {
                        dispatch(AuthActions.setIsEmployer(true));
                    }
                } else {
                    dispatch(Logout());
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [dispatch])
}
export default UseTokenValidator;
//