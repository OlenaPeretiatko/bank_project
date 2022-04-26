import './Home.css';
import React, {useEffect, useState} from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import PropTypes from "prop-types";
import CardsSection from "../Components/Cards";
import {Navigate, useParams} from "react-router-dom";


function EditUserPage() {
    const [getStatus, setStatus] = useState(0)
    const [errorGet, setErrorGet] = useState(null);
    const [errorPut, setErrorPut] = useState(null);
    const [getUser, setUser] = useState({});
    const {username} = useParams();
    const user = localStorage.getItem("user");
    const admin = JSON.parse(localStorage.getItem("user"))['is_admin'];


    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: ""
    });
    useEffect(() => {
        if (user) {
            axios.get(`http://127.0.0.1:5000/editUser/${username}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
                .then(response => {
                    console.log(response.data)
                    setFormData(response.data.user);

                })
                .catch(error => {
                    setErrorGet(error.response.data['message']);
                });
        }

    }, []);


    const handleChange = e => {
        setErrorPut(null);
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = async e => {
        e.preventDefault();

        setErrorPut(null);
        axios.patch(`/editUser/${username}`, formData, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
            .then((response) => {
                if (response.status === 200) {
                    if (username === JSON.parse(user).username) {
                        localStorage.clear();
                        localStorage.setItem('user', JSON.stringify(formData))
                        localStorage.setItem('token', response.data['access_token'])
                        setStatus(200)
                    }
                    console.log(response)
                    window.location.href = '/users';
                }
            })
            .catch(error => {
                console.log(error)
                setErrorPut(error.response.data['message']);
            });
    };

    if (errorGet) {
        return (
            <div className="alert alert-danger">
                {errorGet}
            </div>
        )
    }
    if (getStatus === 200)
        return <Navigate to='/users'/>
    // if (!user) {
    //     return <Navigate to='/login'/>
    // }
    else {
        return (
            <>
                <Header/>
                <main>
                    <div className="center">
                        <h1>EDIT ACCOUNT</h1>
                        <div>
                            <div className="mx-auto p-lg-5 p-4 shadow-lg rounded login-card text-center">
                                <form onSubmit={handleSubmit}>
                                    {errorPut &&
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                value=""
                                                placeholder={errorPut}
                                                onChange={handleChange}
                                                className="form-control red"/>
                                        </div>
                                    }
                                    {!errorPut &&
                                        <div className="form-group">
                                            <label>Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                className="form-control"/>
                                        </div>
                                    }
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="form-control"/>
                                    </div>
                                    <button onClick={handleSubmit}>Edit</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </>
        )
    }

};


EditUserPage.propTypes = {
    username: PropTypes.string,
};
export default EditUserPage;
