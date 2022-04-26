import './Home.css';
import React, {useEffect, useState} from 'react';
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";
import CardsSection from "../Components/Cards";
import {Navigate} from "react-router-dom";

function HomePage() {
    const [getWallets, setWallets] = useState([])
    const [getUser, setUser] = useState({})
    const user = localStorage.getItem("user");

    useEffect(() => {
        if (user) {
            axios.get('http://127.0.0.1:5000/', {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
                .then(response => {
                    setWallets(response.data['wallets'])
                    setUser(response.data['user'])
                    // console.log(getWallets, "home")
                    // localStorage.setItem('user', JSON.stringify(response.data['user']))
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
        <div className="App">
            <Header id="imgHome"
                    className="textWhite"
                    hValue="Community banking with a personal touch."
                    pValue="We offer industry-leading rates, truly personalized service, incredible convenience
                    and the latest in technology, all to help make your banking better." />

            {getWallets &&
                <main className="container">
                    <div className="row">
                        {CardsSection(getWallets, getUser)}
                    </div>
                </main>
            }

                <Footer/>
        </div>
);
}


export default HomePage;
