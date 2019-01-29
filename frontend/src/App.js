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
const initState = {
    token,
    meals: null,
    isOpen: false
};

const store = createStore(reducer,
    initState,
    applyMiddleware(thunkMiddleware));

// const store = createStore(reducer,
//     initState,
//     compose(
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//         applyMiddleware(thunkMiddleware)
//     ));
//
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
