import React, {Component} from 'react';
import Login from "./LoginComponent";
import MealList from "./MealListComponent";
import UserList from "./UserListComponent";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'

class Main extends Component {
    render() {
        return (
            <div>
                <li>
                    <ul>
                        <a href="/login">Login</a>
                    </ul>
                    <ul>
                        <a href="/meals">MealList</a>
                    </ul>
                    <ul>
                        <a href="/users">UserList</a>
                    </ul>
                </li>
                <div>
                    <Switch>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/meals' component={MealList}/>
                        <Route exact path='/users' component={UserList}/>
                        <Redirect to="/meals"/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(Main);
