import {createSlice, Dispatch} from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    token: null,
    isEmployer: false,

};

const AuthSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        removeToken: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        },
        setIsEmployer: (state, action) => {
            state.isEmployer = action.payload;
        },
    },
})

export default AuthSlice.reducer;
export const AuthActions = AuthSlice.actions;
export const EmailLogin = (
    email: string,
    password: string,
    userType: "applicant" | "employer",
    successHandler: () => void,
    failureHandler: (error: any) => void
) => {
    return async (dispatch: Dispatch) => {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/auth/login`
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        const data = await response.json();
        if (response.status === 200 && data.success) {
            dispatch(AuthSlice.actions.setToken(data.token));
            if (userType === "employer") {
                dispatch(AuthSlice.actions.setIsEmployer(true));
            }
            successHandler();
        } else {
            console.log(data);
            failureHandler(data.message);
        }
    }
}

export const Logout = () => {
    return async (dispatch: Dispatch) => {
        dispatch(AuthSlice.actions.removeToken());
        dispatch(AuthSlice.actions.setIsEmployer(false));
    }
}
