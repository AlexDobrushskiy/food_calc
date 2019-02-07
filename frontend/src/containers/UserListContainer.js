import {connect} from 'react-redux';

import {UserList} from '../components/UserListComponent';
import {Dummy} from "../components/DummyComponent";


const mapStateToProps = state => ({
    users: state.users,
    token: state.token,
    userInfo: state.userInfo
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export const UserListContainer = connect(mapStateToProps, mapDispatchToProps)(UserList);
