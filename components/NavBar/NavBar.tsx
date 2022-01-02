import React from "react";
import {useRouter} from "next/router";
import Image from "next/image";
import Link from "next/link";

import classes from "./NavBar.module.css";
import MainButton, {ImageMainButton} from "../MainButton/MainButton";
import search from '../../Images/ant-design_search-outlined.svg'
import filter from '../../Images/dashicons_filter.svg'
import {menuItem} from "../../Interface/Interfaces";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Store";
import {UIActions} from "../../Store/UI-Slice";
import {CombineClasses} from "../../Utils/Uitls";
import useTokenValidator from "../../Hooks/useTokenValidator";


const NavBar: React.FC<{}> = () => {
    const isSideMenuOn = useSelector<RootState>(state => state.uiReducer.isSideMenuOpen);
    const isDarkMode = useSelector<RootState>(state => state.uiReducer.isDarkMode);
    const isAuthenticated = useSelector<RootState>(state => state.authReducer.isAuthenticated);
    const isEmployer = useSelector<RootState>(state => state.authReducer.isEmployer);
    const isSearchBarOn = useSelector<RootState>(state => state.uiReducer.isSearchBarOn);
    const dispatch = useDispatch();
    const router = useRouter();
    const onSwitchClick = () => {
        dispatch(UIActions.toggleDarkMode());
    };
    const onLogoClick = () => {
        router.replace('/');
    };
    const unauthenticatedMenuItems: menuItem[] = [
        {
            title: 'Employer Login',
            url: '/employer/login',
        }
    ];
    const employerMenu: menuItem[] = [
        {
            title: 'Post a Job',
            url: '/employer/postJob',
        },
        {
            title: 'My Jobs',
            url: '/employer/jobs',
        },
        // {
        //     title: 'My Applicants',
        //     url: '/employer/applicants',
        // },
        {
            title: 'My Profile',
            url: '/employer/profile',
        },
        {
            title: 'Logout',
            url: '/logout',
        }
    ];
    const applicantMenu: menuItem[] = [];
    const onBurgerClick = () => {
        dispatch(UIActions.toggleSideMenu());
    };
    const onModalClick = () => {
        dispatch(UIActions.closeSideMenu());
    };

    return (<>
        {isSideMenuOn &&
        <SideMenu menuItems={isAuthenticated ? isEmployer ? employerMenu : applicantMenu : unauthenticatedMenuItems}
                  onModalClick={onModalClick}/>}
        <div
            className={CombineClasses(classes.nav__Container, !isSearchBarOn ? classes.nav__Container__noSearchBr : "")}>
            <div
                className={CombineClasses(classes.nav__background, !isSearchBarOn ? classes.nav__background__noSearchBr : "")}>
            </div>
            <div
                className={CombineClasses(classes.nav__content__container, !isSearchBarOn ? classes.nav__content__container__noSearchBr : "")}>
                <p onClick={onLogoClick}>DevJobs</p>
                <div className={classes.nav__right__container}>
                    <div className={classes.nav__buttons__container}>
                        {
                            (isAuthenticated ? isEmployer ? employerMenu : applicantMenu : unauthenticatedMenuItems).map((item, index) => {
                                return <Link key={index} href={item.url}>
                                    <p className={classes.nav__Button}>{item.title}</p>
                                </Link>
                            })
                        }
                    </div>
                    <div className={classes.nav__switch__container} onClick={onSwitchClick}>
                        <span className={isDarkMode ? classes.nav__switch__container__switchRight : ""}/>
                    </div>
                    <BurgerMenu onClick={onBurgerClick}/>
                </div>
            </div>
            {isSearchBarOn && <SearchBar/>}
        </div>

    </>);
}
export default NavBar;

const SearchBar: React.FC<{}> = () => {
    const onSearchClick = () => {
        console.log("Search Clicked");
    }
    return (<div className={classes.searchBar}>
        <div className={classes.searchBar__textInput__container}>
            <input type={"text"} placeholder={"Filter by title"} className={classes.searchBar__textInput}/>
        </div>
        <input type={"text"} placeholder={"Filter by location"} className={classes.searchBar__location}/>
        <div className={classes.searchBar__checkbox}>
            <input type={"checkbox"}/>
            <label>Full Time</label>
        </div>
        <div className={classes.buttonsContainer}>
            <button className={classes.searchBar__filterButton}>
                <Image src={filter} height={'30'} width={'30'} alt={filter}/>
            </button>
            <MainButton text={'Search'} onClickHandler={onSearchClick} classes={[classes.searchBar__SearchButton]}/>
            <ImageMainButton onClickHandler={onSearchClick} image={search}
                             classes={[classes.searchBar__SearchImageButton]}/>
        </div>
    </div>);
}

const BurgerMenu: React.FC<{ onClick: () => void }> = (props) => {
    return (
        <div className={classes.burgerMenu} onClick={props.onClick}>
            <div className={classes.burgerLine}>

            </div>
            <div className={classes.burgerLine}>

            </div>
            <div className={classes.burgerLine}>

            </div>
        </div>
    );
}

const SideMenu: React.FC<{ menuItems: menuItem[], onModalClick: () => void }> = (props) => {
    return <>
        <div className={classes.sideMenu__container}>
            <div className={classes.sideMenu__modal} onClick={props.onModalClick}>

            </div>
            <div className={classes.sideMenu}>
                <p>Menu</p>
                <ul className={classes.sideMenu__menu__container}>
                    {props.menuItems.map((menuItem, index) => {
                        return <li key={index}>
                            <Link href={menuItem.url}>
                                {menuItem.title}
                            </Link>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    </>
}