import {connect} from 'react-redux';

import {Login} from '../components/LoginComponent';
import {openRegisterForm, saveAPIToken} from '../actions';

const mapStateToProps = state => ({
    token: state.token
});

const mapDispatchToProps = dispatch => ({
    openRegisterForm: () => {
        dispatch(openRegisterForm());
    },
    saveAPIToken: (token) => {
        dispatch(saveAPIToken(token));
    }
});

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
