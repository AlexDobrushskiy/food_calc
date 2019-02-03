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
import {
    changeCaloriesSettingValue, closeSettingsModal, saveCaloriesSetting, setSettingErrors,
    startAjax
} from "../actions";
import {getRenderedErrors} from "../utils";
import {emptySettingErrors} from "../App";

export class Settings extends Component {
    handleSubmit = () => {
        this.props.dispatch(saveCaloriesSetting());
    };
    changeValue = (e) => {
        this.props.dispatch(changeCaloriesSettingValue(Number(e.target.value)));
        this.props.dispatch(setSettingErrors(emptySettingErrors));
    };
    onCancel = () => {
        this.props.dispatch(closeSettingsModal());
        this.props.dispatch(setSettingErrors(emptySettingErrors));
    };
    render() {
        let nonFieldErrors = getRenderedErrors(this.props.errors.non_field_errors);
        let valueErrors = getRenderedErrors(this.props.errors.value);

        return <Modal isOpen={this.props.isOpen}>
            <ModalHeader>Settings</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Input type="number" min="0" step="1" name="calories" id="idCalories" placeholder="Calories"
                               value={this.props.value} onChange={this.changeValue}
                        />
                        {valueErrors}
                    </FormGroup>
                    {nonFieldErrors}
                    <Button color="info" onClick={this.handleSubmit} className="float-right ml-4" disabled={this.props.ajaxInProgress}>Save</Button>
                    <Button color="info" onClick={this.onCancel}
                            className="float-right">Cancel</Button>
                </Form>
            </ModalBody>
        </Modal>;
    }
}
