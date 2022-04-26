import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import "./Login.css";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";


const RegisterPage = () => {
    const [error, setError] = useState(null);
    const [getStatus, setStatus] = useState(0);

    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const handleChange = e => {
        setError('');
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);
        axios.post("/register", formData)
            .then((response) => {
                if (response.status === 200) {
                    setStatus(200)
                }
            })
            .catch(error => {
                setError(error.response.data['message']);
            });
    };

    if (getStatus === 200)
        return <Navigate to='/login'/>
    else {
        return(
            <>
                <Header/>
                <main>
                    <div className="center">
                        <h1>CREATE ACCOUNT</h1>
                        <div>
                            <div className="mx-auto p-lg-5 p-4 shadow-lg rounded login-card text-center">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        {error &&
                                        <input
                                            type="text"
                                            className="form-control form-input red"
                                            name="username"
                                            placeholder={error}
                                            required
                                            minLength="3"
                                            value=""
                                            onChange={handleChange}
                                        />
                                        }
                                        {!error &&
                                            <input
                                                type="text"
                                                className="form-control form-input"
                                                name="username"
                                                placeholder="Enter username"
                                                required
                                                minLength="3"
                                                value={formData.username}
                                                onChange={handleChange}
                                            />
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-input"
                                            name="first_name"
                                            placeholder="Enter first name"
                                            required
                                            minLength="3"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-input"
                                            name="last_name"
                                            placeholder="Enter last name"
                                            required
                                            minLength="3"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            className="form-control form-input"
                                            name="email"
                                            placeholder="Enter email"
                                            required
                                            minLength="3"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            className="form-control form-input"
                                            name="password"
                                            placeholder="Enter password"
                                            required
                                            minLength="8"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-outline-info w-100 mb-3">Submit</button>
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


export default RegisterPage;