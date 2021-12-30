import React, {useState} from "react";
import classes from "./NavBar.module.css";
import MainButton, {ImageMainButton} from "../MainButton/MainButton";
import Image from "next/image";
import search from '../../Images/ant-design_search-outlined.svg'
import filter from '../../Images/dashicons_filter.svg'
import {useRouter} from "next/router";


const NavBar:React.FC<{showSearchBar:boolean}> = (props) => {
    const [isOn,setIsOn] = useState<boolean>(false);
    const router = useRouter();
    const onSwitchClick = () => {
        setIsOn(prevState => !prevState);
    };
    const onLogoClick = () => {
        router.replace('/');
    };
    return (<>
        <div className={classes.nav__Container}>
            <div className={classes.nav__background}>
            </div>
            <div className={classes.nav__content__container}>
                <p onClick={onLogoClick}>DevJobs</p>
                <div className={classes.nav__switch__container} onClick={onSwitchClick}>
                    <span className={isOn?classes.nav__switch__container__switchRight:""}/>
                </div>
            </div>
            {props.showSearchBar && <SearchBar/>}
        </div>

    </>);
}
export default NavBar;

const SearchBar:React.FC<{}> = () => {
    const onSearchClick = () => {
        console.log("Search Clicked");
    }
    return (<div className={classes.searchBar}>
        <div className={classes.searchBar__textInput__container}>
            <input type={"text"} placeholder={"Filter by title"} className={classes.searchBar__textInput}/>
        </div>
        <input type={"text"} placeholder={"Filter by location"} className={classes.searchBar__location}/>
        <div className={classes.searchBar__checkbox}>
            <input type={"checkbox"} />
            <label>Full Time</label>
        </div>
        <div className={classes.buttonsContainer}>
            <button className={classes.searchBar__filterButton}>
                <Image src={filter} height={'30'} width={'30'} alt={filter}/>
            </button>
            <MainButton text={'Search'} onClickHandler={onSearchClick} classes={[classes.searchBar__SearchButton]}/>
            <ImageMainButton onClickHandler={onSearchClick} image={search} classes={[classes.searchBar__SearchImageButton]}/>
        </div>
    </div>);
}