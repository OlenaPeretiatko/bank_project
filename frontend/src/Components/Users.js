import React from "react";
import {Link} from "react-router-dom";
import DeleteUser from "./DeleteUser";

function UsersSection(elements) {
    let admin
    // const loggedInUser = JSON.parse(localStorage.getItem("user"));
    // if (loggedInUser.username === 'romek_05') {
    //     console.log('romek_05')
    //     admin = loggedInUser
    // }
    return (
        elements.map((el) => (
                <>
                    {/*{admin || loggedInUser.username === el.username &&*/}
                        <>
                            <div key={'div' + el.username} className="userWrapper">
                                <div>
                                    <h3><Link to={el.username}>{el.username}</Link></h3>
                                    <p>First name: {el.first_name}</p>
                                    <p>Last name: {el.last_name}</p>
                                    <p>Email: {el.email}</p>
                                </div>
                                <div className="myBtnsRight">
                                    <button><Link to={`/editUser/${el.username}`} className="btn">Edit</Link></button>
                                    <DeleteUser username={el.username} className="btn"/>
                                </div>
                            </div>
                            <hr key={'hr' + el.username}/>
                        </>
                    {/*}*/}
                </>
            )
        ));
}

export default UsersSection;