// import "./App.css";
import {useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";


import Login from "./Pages/Login";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import ProfilePage from "./Pages/Profile";
import RegisterPage from "./Pages/Register";
import EditUserPage from "./Pages/EditUser";
import UsersPage from "./Pages/Users";
import Wallets from "./Components/Wallets";
import WalletsPage from "./Pages/WalletsPage";
import WalletAddPage from "./Pages/WalletAddPage";
// import TransactionsPage from "./Pages/Transactions";
import TransactionsAddPage from "./Pages/Transactions";
import TransactionsPage from "./Pages/transactionsPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path ='/' element={<Home />} />
                <Route exact path='/login' element={<LoginPage/>} />
                <Route exact path='/profile' element={<ProfilePage/>} />
                <Route exact path='/register' element={<RegisterPage/>} />
                <Route exact path='/editUser/:username' element={<EditUserPage/>} />
                <Route exact path='/users' element={<UsersPage/>} />
                <Route exact path='/users/:username' element={<UsersPage/>} />
                <Route exact path='/wallets/' element={<WalletsPage/>} />
                <Route exact path='/walletCreate' element={<WalletAddPage/>} />
                <Route exact path='/transactions' element={<TransactionsPage/>} />
                <Route exact path='/transactionsPost' element={<TransactionsAddPage/>} />
            </Routes>
        </Router>
    );
}

export default App;