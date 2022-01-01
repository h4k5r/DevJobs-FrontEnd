import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {UIActions} from "../Store/UI-Slice";

const useShowSearch = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(UIActions.openSearchBar())
    })
}
export default useShowSearch;
