import React, {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import "./Login.css";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";


const LoginPage = () => {
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState('False');
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = e => {
        setError(null);
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = async e => {
        e.preventDefault();

        setError(null);
        axios.post("/login", formData)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.clear()
                    setLoggedIn('True')
                    // localStorage.setItem('user', response.data.user['username'])
                    localStorage.setItem('user', JSON.stringify(response.data['user']))
                    localStorage.setItem('token', response.data['access_token'])
                }
            })
            .catch(error => {
                setError(error.response.data['message']);
            });
    };

    let user = localStorage.getItem('user')
    if (loggedIn === 'True')
        return <Navigate to='/'/>
    else {
        return (
            <div id="loginImg">
                <Header/>
                <main>
                    <div id="login">
                        <div className="center">
                            <h1>Login</h1>
                            <div className="error">{error}</div>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <input
                                        id="username"
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        required
                                        minLength="3"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        required
                                        minLength="8"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="center">
                                    <button type="submit" name="btn" className="btn btn-primary">Login</button>
                                    <p>Don't have account? <Link to="/register">Register</Link></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        )
    }

};


export default LoginPage;