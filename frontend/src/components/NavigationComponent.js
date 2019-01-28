import React, {Component} from 'react';
import history from '../history';

export class Navigation extends Component {

    mealListClick = () => {
        history.push('/meals');
    };
    userListClick = () => {
        history.push('/users');
    };
    logoutClick = () => {
        history.push('/logout');
    };

    render() {
        if (!this.props.token) {
            return null;
        }
        return <ul className="list-inline">
            <li className="list-inline-item">
                <span className="btn btn-light" onClick={this.mealListClick}>MealList</span>
            </li>
            <li className="list-inline-item">
                <span className="btn btn-light" onClick={this.userListClick}>UserList</span>
            </li>
            <li className="list-inline-item">
                <span className="btn btn-light" onClick={this.logoutClick}>Logout</span>
            </li>
        </ul>;
    }
}
