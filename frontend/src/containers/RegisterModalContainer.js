import {connect} from 'react-redux';

import {RegisterModal} from '../components/LoginComponent';
import {closeRegisterForm} from '../actions';

const mapStateToProps = state => ({
    isOpen: state.isOpen
});

const mapDispatchToProps = dispatch => ({
    closeRegisterForm: () => {
        dispatch(closeRegisterForm());
    },
    dispatch
});

export const RegisterModalContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
