import React from "react";

function CardsLoop(elements, user) {
    return (
        elements.map((el) => (
                <div key={'flip-card'+el.name} className="flip-card">
                    <div className="flip-card-inner" >
                        <div className="flip-card-front">
                            <p className="walletName">{el.name}</p>
                            <p className="chip"></p>
                            <p className="cardNum">{el.uid}</p>
                            <p className="cardUser">{user.first_name} {user.last_name}</p>
                            <p className="montserrat">VISA</p>
                        </div>
                        <div className="flip-card-back">
                            <p className="walletMoney">Money: {el.funds} UAH</p>
                        </div>
                    </div>
                 </div>
            )
        )
    );
}

function CardsSection(wallets, users) {
    return (
        <div className="cards">
            {CardsLoop(wallets, users)}
        </div>
    )

}
export default CardsSection;