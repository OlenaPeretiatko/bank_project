import React, {useState} from 'react'

const DeleteWallet = ({uid}) => {
    const [getResponseStatus, setResponseStatus] = useState({})
    const deleteTodo = () => {
        if (window.confirm(`Delete this wallet?`)) {
            fetch(`http://127.0.0.1:5000/walletDelete/${uid}`, {
                method: 'POST',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                body: JSON.stringify({
                    uid: uid
                })
            }).then(response => {setResponseStatus(response.status)})
                .then(data => {
                    console.log(data)
                })
        }
    }
    if (getResponseStatus === 204){
        window.location.reload(false);
    }
    return (
        <>
            <button onClick={deleteTodo}>Delete</button>
        </>
    )
}
export default DeleteWallet;