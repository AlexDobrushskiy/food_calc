import {connect} from 'react-redux';

import {Navigation} from '../components/NavigationComponent';

const mapStateToProps = state => ({
    token: state.token,
    userInfo: state.userInfo
});

const mapDispatchToProps = dispatch => ({
    dispatch
});


export const NavigationContainer = connect(mapStateToProps, mapDispatchToProps)(Navigation);
