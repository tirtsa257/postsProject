import produce from 'immer';
import createReducer from "./reducerUtils";
const initialState = {
    user: {
        name: "",
        password: "",
        new: "0",
        id:"",
        _id:""
    },
}
const users = {
    setUserPass(state, action) {
        state.user.password = action.payload;
    },
    setUserName(state, action) {
        state.user.name = action.payload;
    },
    setUserMail(state, action) {
        state.user.mail = action.payload;
    },
    setUserId(state, action) {
        state.user.id = action.payload;
    },
    getpossts(state, action) {debugger
        if(action.payload=== 0)
        state.user.new = 1;
        else{
            state.user.new = 2;
            state.user.id = action.payload._id;
        }

    },
    addUser(state, action) {
        debugger
        let listU = [...state.users, state.user]
        state.users = listU;
    },
}
export default produce((state, action) => createReducer(state, action, users), initialState);