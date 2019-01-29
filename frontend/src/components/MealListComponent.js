import React, {Component} from 'react';
import {
    Container, Row, Input
} from 'reactstrap';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import * as settings from '../settings';
import history from '../history';

class MealList extends Component {

    handlePageClick = (e) => {
        this.fetchMeals(e.selected + 1);
    };

    fetchMeals = (pageNumber = 1) => {
        const mealRequestUrl = `${settings.MEAL_URL}?page=${pageNumber}`;
        axios.get(mealRequestUrl, {headers: {Authorization: 'Token ' + this.props.token}}).then((r) => {
            this.props.saveMealList(r.data.results);
            this.props.setCurrentPage(r.data.current_page);
            this.props.setMaxPage(r.data.max_page);
        }).catch((err) => {
            console.log('Error fetching meals');
            history.push('/login/');
        });
    };

    componentDidMount() {
        if (!this.props.token) {
            history.push('/login/');
        }
    }
    render() {
        if (!this.props.token) {
            return null;
        }
        if (this.props.meals === null) {
            this.fetchMeals();
        }
        let meals = [];
        if (this.props.meals !== null) {
            meals = this.props.meals.map((meal, index) => {
                return <tr key={index}>
                    <td className="col-1">{meal.date}</td>
                    <td className="col-1">{meal.time}</td>
                    <td className="col-4" style={{wordWrap: 'break-word'}}>{meal.text}</td>
                    <td className="col-1">{meal.calories}</td>
                    <td className="col-2">
                        <span className="ml-4 btn btn-light">
                        <i className="fas fa-edit"/></span>
                        <span className="ml-4 btn btn-light">
                        <i className="fas fa-trash-alt"/>
                        </span>
                    </td>
                </tr>
            });
        }
        return <Container>
            <Row className="justify-content-center">
                <form className="form-inline">
                    <div className="form-group">
                        <div className="input-group">
                            <Input type="date" className="form-control mb-2 border-right-0" id="idDateFrom"/>
                            <div className="input-group-prepend">
                                <div className="input-group-text">to</div>
                            </div>
                            <Input type="date" className="form-control mb-2 mr-sm-2" id="idDateTo"/>
                        </div>
                        <div className="input-group">
                            <Input type="time" className="form-control mb-2 border-right-0" id="idTimeFrom"/>
                            <div className="input-group-prepend">
                                <div className="input-group-text">to</div>
                            </div>
                            <Input type="time" className="form-control mb-2 mr-sm-2" id="idTimeTo"/>

                        </div>
                    </div>
                    <button type="button" className="btn btn-primary mb-2">Filter</button>
                </form>
            </Row>
            <table className="table" style={{tableLayout: 'fixed'}}>
                <thead>
                <tr>
                    <th scope="col" className="col-1">Date</th>
                    <th scope="col" className="col-1">Time</th>
                    <th scope="col" className="col-4">Text</th>
                    <th scope="col" className="col-1">Callories</th>
                    <th scope="col" className="col-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {meals}
                </tbody>
            </table>
            <Row className="justify-content-center">
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={this.props.maxPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                />
            </Row>
        </Container>
    }
}

export default MealList;
