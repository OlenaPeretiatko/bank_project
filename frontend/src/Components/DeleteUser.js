import React, {useState} from 'react'

const DeleteUser = ({username}) => {
    const [getResponseStatus, setResponseStatus] = useState({})
    const deleteTodo = () => {
        if (window.confirm(`Delete user ${username}?`)) {
            fetch(`http://127.0.0.1:5000/deleteUser/${username}`, {
                method: 'POST',
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                body: JSON.stringify({
                    username: username
                })
            }).then(response => {
                setResponseStatus(response.status)
            })
                .then(data => {
                    console.log(data)
                })
        }
    }
    if (getResponseStatus === 204) {
        if (username === JSON.parse(localStorage.getItem("user")).username) {
            window.location.href = '/login';
        } else {
            window.location.reload(false);
        }
    }
    return (
        <>
            <button onClick={deleteTodo}>Delete</button>
        </>
    )
}
export default DeleteUser;