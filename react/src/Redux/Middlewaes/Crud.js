import {
    Redirect, withRouter
} from "react-router-dom";
import { $CombinedState } from "redux";
import { actionsUser } from "../Actions/UserActions";

export const getpossts = ({ dispatch, getState }) => next => action => {
    if (action.type === "GET_posstS") {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => console.log(json))

    }
    return next(action);
}


export const deletePost = ({ dispatch, getState }) => next => action => {debugger
    if (action.type === "DELETE_POST") {debugger
        fetch(`http://localhost:5000/Images/deleteImage/${action.payload}`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then(response => {debugger
                if (response.status === 404) {
                    return {}
                }
                else {return response.json() }
            })
            .then((user)=>  { dispatch() } )
            .catch((err) => {
                console.log("err" + err);
            })
    }
    return next(action);
}
export const login = ({ dispatch, getState }) => next => action => {
    if (action.type === "LOGIN") {
        fetch('http://localhost:5000/users/login',
            {
                method: 'POST',
                body: JSON.stringify({
                    "name": getState().UserReducer.user.name,
                    "password": getState().UserReducer.user.password
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then(response => {debugger
                if (response.status === 404 || response.status===500) {
                    return 0;
                }
                else {return response.json() }
            })
            .then((user)=>  { dispatch(actionsUser.getpossts(user)); } )
            .catch((err) => {
                console.log("err" + err);
            })
    }
    return next(action);
}
export const sighUp = ({ dispatch, getState }) => next => action => {
    if (action.type === "NEW_USER") {
        fetch('http://localhost:5000/users/newUser',
            {
                method: 'POST',
                body: JSON.stringify({
                    "nameUser": getState().UserReducer.user.name,
                    "password": getState().UserReducer.user.password
                 } ),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then(response => {

                response.json()
            })
            .then((res) => { dispatch(actionsUser.addUser(res)) })
            .catch((err) => {
                console.log("err" + err);
            })
    }
    return next(action);
}
export const login2 = ({ dispatch, getState }) => next => action => {
    if (action.type === "GET_posstS") {const c =565;}}