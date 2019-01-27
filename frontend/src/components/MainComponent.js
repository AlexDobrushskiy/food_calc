import React, {Component} from 'react';
import {LoginPageContainer} from "../containers/LoginPageContainer";
import MealList from "./MealListComponent";
import UserList from "./UserListComponent";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {Container, Row} from 'reactstrap';

class Main extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row className="justify-content-center">
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="/login">Login</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/meals">MealList</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="/users">UserList</a>
                            </li>
                        </ul>
                    </Row>
                </Container>
                <div>
                    <Switch>
                        <Route exact path='/login' component={LoginPageContainer}/>
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
