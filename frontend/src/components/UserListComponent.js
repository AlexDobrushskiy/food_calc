import React, {Component} from 'react';
import {Card, CardHeader, CardBody, Navbar} from 'reactstrap';
import {Container} from 'reactstrap';

class UserList extends Component {
    render() {
        return (
            <Container>
                <Navbar light className="justify-content-center bg-info">
                            <h4 className="text-white">Events</h4>
                </Navbar>

                <Card className="alert-info">
                    <CardHeader>
                        UserList
                    </CardHeader>
                    <CardBody>
                        User List
                    </CardBody>
                </Card>
            </Container>
        );
    }
}

export default UserList;
