import React, {useState} from "react";
import {Navigate} from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const WalletAddPage = () => {
    const [error, setError] = useState(null);
    const [getStatus, setStatus] = useState(0);
    const user = localStorage.getItem("user");

    const [formData, setFormData] = useState({
        name: "",
        funds: "",
        owner_id: ""
    });


    const handleChange = e => {
        setError('');
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = async e => {
        e.preventDefault();

        setError(null);

        axios.post("/walletCreate", formData, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
            .then((response) => {
                if (response.status === 200) {
                    setStatus(200)
                }
            })
            .catch(error => {
                setError(error.response.data['message']);
            });
    };

    if (!user) {
        return <Navigate to='/login'/>
    }
    if (getStatus === 200)
        return <Navigate to='/wallets'/>
    else {
        return (
            <>
                <Header/>
                <main>
                    <div className="center">
                        <h1>CREATE WALLET</h1>

                        {error &&
                            <div className="alert alert-danger">
                            {error}
                        </div>
                        }
                        <div>
                            <div className="mx-auto p-lg-5 p-4 shadow-lg rounded login-card text-center">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-input"
                                            name="name"
                                            placeholder="Enter name"
                                            required
                                            minLength="3"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Funds</label>
                                        <input
                                            type="text"
                                            className="form-control form-input"
                                            name="funds"
                                            placeholder="Enter funds"
                                            required
                                            minLength="3"
                                            value={formData.funds}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Owner Id</label>
                                        <input
                                            type="text"
                                            className="form-control form-input"
                                            name="owner_id"
                                            placeholder="Enter owner id"
                                            required
                                            minLength="3"
                                            value={formData.owner_id}
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


export default WalletAddPage;