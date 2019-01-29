import React, {Component} from 'react';
import {Input} from 'reactstrap';
import axios from 'axios';
import * as settings from '../settings';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import strftime from 'strftime';

export class FilterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            loadInProgress: false
        };
    }

    handleChange = (date) => {
        this.setState({
            startDate: date
        });
    };

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
        this.setState({loadInProgress: true});
        // TODO: validate if some field are not filled
        this.fetchMeals();
    };
    fetchMeals = () => {
        const df = this.props.filterDateFrom;
        const dt = this.props.filterDateTo;
        const tf = this.props.filterTimeFrom;
        const tt = this.props.filterTimeTo;

        let mealRequestUrl = `${settings.MEAL_URL}?`;
        if (df) {
            mealRequestUrl = `${mealRequestUrl}date__gte=${strftime('%Y-%m-%d', df)}&`
        }
        if (dt) {
            mealRequestUrl = `${mealRequestUrl}date__lte=${strftime('%Y-%m-%d', dt)}&`
        }
        if (tf) {
            mealRequestUrl = `${mealRequestUrl}time__gte=${strftime('%H:%M:%S', tf)}&`
        }
        if (tt) {
            mealRequestUrl = `${mealRequestUrl}time__lte=${strftime('%H:%M:%S', tt)}&`
        }

        // TODO: show spinner
        axios.get(mealRequestUrl, {headers: {Authorization: 'Token ' + this.props.token}}).then((r) => {
            this.props.saveMealList(r.data.results);
            this.props.setCurrentPage(r.data.current_page);
            this.props.setMaxPage(r.data.max_page);
            this.setState({loadInProgress: false});
        }).catch((err) => {
            alert('Error fetching meals');
            this.setState({loadInProgress: false});
        });
    };

    render() {
        let minTime = new Date();
        minTime.setHours(0);
        minTime.setMinutes(0);
        let maxTime = new Date();
        maxTime.setHours(23);
        maxTime.setMinutes(59);
        const spinner = this.state.loadInProgress ?
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/> : null;
        return <form className="form-inline mb-4">
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
                        disabled={this.state.loadInProgress}>
                    {spinner}
                    Filter
                </button>
            </div>

        </form>;
    }

}
