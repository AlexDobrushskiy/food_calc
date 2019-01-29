import React, {Component} from 'react';
import {Input} from 'reactstrap';
import axios from 'axios';
import * as settings from '../settings';

export class FilterForm extends Component {
    onChangeDateFrom = (e) => {
        this.props.setFilterField('filterDateFrom', e.target.value);
    };
    onChangeDateTo = (e) => {
        this.props.setFilterField('filterDateTo', e.target.value);
    };
    onChangeTimeFrom = (e) => {
        this.props.setFilterField('filterTimeFrom', e.target.value);
    };
    onChangeTimeTo = (e) => {
        this.props.setFilterField('filterTimeTo', e.target.value);
    };
    onFilterClick = (e) => {
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
            mealRequestUrl = `${mealRequestUrl}date__gte=${df}&`
        }
        if (dt) {
            mealRequestUrl = `${mealRequestUrl}date__lte=${dt}&`
        }
        if (tf) {
            mealRequestUrl = `${mealRequestUrl}time__gte=${tf}&`
        }
        if (tt) {
            mealRequestUrl = `${mealRequestUrl}time__lte=${tt}&`
        }

        // TODO: show spinner
        axios.get(mealRequestUrl, {headers: {Authorization: 'Token ' + this.props.token}}).then((r) => {
            this.props.saveMealList(r.data.results);
            this.props.setCurrentPage(r.data.current_page);
            this.props.setMaxPage(r.data.max_page);
        }).catch((err) => {
            alert('Error fetching meals');
        });
    };

    render() {
        return <form className="form-inline">
            <div className="form-group">
                <div className="input-group">
                    <Input type="date" className="form-control mb-2 border-right-0" id="idDateFrom"
                           value={this.props.filterDateFrom} onChange={this.onChangeDateFrom}/>
                    <div className="input-group-prepend">
                        <div className="input-group-text">to</div>
                    </div>
                    <Input type="date" className="form-control mb-2 mr-sm-2" id="idDateTo"
                           value={this.props.filterDateTo} onChange={this.onChangeDateTo}/>
                </div>
                <div className="input-group">
                    <Input type="time" className="form-control mb-2 border-right-0" id="idTimeFrom"
                           value={this.props.filterTimeFrom} onChange={this.onChangeTimeFrom}/>
                    <div className="input-group-prepend">
                        <div className="input-group-text">to</div>
                    </div>
                    <Input type="time" className="form-control mb-2 mr-sm-2" id="idTimeTo"
                           value={this.props.filterTimeTo} onChange={this.onChangeTimeTo}/>
                </div>
            </div>
            <button type="button" className="btn btn-primary mb-2" onClick={this.onFilterClick}>Filter</button>
        </form>;
    }
}
