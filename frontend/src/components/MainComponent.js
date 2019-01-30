import React, {Component} from 'react';
import {LoginPageContainer} from "../containers/LoginPageContainer";
import UserList from "./UserListComponent";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {Container, Row} from 'reactstrap';
import {LogoutContainer} from "../containers/LogoutContainer";
import {NavigationContainer} from "../containers/NavigationContainer";
import {MealListContainer} from "../containers/MealListContainer";
import {SettingsContainer} from "../containers/SettingsContainer";

class Main extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row className="justify-content-center">
                        <NavigationContainer/>
                    </Row>
                </Container>
                <div>
                    <Switch>
                        <Route exact path='/login' component={LoginPageContainer}/>
                        <Route exact path='/meals' component={MealListContainer}/>
                        <Route exact path='/users' component={UserList}/>
                        <Route exact path='/logout' component={LogoutContainer}/>
                        <Redirect to="/meals"/>
                    </Switch>
                </div>
                <SettingsContainer/>
            </div>
        );
    }
}

export default withRouter(Main);
