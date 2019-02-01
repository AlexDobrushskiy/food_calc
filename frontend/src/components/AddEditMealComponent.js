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
import {
    changeEditMeal, closeAddEditMealModal, fetchMeals, saveEditedMeal, setMealErrors,
    setMealToEdit
} from "../actions";
import {getRenderedErrors} from "../utils";
import {emptyMealErrors} from "../App";

export class AddEditMeal extends Component {
    textChange = (e) => {
        this.props.dispatch(changeEditMeal('text', e.target.value));
        this.props.dispatch(setMealErrors(emptyMealErrors));
    };

    caloriesChange = (e) => {
        this.props.dispatch(changeEditMeal('calories', e.target.value));
        this.props.dispatch(setMealErrors(emptyMealErrors));
    };

    handleSubmit = () => {
        this.props.dispatch(saveEditedMeal());
    };
    onChangeDatePicker = (datetime) => {
        const date = strftime('%Y-%m-%d', datetime);
        const time = strftime('%H:%M:%S', datetime);
        this.props.dispatch(changeEditMeal('date', date));
        this.props.dispatch(changeEditMeal('time', time));
        this.props.dispatch(setMealErrors(emptyMealErrors));
    };
    getMealDate = () => {
        return this.props.meal.date ? new Date(`${this.props.meal.date}T${this.props.meal.time}`) : null;
    };
    onCancel = () => {
        this.props.dispatch(setMealToEdit(null));
        this.props.dispatch(closeAddEditMealModal());
        this.props.dispatch(setMealErrors(emptyMealErrors));
    };
    render() {
        if (!this.props.meal) {
            return null;
        }
        const date = this.getMealDate();
        const header  = this.props.isEditOpen ? 'Edit Meal' : 'Add Meal';
        const submitBtnText  = this.props.isEditOpen ? 'Edit' : 'Add';
        let nonFieldErrors = getRenderedErrors(this.props.errors.non_field_errors);
        let caloriesErrors = getRenderedErrors(this.props.errors.calories);
        let dateErrors = getRenderedErrors(this.props.errors.date);
        let textErrors = getRenderedErrors(this.props.errors.text);
        let timeErrors = getRenderedErrors(this.props.errors.time);

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
                        {dateErrors}
                        {timeErrors}
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="text" id="idMealText" placeholder="Text"
                               value={this.props.meal.text} onChange={this.textChange}/>
                        {textErrors}
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" min="0" step="1" name="calories" id="idCalories" placeholder="Calories"
                               value={this.props.meal.calories} onChange={this.caloriesChange}/>
                        {caloriesErrors}
                    </FormGroup>
                    {nonFieldErrors}
                    <Button color="info" onClick={this.handleSubmit} className="float-right ml-4">{submitBtnText}</Button>
                    <Button color="info" onClick={this.onCancel}
                            className="float-right">Cancel</Button>
                </Form>
            </ModalBody>
        </Modal>;
    }
}
