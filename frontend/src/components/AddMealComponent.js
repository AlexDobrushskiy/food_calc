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
import {fetchMeals} from "../actions";

export class AddMeal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            text: '',
            calories: 0
        }
    }

    textChange = (e) => {
        this.setState({text: e.target.value});
    };

    caloriesChange = (e) => {
        this.setState({calories: e.target.value});
    };

    handleSubmit = () => {
        const data = {
            date: strftime('%Y-%m-%d', this.state.date),
            time: strftime('%H:%M:%S', this.state.date),
            text: this.state.text,
            calories: this.state.calories
        };
        // show  spinner
        axios.post(settings.MEAL_URL, data, {headers: {Authorization: 'Token ' + this.props.token}}).then((r) => {
            return this.props.fetchMeals(this.props.token,
                this.props.filterDateFrom,
                this.props.filterDateTo,
                this.props.filterTimeFrom,
                this.props.filterTimeTo,
                this.props.currentPage);
        }).then(() => {
            this.props.closeAddMealModal();
        })
    };
    onChangeDatePicker = (date) => {
        this.setState({date});
    };

    render() {
        return <Modal isOpen={this.props.isOpen}>
            <ModalHeader>Add Meal</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <DatePicker className="form-control"
                                    selected={this.state.date}
                                    onChange={this.onChangeDatePicker}
                                    placeholderText="Date and time"
                                    showTimeSelect
                                    dateFormat="MMMM d, yyyy h:mm aa"
                        />

                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="text" id="idMealText" placeholder="Text"
                               value={this.state.text} onChange={this.textChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" min="0" step="1" name="calories" id="idCalories" placeholder="Calories"
                               value={this.state.calories} onChange={this.caloriesChange}/>
                    </FormGroup>
                    <Button color="info" onClick={this.handleSubmit} className="float-right ml-4">Add</Button>
                    <Button color="info" onClick={this.props.closeAddMealModal}
                            className="float-right">Cancel</Button>
                </Form>
            </ModalBody>
        </Modal>;
    }
}
