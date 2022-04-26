import React, {useEffect, useState} from "react";
import {
    BrowserRouter,
    Route,
    Routes,
    Link,
    NavLink,
    Router,
    useLocation,
    useNavigate,
    Navigate
} from "react-router-dom";
// import "./Login.css";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Home from "./Home";
import ChooseCardsSection from "../Components/ChooseCard";


const TransactionsAddPage = () => {
    const [error, setError] = useState(null);
    const [getStatus, setStatus] = useState(0);
    const [getWallets, setWallets] = useState([])
    const user = localStorage.getItem("user");

    let [formData, setFormData] = useState({
        from_wallet_id: "",
        to_wallet_id: "",
        amount: ""
    });

    useEffect(() => {
        if (user) {
            axios.get('http://127.0.0.1:5000/transactionsPost', {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
                .then(response => {
                    setWallets(response.data['wallets'])
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }, []);
    const handleChange = e => {
        console.log({...formData})
        setError(null);
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = async e => {
        e.preventDefault();
        console.log(formData)

        setError(null);
        axios.post("/transactionsPost", formData, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
            .then((response) => {
                console.log(response)
                if (response.status === 201) {
                    setStatus(201)
                    console.log(response)

                }
            })
            .catch(error => {
                setError(error.response.data['message']);
            });
    };

    if (!user) {
        return <Navigate to='/login'/>
    }
    if (getStatus === 201)
        return <Navigate to='/transactions'/>
    else {
        return (
            <>
                <Header/>
                <main>
                    {getWallets.length === 0 &&
                        <div className="center">
                            <h4>
                                <span className="glyphicon glyphicon-alert"></span> Sorry,
                                you don't have your card. Please, contact
                                administrator. <span className="glyphicon glyphicon-alert"></span>
                            </h4>
                        </div>
                    }
                    {getWallets.length !== 0 &&
                        <>
                            <div className="center">
                                <h1>CREATE TRANSACTION</h1>
                            <div className="cardsChoose">
                                {ChooseCardsSection(getWallets)}
                            </div>

                                {error &&
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>}
                                <div>
                                    <div className="mx-auto p-lg-5 p-4 shadow-lg rounded login-card text-center">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label>Please, choose your card:</label>
                                                <input
                                                    id="from_wallet_id"
                                                    type="text"
                                                    className="form-control form-input"
                                                    name="from_wallet_id"
                                                    placeholder="Enter card number"
                                                    required
                                                    minLength="3"
                                                    value={formData.from_wallet_id}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Please, enter the receiver`s card number:</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-input"
                                                    name="to_wallet_id"
                                                    placeholder="Enter card number"
                                                    required
                                                    minLength="3"
                                                    value={formData.to_wallet_id}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Please, enter amount of money you want to send:</label>
                                                <input
                                                    type="text"
                                                    className="form-control form-input"
                                                    name="amount"
                                                    placeholder="Enter amount"
                                                    required
                                                    minLength="3"
                                                    value={formData.amount}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-outline-info w-100 mb-3">Submit
                                            </button>
                                        </form>

                                        <Link to='/transactions' className="center">See all transactions</Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </main>
                <Footer/>
            </>
        )
    }

};


export default TransactionsAddPage;