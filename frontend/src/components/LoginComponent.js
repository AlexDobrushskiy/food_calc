import React, {Component} from 'react';
import {Card, CardHeader, DropdownItem, DropdownMenu, DropdownToggle, CardBody, Navbar, Row, Col} from 'reactstrap';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Input,
    Table,
    ModalFooter,
    Dropdown,
    Container,
    Label
} from 'reactstrap';
import history from '../history';

import axios from 'axios';
import * as settings from '../settings';


export class RegisterModal extends Component {
    handleSubmit = () => {
        window.alert('Handle Submit');
    };

    render() {
        return <Modal isOpen={this.props.isOpen}>
            <ModalHeader>Register</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Input type="text" name="username" id="idUsername" placeholder="Login"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password1" id="idPassword1" placeholder="Password"/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password2" id="idPassword2" placeholder="Repeat password"
                        />
                    </FormGroup>
                    <Button color="info" onClick={this.handleSubmit} className="float-right ml-4">Register</Button>
                    <Button color="info" onClick={this.props.closeRegisterForm}
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
            non_field_errors: []
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
        axios.post(settings.LOGIN_URL,
            {
                username: this.state.username,
                password: this.state.password
            }).then((r) => {
                const token = r.data.key;
                this.props.saveAPIToken(token);
        }).catch((err) => {
            const errors = JSON.parse(err.request.response);
            this.setState({errors});
        });

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
                    <Row className="justify-content-center">
                        <div className="col-4">
                            <Label for="inputPassword" className="sr-only">Password</Label>
                            <Input type="password" id="inputPassword" className="form-control" placeholder="Password"
                                   required="" value={this.state.password} onChange={this.onPasswordChange}/>
                        </div>
                    </Row>
                    {nonFieldErrors}
                    <Row className="justify-content-center">
                        <div className="col-4">
                            <a href="#" role="button" onClick={this.props.openRegisterForm}>Do not have account yet?
                                Sign Up</a>
                        </div>
                    </Row>
                    <Row className="justify-content-center mt-4">
                        <div className="col-4">
                            <Button className="btn btn-lg btn-primary btn-block" type="button"
                                    onClick={this.onSignInClick}>Sign in</Button>
                        </div>
                    </Row>
                </Form>
            </Container>
        );
    }
}
