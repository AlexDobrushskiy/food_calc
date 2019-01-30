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
import history from '../history';
import axios from 'axios';
import * as settings from '../settings';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import strftime from 'strftime';
import {changeEditMeal, fetchMeals, setMealToEdit} from "../actions";

export class EditMeal extends Component {
    textChange = (e) => {
        this.props.dispatch(changeEditMeal('text', e.target.value));
    };

    caloriesChange = (e) => {
        this.props.dispatch(changeEditMeal('calories', e.target.value));
    };

    handleSubmit = () => {
        const data = {
            date: this.props.meal.date,
            time: this.props.meal.time,
            text: this.props.meal.text,
            calories: this.props.meal.calories
        };
        // show  spinner
        axios.put(`${settings.MEAL_URL}${this.props.meal.id}/`, data, {headers: {Authorization: 'Token ' + this.props.token}}).then((r) => {
            return this.props.dispatch(fetchMeals());
        }).then(() => {
            this.props.closeEditMealModal();
        })
    };
    onChangeDatePicker = (datetime) => {
        const date = strftime('%Y-%m-%d', datetime);
        const time = strftime('%H:%M:%S', datetime);
        this.props.dispatch(changeEditMeal('date', date));
        this.props.dispatch(changeEditMeal('time', time));
    };
    getMealDate = () => {
        return this.props.meal ?  new Date(`${this.props.meal.date}T${this.props.meal.time}`) : null;
    };
    onCancel = () => {
        this.props.dispatch(setMealToEdit(null));
        this.props.closeEditMealModal();
    };
    render() {
        if (!this.props.meal) {
            return null;
        }
        const date = this.getMealDate();
        return <Modal isOpen={this.props.isOpen}>
            <ModalHeader>Edit Meal</ModalHeader>
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
                    <Button color="info" onClick={this.handleSubmit} className="float-right ml-4">Submit</Button>
                    <Button color="info" onClick={this.onCancel}
                            className="float-right">Cancel</Button>
                </Form>
            </ModalBody>
        </Modal>;
    }
}
