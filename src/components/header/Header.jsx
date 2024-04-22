import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); //! when we change the page it tells the loaction or route of the page

    //! when we change the page after scrolling down then the scroll will be passed to that page, so to set that scroll to 0 this useEffect will run when the locaton is changed
    useEffect(() => {
        window.scrollTo(0, 0); //! it will set scroll to 0
    }, [location]);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };
    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const searchQueryHandler = (event) => {
        event.preventDefault();
        if (event.key === "Enter" && query.length > 0) {
            navigate(`search/${query}`);
            setTimeout(() => {
                setShowSearch(false); //! this will close the search bar automatically after 1 second when we moved to the searched movie page
            }, 200);
        }
    };

    const navigationHandler = (type) => {
        if (type === "movies") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
        setMobileMenu(false);
    };

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show} `}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                    <img
                        src={logo}
                        alt="logo"
                        onClick={() => setShowSearch(false)}
                    />
                </div>
                <ul className="menuItems">
                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("movies")}
                    >
                        Movies
                    </li>
                    <li
                        className="menuItem"
                        onClick={() => navigationHandler("tv")}
                    >
                        TV Shows
                    </li>
                    <li className="menuItem">
                        {location.pathname !== "/" && (
                            <HiOutlineSearch onClick={openSearch} />
                        )}
                    </li>
                </ul>
                <div className="mobileMenuItems">
                    {location.pathname !== '/' && <HiOutlineSearch
                        className="cursor-pointer"
                        onClick={openSearch}
                    />}
                    {mobileMenu ? (
                        <VscChromeClose
                            className=" cursor-pointer"
                            onClick={() => setMobileMenu(false)}
                        />
                    ) : (
                        <SlMenu
                            className="cursor-pointer "
                            onClick={openMobileMenu}
                        />
                    )}
                </div>
            </ContentWrapper>

            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        {
                            <div className="searchInput">
                                <input
                                    type="text"
                                    placeholder="Search for a movie or tv show..."
                                    onChange={(event) =>
                                        setQuery(event.target.value)
                                    }
                                    onKeyUp={searchQueryHandler}
                                />
                                <VscChromeClose
                                    className=" cursor-pointer"
                                    onClick={() => setShowSearch(false)}
                                />
                            </div>
                        }
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;

// ! I don't want to show search icon when we are on home page so I had used location to find the route of the path we are on
