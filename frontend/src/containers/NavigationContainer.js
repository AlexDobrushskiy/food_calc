import {connect} from 'react-redux';

import {Navigation} from '../components/NavigationComponent';

const mapStateToProps = state => ({
    token: state.token
});

const mapDispatchToProps = dispatch => ({
    dispatch
});


export const NavigationContainer = connect(mapStateToProps, mapDispatchToProps)(Navigation);
