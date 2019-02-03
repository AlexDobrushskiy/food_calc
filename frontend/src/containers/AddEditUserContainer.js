import {connect} from 'react-redux';

import {AddEditUser} from '../components/AddEditUserComponent';

const mapStateToProps = state => ({
    isEditOpen: state.editUserModalOpened,
    isAddOpen: state.addUserModalOpened,
    user: state.userToEdit,
    errors: state.userErrors,
    ajaxInProgress: state.ajaxInProgress.user,
    userInfo: state.userInfo
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export const AddEditUserContainer = connect(mapStateToProps, mapDispatchToProps)(AddEditUser);
