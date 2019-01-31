import {connect} from 'react-redux';

import {AddEditUser} from '../components/AddEditUserComponent';

const mapStateToProps = state => ({
    isEditOpen: state.editUserModalOpened,
    isAddOpen: state.addUserModalOpened,
    user: state.userToEdit
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export const AddEditUserContainer = connect(mapStateToProps, mapDispatchToProps)(AddEditUser);
