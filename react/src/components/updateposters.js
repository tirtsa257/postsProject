import React, { useState } from 'react'
import { reduxForm, Field } from "redux-form";
import { formValidatorHelper } from "./Redux_form/formValidator";
import { input } from "./Redux_form/inputControl";
import { connect } from "react-redux";
import { actionsUser } from "../Redux/Actions/UserActions";
import { actionsposst } from "../Redux/Actions/PostActions";
import './updateposters.css'
import './login.css'
import './menu.css'

function mapStateToProps(state) {debugger
    return {
        posst: state.PostReducer.post,
        user: state.UserReducer.user
    }
}
const mapDispatchToProps = (dispatch) => (

    {
        setId: (id) => dispatch(actionsposst.setId(id)),
        setTitle: (title) => dispatch(actionsposst.setTitle(title)),
        setBody: (body) => dispatch(actionsposst.setUrl(body))
    }
)
const Apdateposst = connect(mapStateToProps, mapDispatchToProps)(function (props) {
    const { user, post, posst, setId, setTitle, setBody, handleSubmit, reset, pristine, submitting, valid } = props

    function updateposst() {
        console.log("rtyuiop"+posst)
        debugger
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(posst),
            redirect: 'follow'
        };

        fetch(`http://localhost:5000/Images/updateImage/${posst._id}`
        , requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(alert("successfully updated"))

            .catch(error => console.log('error', error));

    }
    return (
        <>update your post:{posst.id}
        {console.log(posst)}
            <div class="holder">
                <form class="container-fluid form-info-section" onSubmit={handleSubmit((values) => { updateposst() })}>
              
<div class="out-from-box filter-directives">

                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label>body:</label>
                                </td>
                                <td> {posst.title}
                                    <Field
                                        name="albumId"
                                        type="number"
                                        component={input}
                                        id="bodyId"
                                        placeholder="enter body"
                                        value={posst.body}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>id:</label>
                                </td>
                                <td>
                                    <Field
                                        name="id"
                                        type="number"
                                        component={input}
                                        id="id"
                                        placeholder="enter id"
                                        value={posst.id} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="labell">title:</label>
                                </td>
                                <td>
                                    <Field class="selectric"

                                        name="title"
                                        type="text"
                                        component={input}
                                        id="title"
                                        placeholder="enter your title"
                                        value={posst.title} />
                                </td>
                            </tr>
                           
                            <tr>
                                <td><button className="btn" type="submit"
                                    disabled={!valid || pristine || submitting}
                                >Submit</button></td>
                                <td><button type="button" className="btn" onClick={reset}>Reset</button></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </form>
            </div>
            {user.id}<br></br>
            {user.name}<br></br>
            {user.pass}<br></br>
            {posst.title}
        </>
    )
})


export default reduxForm({
    form: "Apdateposst",
    validate: formValidatorHelper
})
    (Apdateposst)




