import produce from 'immer';
import createReducer from "./reducerUtils";
const initialState = {
    post: {
        _id: "",
        body: "",
        title: "",
        id:"",
        userId:""
    },
}
const posters = {
    setUserId(state, action) {
        state.post._id = action.payload;
    },
    setPostBody(state, action) {
        state.post.body = action.payload;
    },
    setPostTitle(state, action) {
        state.post.title = action.payload;
    },
}
export default produce((state, action) => createReducer(state, action, posters), initialState);