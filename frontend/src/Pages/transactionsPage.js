import '../App.css';
import React, {useEffect, useState} from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import {Link, Navigate} from "react-router-dom";
import CardsSection from "../Components/Cards";
import DeleteUser from "../Components/DeleteUser";
import UsersSection from "../Components/Users";
import TransactionsSection from "../Components/Transactions";


function TransactionsPage() {
    const [getTransactions, setTransactions] = useState([])
    const [getWallets, setWallets] = useState([])
    const [error, setError] = useState(null);
    const user = localStorage.getItem("user");

    useEffect(() => {
        if (user) {
            axios.get('http://127.0.0.1:5000/transactions', {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
                .then(response => {
                    setTransactions(response.data['transactions']);
                    setWallets(response.data['wallets']);

                })
                .catch(error => {
                    setError(error.response.data['message']);
                });
        }

    }, []);
    if (!user) {
        return <Navigate to='/login'/>
    }
    return (
        <>
            <Header/>
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
                <main>
                    {error &&
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    }
                    <div className="content">
                        {TransactionsSection(getTransactions)}
                    </div>
                </main>
            }
            <Footer/>
        </>
    );
}


export default TransactionsPage;
