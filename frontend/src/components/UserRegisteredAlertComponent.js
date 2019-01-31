import React, {Component} from 'react';
import {Alert} from 'reactstrap';
import {hideUserRegisteredAlert} from "../actions";

export class UserRegisteredAlert extends Component {
    render() {
        if (!this.props.visible) {
            return null;
        } else {
            setTimeout(() => {this.props.dispatch(hideUserRegisteredAlert());}, 3000);
        }
        return <Alert className="alert alert-secondary alert-dismissible fade show" role="alert">
            User <strong>username</strong> was succesfully registered.
        </Alert>;

    }
}