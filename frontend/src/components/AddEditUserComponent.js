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
    setMealToEdit, setUserErrors,
    setUserToEdit
} from "../actions";
import * as settings from "../settings";
import {getRenderedErrors} from "../utils";
import {emptyUserErrors} from "../App";

export class AddEditUser extends Component {
    usernameChange = (e) => {
        this.props.dispatch(changeEditUser('username', e.target.value));
        this.props.dispatch(setUserErrors(emptyUserErrors));
    };

    passwordChange = (e) => {
        this.props.dispatch(changeEditUser('password', e.target.value));
        this.props.dispatch(setUserErrors(emptyUserErrors));
    };

    roleChange = (e) => {
        this.props.dispatch(changeEditUser('role', Number(e.target.value)));
        this.props.dispatch(setUserErrors(emptyUserErrors));
    };

    handleSubmit = () => {
        this.props.dispatch(saveEditedUser());
    };
    onCancel = () => {
        this.props.dispatch(setUserToEdit(null));
        this.props.dispatch(closeAddEditUserModal());
        this.props.dispatch(setUserErrors(emptyUserErrors));
    };

    render() {
        if (!this.props.user) {
            return null;
        }
        let nonFieldErrors = getRenderedErrors(this.props.errors.non_field_errors);
        let usernameErrors = getRenderedErrors(this.props.errors.username);
        let passwordErrors = getRenderedErrors(this.props.errors.password);
        let roleErrors = getRenderedErrors(this.props.errors.role);


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
                               value={this.props.user.username} onChange={this.usernameChange} autoComplete="new-password"/>
                        {usernameErrors}
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" min="0" step="1" name="password" id="idPassword" placeholder="Password"
                               value={this.props.user.password} onChange={this.passwordChange}  autoComplete="new-password"/>
                        {passwordErrors}
                    </FormGroup>
                    <FormGroup>
                        <select name="role" id="idRole" className="custom-select" value={this.props.user.role}
                        onChange={this.roleChange}>
                            {roleOptions}
                        </select>
                        {roleErrors}
                    </FormGroup>
                    {nonFieldErrors}
                    <Button color="info" onClick={this.handleSubmit}
                            className="float-right ml-4" disabled={this.props.ajaxInProgress}>{submitBtnText}</Button>
                    <Button color="info" onClick={this.onCancel}
                            className="float-right">Cancel</Button>
                </Form>
            </ModalBody>
        </Modal>;
    }
}
