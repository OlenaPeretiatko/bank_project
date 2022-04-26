import '../App.css';
import React, {useEffect, useState} from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import {Link, Navigate} from "react-router-dom";
import CardsSection from "../Components/Cards";
import DeleteUser from "../Components/DeleteUser";
import UsersSection from "../Components/Users";


function UsersPage() {
    const [getUsers, setUsers] = useState([])
    const user = localStorage.getItem("user");
    // let admin = localStorage.getItem("user");
    // if (admin){
    //     admin = JSON.parse(localStorage.getItem("user"))['is_admin'];
    // }
    useEffect(() => {
            axios.get('http://127.0.0.1:5000/users', {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
                .then(response => {
                    console.log(response)
                    setUsers(response.data['users']);
                })
                .catch(error => {
                    console.log(error);
                });

    }, []);
    if (!user) {
        return <Navigate to='/login'/>
    }
    return (
        <>
            <Header/>
            <main>
                <div className="content">
                    {UsersSection(getUsers)}
                </div>
            </main>
            <Footer/>
        </>
    );
}


export default UsersPage;
