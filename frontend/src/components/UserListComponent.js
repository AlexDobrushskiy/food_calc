import React, {Component} from 'react';
import {
    Container, Row
} from 'reactstrap';
import ReactPaginate from 'react-paginate';
import history from '../history';
import {FilterFormContainer} from "../containers/FilterFormContainer";
import {
    deleteMeal, deleteUser, fetchMeals, fetchUsers, openAddUserModal, openEditUserModal, setMealToEdit,
    setUserToEdit
} from "../actions";
import {AddEditMealContainer} from "../containers/AddEditMealContainer";
import * as settings from '../settings';
import {AddEditUserContainer} from "../containers/AddEditUserContainer";

export class UserList extends Component {

    onDeleteClick = (id, e) => {
        this.props.dispatch(deleteUser(id));
    };

    componentDidMount() {
        if (!this.props.token) {
            history.push('/login/');
        }
    }

    editUserClick = (user, e) => {
        this.props.dispatch(setUserToEdit(user));
        this.props.dispatch(openEditUserModal());
    };

    addUserClick = () => {
        this.props.dispatch(openAddUserModal());
    };

    render() {
        if (!this.props.token) {
            return null;
        }
        if (this.props.users === null) {
            this.props.dispatch(fetchUsers());
        }
        let users = [];
        if (this.props.users !== null) {
            users = this.props.users.map((user, index) => {
                let deleteIcon = <span className="ml-4 btn btn-light" onClick={this.onDeleteClick.bind(this, user.id)}>
                            <i className="fas fa-trash-alt"/>
                        </span>;
                let editIcon = <span className="btn btn-light" onClick={this.editUserClick.bind(this, user)}>
                            <i className="fas fa-edit"/>
                        </span>;

                if (user && user.role === settings.USER_ROLE_ADMIN && this.props.userInfo.role === settings.USER_ROLE_MANAGER) {
                    deleteIcon = null;
                    editIcon = null;
                }

                return <tr key={index}>
                    <td className="col-1">{user.username}</td>
                    <td className="col-1">{settings.ROLES[user.role]}</td>
                    <td className="col-2">
                        {editIcon}
                        {deleteIcon}
                    </td>
                </tr>
            });
        }

        return <Container>
            <form className="form-inline mb-4">
                <button className="btn btn-secondary mr-4 btn-success" type="button"
                        onClick={this.addUserClick}>
                    Add user
                </button>
            </form>
            <table className="table" style={{tableLayout: 'fixed'}}>
                <thead>
                <tr>
                    <th scope="col" className="col-1">Username</th>
                    <th scope="col" className="col-1">Role</th>
                    <th scope="col" className="col-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {users}
                </tbody>
            </table>
            <AddEditUserContainer/>
        </Container>
    }
}
