import React, {Component} from 'react';
import {RegisterModalContainer} from "../containers/RegisterModalContainer";
import {LoginContainer} from "../containers/LoginContainer";
import history from '../history';

export class LoginPage extends Component {
    componentDidMount() {
        if (this.props.token) {
            history.push('/meals');
        }
    }
    render() {
        return <div className="col-5 offset-3">
            <RegisterModalContainer/>
            <LoginContainer/>
        </div>;
    }
}

