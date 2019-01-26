import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {BrowserRouter} from 'react-router-dom';
import reducer from './reducers';
import Main from './components/MainComponent';
import './App.css';


const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Main/>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
