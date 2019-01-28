import {connect} from 'react-redux';

import {Logout} from '../components/LogoutComponent';
import {forgetAPIToken} from '../actions';

const mapDispatchToProps = dispatch => ({
    forgetAPIToken: () => {
        dispatch(forgetAPIToken());
    }
});

export const LogoutContainer = connect(null, mapDispatchToProps)(Logout);
