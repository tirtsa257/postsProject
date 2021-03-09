import React, { useState } from 'react'
import { reduxForm, Field } from "redux-form";
import { formValidatorHelper } from "./Redux_form/formValidator";
import { input } from "./Redux_form/inputControl";
import { connect } from "react-redux";
import { actionsUser } from "../Redux/Actions/UserActions";
import { withRouter, Redirect } from "react-router-dom";
import './login.css'
import './menu.css'

function mapStateToProps(state) {
    return {
        user: state.UserReducer.user,
    }
}
const mapDispatchToProps = (dispatch) => (

    {
        setUserName: (name) => dispatch(actionsUser.setUserName(name)),
        setUserPass: (password) => dispatch(actionsUser.setUserPass(password)),
        setUserMail: (mail) => dispatch(actionsUser.setUserPass(mail)),
        newUser: () => dispatch(actionsUser.newUser()),
    }

)
const CreateUser = withRouter(connect(mapStateToProps, mapDispatchToProps)(function NewUser(props) {
    const { user, setUserName,setUserMail, setUserPass, newUser, handleSubmit, reset, pristine, submitting, valid, history } = props

    if (user.new === 1) {
        return <Redirect to={{ pathname: '/sighUp' }} />
    }
    if (user.new == 2) {
        return <Redirect to={{ pathname: '/album' }} />
    }
    return (
        <>
            wertyui
            <from onSubmit={handleSubmit((values) => { })}>
                <div className="container-fluid">
                    <div className="row main-content bg-success text-center">
                        <div className="col-md-4 text-center company__info">
                            <span className="company__logo"><h2><span className="fa fa-android"></span></h2></span>
                        </div>
                        <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
                            <div className="container-fluid">
                                <div className="row">
                                </div>
                                <div className="row">
                                    <div className="row">
                                        <input type="text" name="username" id="username" className="form__input" placeholder="Username" onChange={(e) => setUserName(e.target.value)}></input>
                                    </div>
                                    <div className="row">
                                        <span className="fa fa-lock"></span>
                                        <input type="password" name="password" id="password" className="form__input" placeholder="Password" onChange={(e) => setUserPass(e.target.value)}></input>
                                    </div>
                                    <div className="row">
                                        <span className="fa fa-lock"></span>
                                        <input type="email" name="email" id="email" className="form__input" placeholder="email" onChange={(e) => setUserMail(e.target.value)}></input>
                                    </div>
                                    <br></br>

                                </div>
                                <div className="row col-8">
                                    <input type="submit" value="Submit" className="btn" onClick={() => newUser()}></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </from>
        </>
    )
}))

export default reduxForm({
    form: "CreateUser",
    validate: formValidatorHelper
})
    (CreateUser)
