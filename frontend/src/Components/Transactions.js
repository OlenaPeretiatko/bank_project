import React from "react";
import {Link} from "react-router-dom";
import DeleteUser from "./DeleteUser";

function TransactionsSection(elements) {
    console.log(elements, "k")
    return (
        elements.map((el) => (
                <>
                    <div key={'div'+el.uid} className="wrapper">
                        <div>
                            <p>Transaction Id: {el.uid}</p>
                            <p>Amount: {el.amount}</p>
                            <p>From: {el.from_wallet_id}</p>
                            <p>To: {el.to_wallet_id}</p>
                            <p>Status: {(el.status).toString()}</p>
                        </div>
                    </div>
                    <hr key={'hr'+el.uid}/>
                </>
            )
        ));
}

export default TransactionsSection;