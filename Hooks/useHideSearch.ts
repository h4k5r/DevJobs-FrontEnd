import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {UIActions} from "../Store/UI-Slice";

const useHideSearch = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(UIActions.closeSearchBar())
    })
}
export default useHideSearch;