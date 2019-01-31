import React, {Component} from 'react';
import history from '../history';
import {fetchCaloriesSetting, fetchUserInfo, openSettingsModal} from "../actions";

export class Navigation extends Component {

    mealListClick = () => {
        history.push('/meals');
    };
    settingsClick = () => {
        this.props.dispatch(fetchCaloriesSetting());
        this.props.dispatch(openSettingsModal());
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
        if (this.props.token && !this.props.userInfo.username) {
            this.props.dispatch(fetchUserInfo());
        }
        if (this.props.userInfo.role > 0) {
            return <ul className="list-inline">
                <li className="list-inline-item">
                    <span className="btn btn-light" onClick={this.settingsClick}>Settings</span>
                </li>
                <li className="list-inline-item">
                    <span className="btn btn-light" onClick={this.mealListClick}>MealList</span>
                </li>
                <li className="list-inline-item">
                    <span className="btn btn-light" onClick={this.userListClick}>UserList</span>
                </li>
                <li className="list-inline-item">
                    <span className="btn btn-light"
                          onClick={this.logoutClick}>Logout({this.props.userInfo.username})</span>
                </li>
            </ul>;
        } else {
            return <ul className="list-inline">
                <li className="list-inline-item">
                    <span className="btn btn-light" onClick={this.settingsClick}>Settings</span>
                </li>
                <li className="list-inline-item">
                    <span className="btn btn-light"
                          onClick={this.logoutClick}>Logout({this.props.userInfo.username})</span>
                </li>
            </ul>;
        }
    }
}
