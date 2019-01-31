import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import {
    changeEditMeal, changeEditUser, closeAddEditMealModal, closeAddEditUserModal, fetchMeals, saveEditedMeal,
    saveEditedUser,
    setMealToEdit,
    setUserToEdit
} from "../actions";
import * as settings from "../settings";

export class AddEditUser extends Component {
    usernameChange = (e) => {
        this.props.dispatch(changeEditUser('username', e.target.value));
    };

    passwordChange = (e) => {
        this.props.dispatch(changeEditUser('password', e.target.value));
    };

    roleChange = (e) => {
        this.props.dispatch(changeEditUser('role', Number(e.target.value)));
    };

    handleSubmit = () => {
        this.props.dispatch(saveEditedUser());
    };
    onCancel = () => {
        this.props.dispatch(setUserToEdit(null));
        this.props.dispatch(closeAddEditUserModal());
    };

    render() {
        if (!this.props.user) {
            return null;
        }
        const header = this.props.isEditOpen ? 'Edit User' : 'Add User';
        const submitBtnText = this.props.isEditOpen ? 'Edit' : 'Add';
        const roleOptions = Object.keys(settings.ROLES).map((key) => <option
            value={key} key={key}>{settings.ROLES[key]}</option>);
        return <Modal isOpen={this.props.isEditOpen || this.props.isAddOpen}>
            <ModalHeader>{header}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Input type="text" name="username" id="idUsername" placeholder="Username"
                               value={this.props.user.username} onChange={this.usernameChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" min="0" step="1" name="password" id="idPassword" placeholder="Password"
                               value={this.props.user.password} onChange={this.passwordChange}/>
                    </FormGroup>
                    <FormGroup>
                        <select name="role" id="idRole" className="custom-select" value={this.props.user.role}
                        onChange={this.roleChange}>
                            {roleOptions}
                        </select>
                    </FormGroup>
                    <Button color="info" onClick={this.handleSubmit}
                            className="float-right ml-4">{submitBtnText}</Button>
                    <Button color="info" onClick={this.onCancel}
                            className="float-right">Cancel</Button>
                </Form>
            </ModalBody>
        </Modal>;
    }
}
