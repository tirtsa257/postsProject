import React, { useState } from 'react'
import { reduxForm, Field } from "redux-form";
import { formValidatorHelper } from "../components/Redux_form/formValidator";
import { input } from "../components/Redux_form/inputControl";
import { connect } from "react-redux";
import { actionsUser } from "../Redux/Actions/UserActions";
import { withRouter } from 'react-router-dom'
import Login from './Login';

function mapStateToProps(state) {
    return {
        user: state.UserReducer.user,
    }
}
const mapDispatchToProps = (dispatch) => (

    {
        setUserName: (name) => dispatch(actionsUser.setUserName(name)),
        setUserPass: (password) => dispatch(actionsUser.setUserPass(password)),
        signUp: (values) => dispatch(actionsUser.signUp(values))
    }

)
const NewUser = withRouter(connect(mapStateToProps, mapDispatchToProps)(function (props) {
    const { user, signUp, handleSubmit, reset, pristine, submitting, valid, history } = props

    function SignUp() {debbuger
        signUp()
        history.push('/album')
    }
    return (
        <>
            <nav className="nav nl ">
            </nav>
            <div className="container-fluid">
                <div className="row main-content bg-success text-center">
                    <div className="col-md-3 text-center company__info">
                        <span className="company__logo"><h2><span className="fa fa-android"></span></h2></span>
                    </div>
                    <div className="col-md-9 col-xs-12 col-sm-12 login_form ">
                        <div className="container-fluid">
                            <div className="row">
                            </div>
                            <div className="row">
                                <form className="form-group" onSubmit={handleSubmit((values) => SignUp(values))}>
                                    <div className="row">
                                        <Field name="userName" type="text" component={input} id="userName" placeholder="Username" />
                                    </div>
                                    <div className="row">
                                        <span className="fa fa-lock"></span>
                                        <Field name="password" type="password" component={input} id="password" placeholder="Password" />
                                    </div>
                                    <div className="row">
                                        <span className="fa fa-lock"></span>
                                        <Field name="email" type="text" component={input} id="email" placeholder="email" />
                                    </div>

                                    <div className="row">
                                        <button type="submit" className="btn"
                                        >continue </button>
                                    </div>
                                    <button type="button" onClick={reset}>Reset</button>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}))

export default reduxForm({
    form: "NewUser",
    validate: formValidatorHelper
})
    (NewUser)
