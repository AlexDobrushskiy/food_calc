import React, {Component} from 'react';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux';

import {Router} from 'react-router-dom';
import reducer from './reducers';
import Main from './components/MainComponent';
import history from './history';
import './App.css';

const token = localStorage.getItem('token');
export const emptyMealErrors = {
    calories: [],
    date: [],
    text: [],
    time: [],
    non_field_errors: []
};
export const emptySettingErrors = {
    value: [],
    non_field_errors: []
};
export const emptyUserErrors = {
    username: [],
    password: [],
    role: [],
    non_field_errors: []
};
const initialAjaxInProgress = {
    common: false,
    meal: false,
    user: false,
    setting: false
};


export const initialState = {
    token: '',
    meals: null,
    users: null,
    isOpen: false,
    currentPage: 1,
    userInfo: {username: '', role: 0},
    ajaxInProgress: initialAjaxInProgress,
    mealErrors: emptyMealErrors,
    settingErrors: emptySettingErrors,
    userErrors: emptyUserErrors
};
const defaultState = {...initialState, token};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,
    defaultState,
    composeEnhancers(applyMiddleware(thunkMiddleware)));

store.subscribe(() => {
    localStorage.setItem('token', store.getState().token);
});

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div className="App">
                        <Main/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
