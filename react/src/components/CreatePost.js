import React, { useState, useRef } from 'react'
import { reduxForm, Field } from "redux-form";
import { formValidatorHelper } from "../Redux_form/formValidator";
import { input } from "../Redux_form/inputControl";
import { connect } from "react-redux";
import Dropzone from 'react-dropzone';
import { actionsUser } from "../../Redux/Actions/UserActions";

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
    }
}
const mapDispatchToProps = (dispatch) => (

    {

    }
)
const Newposst = connect(mapStateToProps, mapDispatchToProps)(function (props) {
    const { user, handleSubmit, reset, pristine, submitting, valid } = props
    const [handleFileInput, setHandleFileInput] = useState('');
    const [albumId, setAlbumId] = useState(0);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
   
    function createMyposst() {
        fetch('http://localhost:5000/possts/createMyposst',
            {
                method: 'POST',
                body: JSON.stringify(
                    {
                        "albumId": albumId,
                        "id": id,
                        "title": title,
                        "url": handleFileInput,
                        "thumbnailUrl": thumbnailUrl,
                        "user_id": user.id
                    }
                ),
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
        <>
            <div>
                <form onSubmit={handleSubmit((values) => { })}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label>albumId:</label>
                                </td>
                                <td>
                                    <input
                                        onChange={e => setAlbumId(e.target.value)}
                                        name="albumId"
                                        type="number"
                                        id="albumId"
                                        placeholder="enter albumId"
                                    ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>id:</label>
                                </td>
                                <td>
                                    <input
                                        onChange={e => setId(e.target.value)}
                                        name="id"
                                        type="number"
                                        id="id"
                                        placeholder="enter id" >
                                    </input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>title:</label>
                                </td>
                                <td>
                                    <input
                                        onChange={e => setTitle(e.target.value)}
                                        name="title"
                                        type="text"
                                        id="title"
                                        placeholder="enter your title" >
                                    </input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>url:</label>
                                </td>
                                <td>
                                    <input
                                        onChange={e => setUrl(e.target.value)}
                                        name="url"
                                        type="text"
                                        id="url"
                                        placeholder="enter url" >
                                    </input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>thumbnailUrl:</label>
                                </td>
                                <td>

                                    <input
                                        onChange={e => setThumbnailUrl(e.target.value)}
                                        name="thumbnailUrl"
                                        type="text"
                                        id="thumbnailUrl"
                                        placeholder="enter thumbnailUrl" >
                                    </input>
                                </td>
                            </tr>
                            <tr> <input type="file" name="pic" id="file-input"
                                onChange={(e) => setHandleFileInput(e.target.files[0].name)} placeholder="בחר תמונה"
                            ></input>
                            </tr>
                            <tr>
                                <td><button type="submit" onClick={() => createMyposst()}
                                >Submit</button></td>
                                <td><button type="button" onClick={reset}>Reset</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>

        </>
    )
})

export default reduxForm({
    form: "Newposst",
    validate: formValidatorHelper
})
    (Newposst)




    import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import { actionsposst } from "../../Redux/Actions/psteActions";
function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        posst: state.posstReducer.posst,
    }
}
const mapDispatchToProps = (dispatch) => (
    {
        addposst: (pst) => dispatch(actionsposst.addposst(pst))
    }

)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function possts(props) {
    const { user, posst, addposst, history } = props
    const [album, setAlboom] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/Images/getImagesByIdUser/${user.id}`)
            .then(response => response.json())
            .then(json => { console.log(json); setAlboom(json) })
    }, [])
    function deleteposst(posst1) {
        var myHeaders = new Headers();
        myHeaders.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        debugger
        fetch(`http://localhost:5000/possts/deleteposst/${posst1._id}`, requestOptions)
            .then(response => response.text())
            .then(result => { setAlboom(album.filter(pst => pst._id != posst1._id)); })
            .catch(error => console.log('error', error));
    }

    function updateposst(pst) {
        addposst(pst);
        history.push("/updatepst");
    }
    return (
        <>
            {
                album.length &&
                <table>
                    <tbody>
                        {album.map((pste, key) => (
                            <tr key={key}>
                                <td>{pste.albumId}</td>
                                <td>{pste.title}</td>
                                <td><pst src={pste.url}></pst></td>
                                <td><pst src={pste.thumbnailUrl}></pst></td>
                                <td><button onClick={() => deleteposst(pste)}>מחיקה</button></td>
                                <td><button onClick={() => { updateposst(pste) }}>עדכון</button></td>

                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            }
            <button onClick={() => { }}><Link to="/newposst">upload posst</Link></button>
        </>
    )
}))
