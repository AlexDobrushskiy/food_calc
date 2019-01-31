import {connect} from 'react-redux';

import {UserRegisteredAlert} from '../components/UserRegisteredAlertComponent';

const mapStateToProps = state => ({
    visible: state.alertVisible
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export const UserRegisteredAlertContainer = connect(mapStateToProps, mapDispatchToProps)(UserRegisteredAlert);
