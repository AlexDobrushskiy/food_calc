import React, {Component} from 'react';
import {Card, CardHeader, DropdownItem, DropdownMenu, DropdownToggle, CardBody, Navbar} from 'reactstrap';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Table, ModalFooter, Dropdown, Container} from 'reactstrap';

class Login extends Component {
    render() {
        return (
            <Container>
                <Navbar light className="justify-content-center bg-info">
                            <h4 className="text-white">Events</h4>
                </Navbar>

                <Card className="alert-info">
                    <CardHeader>
                        Hi
                    </CardHeader>
                    <CardBody>
                        Hi all!
                    </CardBody>
                </Card>
            </Container>
        );
    }
}

export default Login;
