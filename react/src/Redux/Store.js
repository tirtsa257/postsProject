import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as formReducer } from "redux-form";
import UserReducer from './Reducers/UserReducer'
import PostReducer from './Reducers/PostReducer'
import {getpossts, sighUp, login , deletePost} from './Middlewaes/Crud'
const reducer = combineReducers({UserReducer, PostReducer ,form: formReducer});
const store = createStore(reducer,applyMiddleware(getpossts,sighUp, login, deletePost));

window.store = store;

export default store;