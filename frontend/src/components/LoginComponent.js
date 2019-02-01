import React, {Component} from 'react';
import {Row} from 'reactstrap';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Input,
    Container,
    Label
} from 'reactstrap';
import history from '../history';
import axios from 'axios';
import * as settings from '../settings';
import {hideUserRegisteredAlert, showUserRegisteredAlert, startAjax, stopAjax} from "../actions";
import {Spinner} from "./SpinnerComponent";


export class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.emptyErrors = {
            non_field_errors: [],
            username: [],
            password1: [],
            password2: []
        };
        this.state = {
            username: '',
            password1: '',
            password2: '',
            errors: this.emptyErrors
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };
    handleSubmit = () => {
        const {errors, ...data} = this.state;
        axios.post(settings.REGISTER_USER_URL, data).then((r) => {
            // dispatch registerSuccess
            // close window
            this.props.closeRegisterForm();
            this.props.dispatch(showUserRegisteredAlert());
        }, (err) => {
            const errors = JSON.parse(err.request.response);
            this.setState({errors});
        });
    };
    onCancel = () => {
        this.props.closeRegisterForm();
        this.setState({username: '', password1: '', password2: '', errors: this.emptyErrors})
    };

    render() {
        let nonFieldErrors = [];
        if (this.state.errors.non_field_errors) {
            this.state.errors.non_field_errors.forEach((errorText, index) => {
                nonFieldErrors.push(
                    <div className="login-form-error" key={index}>
                        {errorText}
                    </div>
                );
            });
        }
        let usernameErrors = [];
        if (this.state.errors.username) {
            this.state.errors.username.forEach((errorText, index) => {
                usernameErrors.push(
                    <div className="login-form-error" key={index}>
                        {errorText}
                    </div>
                );
            });
        }
        let password1Errors = [];
        if (this.state.errors.password1) {
            this.state.errors.password1.forEach((errorText, index) => {
                password1Errors.push(
                    <div className="login-form-error" key={index}>
                        {errorText}
                    </div>
                );
            });
        }
        let password2Errors = [];
        if (this.state.errors.password2) {
            this.state.errors.password2.forEach((errorText, index) => {
                password2Errors.push(
                    <div className="login-form-error" key={index}>
                        {errorText}
                    </div>
                );
            });
        }
        return <Modal isOpen={this.props.isOpen}>
            <ModalHeader>Register</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Input type="text" name="username" id="idUsername" placeholder="Login"
                               value={this.state.login} onChange={this.onChange}/>
                        {usernameErrors}
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password1" id="idPassword1" placeholder="Password"
                               value={this.state.password1} onChange={this.onChange}/>
                        {password1Errors}
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password2" id="idPassword2" placeholder="Repeat password"
                               value={this.state.password2} onChange={this.onChange}/>
                        {password2Errors}
                    </FormGroup>
                    {nonFieldErrors}
                    <Button color="info" onClick={this.handleSubmit} className="float-right ml-4">Register</Button>
                    <Button color="info" onClick={this.onCancel}
                            className="float-right">Cancel</Button>
                </Form>
            </ModalBody>
        </Modal>;
    }
}

export class Login extends Component {
    constructor(props) {
        super(props);
        this.emptyErrors = {
            non_field_errors: [],
            username: [],
            password: []
        };
        this.state = {
            username: '',
            password: '',
            errors: this.emptyErrors
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.token) {
            history.push('/meals');
        }
    }

    onLoginChange = (e) => {
        this.setState({username: e.target.value, errors: this.emptyErrors});
    };

    onPasswordChange = (e) => {
        this.setState({password: e.target.value, errors: this.emptyErrors});
    };
    onSignInClick = (e) => {
        this.props.dispatch(startAjax());
        axios.post(settings.LOGIN_URL,
            {
                username: this.state.username,
                password: this.state.password
            }).then((r) => {
            const token = r.data.key;
            this.props.saveAPIToken(token);
            this.props.dispatch(stopAjax());
        }).catch((err) => {
            const errors = JSON.parse(err.request.response);
            this.setState({errors});
            this.props.dispatch(stopAjax());
        });
        this.props.dispatch(hideUserRegisteredAlert());
    };

    render() {
        let nonFieldErrors = [];
        if (this.state.errors.non_field_errors) {
            this.state.errors.non_field_errors.forEach((errorText, index) => {
                nonFieldErrors.push(
                    <div className="login-form-error" key={index}>
                        {errorText}
                    </div>
                );
            });
        }
        let usernameErrors = [];
        if (this.state.errors.username) {
            this.state.errors.username.forEach((errorText, index) => {
                usernameErrors.push(
                    <div className="login-form-error" key={index}>
                        {errorText}
                    </div>
                );
            });
        }
        let passwordErrors = [];
        if (this.state.errors.password) {
            this.state.errors.password.forEach((errorText, index) => {
                passwordErrors.push(
                    <div className="login-form-error" key={index}>
                        {errorText}
                    </div>
                );
            });
        }

        return (
            <Container className="text-center">
                <Form className="form-signin">
                    <Row className="justify-content-center">
                        <div className="col-4">
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        </div>
                    </Row>
                    <Row className="justify-content-center">
                        <div className="col-4">
                            <Label for="inputLogin" className="sr-only">Login</Label>
                            <Input id="inputLogin" className="form-control" placeholder="Login"
                                   required="" autoFocus="" value={this.state.username} onChange={this.onLoginChange}/>
                        </div>
                    </Row>
                    {usernameErrors}
                    <Row className="justify-content-center">
                        <div className="col-4">
                            <Label for="inputPassword" className="sr-only">Password</Label>
                            <Input type="password" id="inputPassword" className="form-control" placeholder="Password"
                                   required="" value={this.state.password} onChange={this.onPasswordChange}/>
                        </div>
                    </Row>
                    {passwordErrors}
                    {nonFieldErrors}
                    <Row className="justify-content-center">
                        <div className="col-5">
                            <span className="btn btn-link" onClick={this.props.openRegisterForm}>Do not have account yet?
                                Sign Up</span>
                        </div>
                    </Row>
                    <Row className="justify-content-center mt-4">
                        <div className="col-4">
                            <Button className="btn btn-lg btn-primary btn-block" type="button"
                                    onClick={this.onSignInClick} disabled={this.props.ajaxInProgress}>
                                <Spinner show={this.props.ajaxInProgress}/>
                                Sign in
                            </Button>
                        </div>
                    </Row>
                </Form>
            </Container>
        );
    }
}
