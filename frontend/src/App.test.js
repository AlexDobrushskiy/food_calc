import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {saveAPIToken, setCurrentPage} from "./actions";
import * as actionTypes from "./actionTypes";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('actions', () => {
    it('should save api token', () => {
        const expectedAction = {
            type: actionTypes.SAVE_API_TOKEN,
            token: 'sometokenvaluehere'
        };
        expect(saveAPIToken('sometokenvaluehere')).toEqual(expectedAction);
    });
    it('should set current page number', () => {
        const expectedAction = {
            type: actionTypes.SET_CURRENT_PAGE,
            number: 99
        };
        expect(setCurrentPage(99)).toEqual(expectedAction);
    });
});