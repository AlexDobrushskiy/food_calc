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
                        <Input type="text" name="username" id="idUsername" placeholder="Login"
                               />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password1" id="idPassword1" placeholder="Password"
                               />
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
    render() {
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
                                   required="" autoFocus=""/>
                        </div>
                    </Row>
                    <Row className="justify-content-center">
                        <div className="col-4">
                            <Label for="inputPassword" className="sr-only">Password</Label>
                            <Input type="password" id="inputPassword" className="form-control" placeholder="Password"
                                   required=""/>
                        </div>
                    </Row>
                    <Row className="justify-content-center">
                        <div className="col-4">
                            <a href="#" role="button" onClick={this.props.openRegisterForm}>Do not have account yet? Sign Up</a>
                        </div>
                    </Row>
                    <Row className="justify-content-center mt-4">
                        <div className="col-4">
                            <Button className="btn btn-lg btn-primary btn-block" type="button">Sign in</Button>
                        </div>
                    </Row>
                </Form>
            </Container>
        );
    }
}
