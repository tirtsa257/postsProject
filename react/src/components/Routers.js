import React from 'react'
import Login from './Login'
import LikePosts from './LikePosts'
import {
    Route,
    Switch
} from 'react-router-dom'
import CreateUser from './CreateUser';
import UpdatePoster from './updateposters'
import Posters from './Posters'

export default function Routers(props) {
return(
        <Switch>
            <Route exact path="/">
                <Login />
            </Route>
            <Route path="/sighUp">
                <CreateUser />
            </Route>
            <Route path="/album">
                <Posters />
            </Route>
            <Route path="/likePost">
                <LikePosts />
            </Route>
            <Route path="/update">
                <UpdatePoster />
            </Route>
        </Switch>
)    
}


