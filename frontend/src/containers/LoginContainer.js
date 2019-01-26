import { connect } from 'react-redux';

import { Login } from '../components/LoginComponent';
import { openRegisterForm } from '../actions';

const mapStateToProps = state => ({
  modalOpen: state.isOpen
});

const mapDispatchToProps = dispatch => ({
  openRegisterForm: () => {
    dispatch(openRegisterForm());
  }
});

export const LoginContainer = connect(null, mapDispatchToProps)(Login);
