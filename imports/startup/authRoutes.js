import React, { Component } from 'react';
import MyDrawer from '../ui/MyDrawer';
import {
    Route,
    Switch,
    Link,
    Redirect,
    withRouter,
    BrowserRouter as Router,
} from 'react-router-dom';

import Test from '../ui/Test';
import Test2 from '../ui/Test2';
import Login from '../ui/Login';
import SignupPage from '../ui/SignupPage';
import Main from '../ui/Main';
import TodoList from '../ui/TodoList';
import EditTask from '../ui/EditTask';
import Profile from '../ui/Profile';

const AuthStatus = withRouter(({ history }) => (
    Meteor.userId() !== null ? (
        <p>
            <MyDrawer  />
        </p>
    ) : (
        <Redirect to={"/login"}>Faça o login</Redirect>
    )
));

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        <Component {...props} />
    )} />
);

export const renderRoutes = () => (
    <Router>
        <div>
            <AuthStatus />
            <Switch>
                <PrivateRoute path="/todolist/:taskId" exact={true} component={EditTask}/>
                <PrivateRoute path="/todolist" exact={true} component={TodoList}/>
                <PrivateRoute path="/" exact={true} component={TodoList}/>
                <PrivateRoute path="/profile" exact={true} component={Profile}/>

                <Route path="/test2" exact={true} component={Test2}/>
                <Route path="/main" exact={true} component={Main}/>
                <Route path="/login" exact={true} component={Login}/>
                <Route path="/signup" exact={true} component={SignupPage}/>
                <PrivateRoute path="/" exact={true} component={Test} />

            </Switch>
        </div>
    </Router>

);
