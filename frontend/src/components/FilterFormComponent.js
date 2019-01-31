import React, {Component} from 'react';
import axios from 'axios';
import * as settings from '../settings';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {fetchMeals, startAjax} from "../actions";
import {Spinner} from "./SpinnerComponent";

export class FilterForm extends Component {
    onChangeDateFrom = (date) => {
        this.props.setFilterField('filterDateFrom', date);
    };
    onChangeDateTo = (date) => {
        this.props.setFilterField('filterDateTo', date);
    };
    onChangeTimeFrom = (date) => {
        this.props.setFilterField('filterTimeFrom', date);
    };
    onChangeTimeTo = (date) => {
        this.props.setFilterField('filterTimeTo', date);
    };
    onFilterClick = (e) => {
        this.props.dispatch(fetchMeals());
    };
    render() {
        let minTime = new Date();
        minTime.setHours(0);
        minTime.setMinutes(0);
        let maxTime = new Date();
        maxTime.setHours(23);
        maxTime.setMinutes(59);
        return <form className="form-inline mb-4">
            <button className="btn btn-secondary mr-4 btn-success" type="button" onClick={this.props.openAddMealModal}>
                Add meal
            </button>
            <div className="form-group">
                <div className="input-group">
                    <DatePicker
                        selected={this.props.filterDateFrom}
                        onChange={this.onChangeDateFrom}
                        placeholderText="From date"
                        maxDate={this.props.filterDateTo}
                    />
                    <DatePicker
                        selected={this.props.filterDateTo}
                        onChange={this.onChangeDateTo}
                        placeholderText="To date"
                        minDate={this.props.filterDateFrom}
                    />
                </div>
                <div className="input-group">
                    <DatePicker
                        selected={this.props.filterTimeFrom}
                        onChange={this.onChangeTimeFrom}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        dateFormat="hh:mm a"
                        timeCaption="Time"
                        placeholderText="From time"
                        minTime={minTime}
                        maxTime={this.props.filterTimeTo ? this.props.filterTimeTo : maxTime}
                    />
                    <DatePicker
                        selected={this.props.filterTimeTo}
                        onChange={this.onChangeTimeTo}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        dateFormat="hh:mm a"
                        timeCaption="Time"
                        placeholderText="To time"
                        minTime={this.props.filterTimeFrom ? this.props.filterTimeFrom : minTime}
                        maxTime={maxTime}
                    />
                </div>
                <button type="button" className="btn btn-outline-secondary ml-3" onClick={this.onFilterClick}
                        disabled={this.props.ajaxInProgress}>
                    <Spinner show={this.props.ajaxInProgress}/>
                    Filter
                </button>
            </div>

        </form>;
    }

}
