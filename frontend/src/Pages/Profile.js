import '../App.css';
import React, {useEffect, useState} from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import {Link, Navigate} from "react-router-dom";
import CardsSection from "../Components/Cards";
import DeleteUser from "../Components/DeleteUser";


const logout = e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = '/login';
};

function ProfilePage() {
    const [getWallets, setWallets] = useState([])
    const [getUser, setUser] = useState({})
    const user = localStorage.getItem("user");

    useEffect(() => {
        if (user) {
            axios.get('http://127.0.0.1:5000/profile', {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
                .then(response => {
                    setWallets(response.data['wallets'])
                    setUser(response.data['user']);
                    console.log(response.data['user'], response.data['wallets'])

                })
                .catch(error => {
                    console.log(error);
                });
        }

    }, []);
    if (!user) {
        return <Navigate to='/login'/>
    }
    return (
        <div id="imgProfile">
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="profile">
                            <h2>Profile Information</h2>
                            <p>Username: {getUser.username}</p>
                            <p>First Name: {getUser.first_name}</p>
                            <p>Last Name: {getUser.last_name}</p>
                            <p>Email: {getUser.email}</p>
                            <button>
                                <span className="glyphicon glyphicon-edit"></span>
                                <Link to={`/editUser/${getUser.username}`}> Edit Account</Link>
                            </button>


                            <button onClick={logout}>
                                <span className="glyphicon glyphicon-log-out"></span> Logout</button>
                        </div>
                    </div>
                    <div className="wallets col-lg-6 col-md-6 col-sm-12">
                        {CardsSection(getWallets, getUser)}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}


export default ProfilePage;
