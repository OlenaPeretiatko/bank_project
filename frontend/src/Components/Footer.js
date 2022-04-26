import React from "react";
import {Link} from "react-router-dom";

function Footer() {
    const loggedInUser = localStorage.getItem("user");
    let admin = localStorage.getItem("user");
    if (admin){
        admin = JSON.parse(localStorage.getItem("user"))['is_admin'];
    }
    return (
        <footer className="footerWhite">
            <span className="footerText">&copy; 2022 Olena Peretiatko</span>
            {loggedInUser &&
                <nav className="navigation">
                    <Link to="/">Home</Link>
                    {admin &&
                        <Link to="/users">Users</Link>
                    }
                    <Link to="/wallets">Wallets</Link>
                    <Link to="/transactions">Transactions</Link>
                </nav>
            }
        </footer>
    )
}
export default Footer;