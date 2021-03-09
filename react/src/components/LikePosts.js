import React, { useEffect, useState } from 'react'
import {
    Redirect, withRouter
} from "react-router-dom";
import LikePost from './LikePosts'
import { connect } from "react-redux";
import { actionsUser } from "../Redux/Actions/UserActions";
import { actionsposst } from "../Redux/Actions/PostActions";
import './login.css'
import './menu.css'

function mapStateToProps(state) {
    return {
        user: state.UserReducer.user,
        post:state.PostReducer.post
    }
}
const mapDispatchToProps = (dispatch) => (

    {
        deleteUser: (id) => dispatch(actionsUser.deletePost(id)),
        login: () => dispatch(actionsUser.login()),
        setUserId: (id) => dispatch(actionsposst.setUserId(id)),
        setPostTitle: (title) => dispatch(actionsposst.setPostTitle(title)),
        setPostBody: (body) => dispatch(actionsposst.setPostBody(body))
    }

)
const LikePosts = connect(mapStateToProps, mapDispatchToProps)(function LikePosts(props) {
    const [album, setAlboom] = useState([])
    const [likeNow, setlikeNow] = useState(0)
    const { user, deleteUser,setPostBody, setPostTitle, setUserId } = props;

        useEffect(() => {
            fetch(`http://localhost:5000/Images/getImagesByIdUser/${user.id}`, requestOptions)
                .then(response => response.json())
                .then(json => { console.log(json); setAlboom(json) })
                .catch(error => console.log('error', error));
        }, [])
        if (likeNow != 0) {
            return <Redirect to={{ pathname: '/update' }} />
        }

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
       
        return (
            <>

                <table className="container-fluid" class="form-info-section">
                    <tbody>
                        {album.map((pste, key) => (
                            <tr class="row col-8" key={key}>
                                <td >{pste.userId}</td>
                                <td >{pste.title}</td>
                                <td >{pste.body}</td>
                                <td><button className="btn"  onClick={() => deleteUser(pste._id)}>delete</button></td>
                                <td><button className="btn" onClick={() =>{setPostBody(pste.body);setUserId(pste._id);setPostTitle(pste.title);setlikeNow(1);}}> update</button></td>

                            </tr>
                        ))
                        }
                    </tbody>
                </table>

            </>

        )

    }

    )
    export default LikePosts;