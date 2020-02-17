import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "./core/Home";
import Menu from "./core/menu";
import Signup from "./user/signUp";
import Signin from "./user/signIn";
import Profile from "./user/profile";
import Users from "./user/users";
import EditProfile from "./user/editProfile";
import PrivateRoute from "./auth/privateRoute"

const MainRouter = () => (  
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
            <Route exact path="/users" component={Users} />
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
        </Switch>
    </div>
)

export default MainRouter 