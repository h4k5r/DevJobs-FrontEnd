import {configureStore} from "@reduxjs/toolkit";
import UIReducer from "./UI-Slice";
import AuthReducer from "./Auth-Slice";
import JobReducer from './Jobs-slice';
export const Store = configureStore({
    reducer:{
        uiReducer: UIReducer,
        authReducer: AuthReducer,
        jobReducer: JobReducer
    }
})
export type RootState = ReturnType<typeof Store.getState>;
export default Store;

