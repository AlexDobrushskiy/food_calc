import React, {Component} from 'react';
import history from '../history';

// forgetAPIToken
export class Logout extends Component {
    componentDidMount() {
        this.props.forgetAPIToken();
        history.push('/login');
    }
    render() {
        return null;
    }
}
