import React from "react";
import Footer from "./Footer";
import {BrowserRouter, Router, Routes, Route, Link, NavLink} from "react-router-dom";
import HomePage from "../Pages/Home";
import Login from "../Pages/Login";

function Header(props) {
    const loggedInUser = localStorage.getItem("user");
    // console.log(localStorage.getItem("user"))
    // let admin = localStorage.getItem("user");
    // if (admin){
    //     admin = JSON.parse(localStorage.getItem("user"))['is_admin'];
    // }
    return (
        <header id={props.id}>
            <nav className="navbar navbar-light">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        {loggedInUser &&
                            <ul className="nav navbar-nav">
                                <NavLink
                                    className="li"
                                    to="/"
                                    style={({isActive}) => ({
                                        color: isActive ? '#f34b70' : '',
                                    })}
                                >
                                    Home
                                </NavLink>
                                    <NavLink
                                        className="li"
                                        to="/users"
                                        style={({isActive}) => ({
                                            color: isActive ? '#f34b70' : '',
                                        })}
                                    >
                                        Users
                                    </NavLink>
                                <NavLink
                                    className="li"
                                    to="/wallets"
                                    style={({isActive}) => ({
                                        color: isActive ? '#f34b70' : '',
                                    })}
                                >
                                    Wallets
                                </NavLink>
                                <NavLink
                                    className="li"
                                    to="/transactionsPost"
                                    style={({isActive}) => ({
                                        color: isActive ? '#f34b70' : '',
                                    })}
                                >
                                    Transactions
                                </NavLink>

                            </ul>
                        }

                        <ul className="nav navbar-nav navbar-right">
                            {loggedInUser &&
                                <NavLink
                                    className="li"
                                    to="/profile"
                                    style={({isActive}) => ({
                                        color: isActive ? '#f34b70' : '',
                                    })}
                                >
                                    <span className="glyphicon glyphicon-user"></span> Profile
                                </NavLink>
                            }

                            {!loggedInUser &&
                                <>
                                    <NavLink
                                        className="li"
                                        to="/register"
                                        style={({isActive}) => ({
                                            color: isActive ? '#f34b70' : '',
                                        })}
                                    >
                                        <span className="glyphicon glyphicon-user"></span> Sign Up
                                    </NavLink>
                                    <NavLink
                                        className="li"
                                        to="/login"
                                        style={({isActive}) => ({
                                            color: isActive ? '#f34b70' : '',
                                        })}
                                    >
                                        <span className="glyphicon glyphicon-log-in"></span> Login
                                    </NavLink>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            <div className={props.className}>
                <h1>{props.hValue}</h1>
                <p>{props.pValue}</p>
            </div>

            {/*<div className="nav">*/}
            {/*    <NavLink*/}
            {/*        to="/"*/}
            {/*        style={({isActive}) => ({*/}
            {/*            color: isActive ? '#f34b70' : '#545e6f',*/}
            {/*        })}*/}
            {/*    >*/}
            {/*        Home*/}
            {/*    </NavLink>*/}
            {/*    <NavLink*/}
            {/*        to="/users"*/}
            {/*        style={({isActive}) => ({*/}
            {/*            color: isActive ? '#f34b70' : '#545e6f',*/}
            {/*        })}*/}
            {/*    >*/}
            {/*        Users*/}
            {/*    </NavLink>*/}
            {/*    <NavLink*/}
            {/*        to="/wallets"*/}
            {/*        style={({isActive}) => ({*/}
            {/*            color: isActive ? '#f34b70' : '#545e6f',*/}
            {/*        })}*/}
            {/*    >*/}
            {/*        Wallets*/}
            {/*    </NavLink>*/}
            {/*    {loggedInUser &&*/}
            {/*        <NavLink*/}
            {/*            to="/profile"*/}
            {/*            style={({isActive}) => ({*/}
            {/*                color: isActive ? '#f34b70' : '#545e6f',*/}
            {/*            })}*/}
            {/*        >*/}
            {/*            Profile*/}
            {/*        </NavLink>*/}
            {/*    }*/}
            {/*    <NavLink*/}
            {/*        to="/register"*/}
            {/*        style={({isActive}) => ({*/}
            {/*            color: isActive ? '#f34b70' : '#545e6f',*/}
            {/*        })}*/}
            {/*    >*/}
            {/*        Register*/}
            {/*    </NavLink>*/}
            {/*    <NavLink*/}
            {/*        to="/transactions"*/}
            {/*        style={({isActive}) => ({*/}
            {/*            color: isActive ? '#f34b70' : '#545e6f',*/}
            {/*        })}*/}
            {/*    >*/}
            {/*        Transactions*/}
            {/*    </NavLink>*/}
            {/*    <NavLink*/}
            {/*        to="/login"*/}
            {/*        style={({isActive}) => ({*/}
            {/*            color: isActive ? '#f34b70' : '#545e6f',*/}
            {/*        })}*/}
            {/*    >*/}
            {/*        Login*/}
            {/*    </NavLink>*/}
            {/*</div>*/}
            {/*<div className={props.className}>*/}
            {/*    <h1>{props.hValue}</h1>*/}
            {/*    <p>{props.pValue}</p>*/}
            {/*</div>*/}

        </header>
    )
}

export default Header;