import React from "react";
import {Link} from "react-router-dom";
import DeleteWallet from "./DeleteWallet";

function WalletsSection(elements) {
    let admin
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser.username === 'romek_05') {
        console.log('romek_05')
        admin = loggedInUser
    }

    return (
        elements.map((el) => (
            <>
                {/*{admin || loggedInUser.uid === el.owner_id &&*/}
                    <>
                        <div key={'div' + el.uid} className="walletWrapper">
                            <div>
                                <p>Wallets uid: {el.uid}</p>
                                <p>Name: {el.name}</p>
                                <p>Funds: {el.funds}</p>
                                <p>Owner Id: {el.owner_id}</p>
                            </div>
                            <div className="myBtnsRight">
                                {admin &&
                                    <DeleteWallet uid={el.uid}/>
                                }
                            </div>
                        </div>
                        <hr key={'hr' + el.username}/>
                    </>
                {/*}*/}
                </>
            )
        ));
}

export default WalletsSection;