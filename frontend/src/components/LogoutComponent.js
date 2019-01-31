import {Component} from 'react';
import history from '../history';
import {resetStore, setCurrentPage} from "../actions";

export class Logout extends Component {
    componentDidMount() {
        this.props.forgetAPIToken();
        this.props.dispatch(resetStore());
        history.push('/login');
    }
    render() {
        return null;
    }
}
