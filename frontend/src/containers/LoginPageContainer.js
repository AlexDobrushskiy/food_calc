import {connect} from 'react-redux';

import {LoginPage} from '../components/LoginPageComponent';

const mapStateToProps = state => ({
    token: state.token
});


export const LoginPageContainer = connect(mapStateToProps, null)(LoginPage);
