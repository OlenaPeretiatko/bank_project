import '../App.css';
import React, {useEffect, useState} from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import {Link, Navigate} from "react-router-dom";
import WalletsSection from "../Components/Wallets";


function WalletsPage() {
    const [getWallets, setWallets] = useState([])
    const user = localStorage.getItem("user");
    const admin = JSON.parse(localStorage.getItem("user"))['is_admin'];

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            axios.get('http://127.0.0.1:5000/wallets', {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
                .then(response => {
                    setWallets(response.data['wallets']);
                    if (getWallets){
                        console.log("is wallet")
                    }
                    else{
                        console.log("no wallet")
                    }
                    console.log(response.data['wallets'])
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
        <>
            <Header/>
            <main>
                {getWallets.length !== 0 &&
                    <div className="content">
                        {WalletsSection(getWallets)}
                        {admin &&
                            <div className="center">
                                <button>
                                    <Link to='/walletCreate' className="btn btn-outline-info">Add Wallet</Link>
                                </button>
                            </div>
                        }
                    </div>
                }
                {getWallets.length === 0 &&
                    <div className="center">
                        <h4>
                            <span className="glyphicon glyphicon-alert"></span> Sorry,
                            you don't have your card. Please, contact
                            administrator. <span className="glyphicon glyphicon-alert"></span>
                        </h4>
                    </div>
                }
            </main>
            <Footer/>
        </>
    );
}


export default WalletsPage;
