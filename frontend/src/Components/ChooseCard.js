import React from "react";

function ChooseCards(elements) {
    return (
        elements.map((el) => (
                <div className="cardWrapper" id={'cardWrapper'+el.uid} onClick={() =>{
                    document.getElementById('from_wallet_id').value = el.uid
                    document.getElementById('from_wallet_id').style.backgroundColor = "rgba(248,55,108,0.31)"
                }
                    }>
                    <div key={'smallCard' + el.name} className="smallCard">
                        <p>VISA</p>
                    </div>
                    <div className="textWrapper">
                        <p>{el.name}</p>
                        <p>{el.uid}</p>
                        <p>{el.funds} UAH</p>
                    </div>
                </div>
            )
        )
    );
}

function ChooseCardsSection(wallets) {
    return (
        <div className="cards">
            {ChooseCards(wallets)}
        </div>
    )

}

export default ChooseCardsSection;