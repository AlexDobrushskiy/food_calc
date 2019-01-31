import {Component} from 'react';
import history from '../history';
import {setCurrentPage} from "../actions";

export class Logout extends Component {
    componentDidMount() {
        this.props.forgetAPIToken();
        this.props.dispatch(setCurrentPage(1));
        history.push('/login');
    }
    render() {
        return null;
    }
}
