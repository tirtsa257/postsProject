import React, { useEffect, useState } from 'react'
import {
    Redirect, withRouter
} from "react-router-dom";
import LikePost from './LikePosts'
import { connect } from "react-redux";
import { actionsUser } from "../Redux/Actions/UserActions";
import './login.css'
import './menu.css'

function mapStateToProps(state) {
    return {
        user: state.UserReducer.user,
    }
}
const mapDispatchToProps = (dispatch) => (

    {
        deleteUser: (id) => dispatch(actionsUser.deleteUser(id)),
        updateUserLike: (id) => dispatch(actionsUser.updateUserLike(id)),
        login: () => dispatch(actionsUser.login()),

    }
)
const Possts = connect(mapStateToProps, mapDispatchToProps)(function Possts(props) {
    const [album, setAlboom] = useState([])
    const [likeNow, setlikeNow] = useState(0)
    const { user, updateUserLike, deleteUser } = props;


    useEffect(() => {
        debugger
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => { console.log(json); setAlboom(json) })
    }, [])

    if (likeNow != 0) {
        return <Redirect to={{ pathname: '/likePost' }} />
    }
    function like(pst) {
        fetch(`http://localhost:5000/Images/createImage/${user.id}`,
            {
                method: 'POST',
                body: JSON.stringify({
                    "pst": pst,
                    
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then(response => {

                response.json()
            })
            .then(json => { })
            .catch((err) => {
                console.log("err" + err);
            })
    }
    return (

        <table className="container-fluid" class="form-info-section">
                            <td><button className="btn" onClick={() => setlikeNow(1)}> myLikePosts</button></td>

        <tbody>
                {album.map((pste, key) => (
                    <tr class="row col-8" key={key}>
                        <td>{pste.userId}</td>
                        <td>{pste.title}</td>
                        <td>{pste.body}</td>
                        <td><button className="btn" onClick={() => like(pste)}>qwertyuiop</button></td>
                    </tr>
                ))
                }

            </tbody>
        </table>
    )
}

)
export default Possts;