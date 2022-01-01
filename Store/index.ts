import {configureStore} from "@reduxjs/toolkit";
import UIReducer from "./UI-Slice";
import AuthReducer from "./Auth-Slice";
export const Store = configureStore({
    reducer:{
        uiReducer: UIReducer,
        authReducer: AuthReducer
    }
})
export type RootState = ReturnType<typeof Store.getState>;
export default Store;

