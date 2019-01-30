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
import "react-datepicker/dist/react-datepicker.css";
import {changeCaloriesSettingValue, closeSettingsModal, saveCaloriesSetting} from "../actions";

export class Settings extends Component {
    handleSubmit = () => {
        this.props.dispatch(saveCaloriesSetting());
    };
    changeValue = (e) => {
        this.props.dispatch(changeCaloriesSettingValue(Number(e.target.value)));
    };
    onCancel = () => {
        this.props.dispatch(closeSettingsModal());
    };
    render() {
        return <Modal isOpen={this.props.isOpen}>
            <ModalHeader>Settings</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Input type="number" min="0" step="1" name="calories" id="idCalories" placeholder="Calories"
                               value={this.props.value} onChange={this.changeValue}
                        />
                    </FormGroup>
                    <Button color="info" onClick={this.handleSubmit} className="float-right ml-4">Save</Button>
                    <Button color="info" onClick={this.onCancel}
                            className="float-right">Cancel</Button>
                </Form>
            </ModalBody>
        </Modal>;
    }
}
