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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import strftime from 'strftime';
import {changeEditMeal, closeAddEditMealModal, fetchMeals, saveEditedMeal, setMealToEdit} from "../actions";

export class AddEditMeal extends Component {
    textChange = (e) => {
        this.props.dispatch(changeEditMeal('text', e.target.value));
    };

    caloriesChange = (e) => {
        this.props.dispatch(changeEditMeal('calories', e.target.value));
    };

    handleSubmit = () => {
        this.props.dispatch(saveEditedMeal());
    };
    onChangeDatePicker = (datetime) => {
        const date = strftime('%Y-%m-%d', datetime);
        const time = strftime('%H:%M:%S', datetime);
        this.props.dispatch(changeEditMeal('date', date));
        this.props.dispatch(changeEditMeal('time', time));
    };
    getMealDate = () => {
        return this.props.meal.date ? new Date(`${this.props.meal.date}T${this.props.meal.time}`) : null;
    };
    onCancel = () => {
        this.props.dispatch(setMealToEdit(null));
        this.props.dispatch(closeAddEditMealModal());
    };
    render() {
        if (!this.props.meal) {
            return null;
        }
        const date = this.getMealDate();
        const header  = this.props.isEditOpen ? 'Edit Meal' : 'Add Meal';
        const submitBtnText  = this.props.isEditOpen ? 'Edit' : 'Add';

        return <Modal isOpen={this.props.isEditOpen || this.props.isAddOpen}>
            <ModalHeader>{header}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <DatePicker className="form-control"
                                    selected={date}
                                    onChange={this.onChangeDatePicker}
                                    placeholderText="Date and time"
                                    showTimeSelect
                                    dateFormat="MMMM d, yyyy h:mm aa"
                        />

                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="text" id="idMealText" placeholder="Text"
                               value={this.props.meal.text} onChange={this.textChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" min="0" step="1" name="calories" id="idCalories" placeholder="Calories"
                               value={this.props.meal.calories} onChange={this.caloriesChange}/>
                    </FormGroup>
                    <Button color="info" onClick={this.handleSubmit} className="float-right ml-4">{submitBtnText}</Button>
                    <Button color="info" onClick={this.onCancel}
                            className="float-right">Cancel</Button>
                </Form>
            </ModalBody>
        </Modal>;
    }
}
