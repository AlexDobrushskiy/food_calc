import {connect} from 'react-redux';

import {Navigation} from '../components/NavigationComponent';

const mapStateToProps = state => ({
    token: state.token
});


export const NavigationContainer = connect(mapStateToProps, null)(Navigation);
