import React, {Component} from 'react';
import {
    Container, Row
} from 'reactstrap';
import ReactPaginate from 'react-paginate';
import history from '../history';
import {FilterFormContainer} from "../containers/FilterFormContainer";
import {deleteMeal, fetchMeals, setMealToEdit} from "../actions";
import {AddEditMealContainer} from "../containers/AddEditMealContainer";
import {Spinner} from "./SpinnerComponent";

class MealList extends Component {

    handlePageClick = (e) => {
        this.props.setCurrentPage(e.selected + 1);
        this.props.dispatch(fetchMeals());
    };

    onDeleteClick = (id, e) => {
        this.props.dispatch(deleteMeal(id));
    };

    componentDidMount() {
        if (!this.props.token) {
            history.push('/login/');
        }
    }

    editMealClick = (meal, e) => {
        this.props.dispatch(setMealToEdit(meal));
        this.props.openEditMealModal();
    };

    render() {
        if (!this.props.token) {
            return null;
        }
        if (this.props.meals === null) {
            this.props.dispatch(fetchMeals());
        }

        let meals = [];
        let spinner = <Row className="justify-content-center"><Spinner show={this.props.ajaxInProgress}/></Row>;
        if (!this.props.ajaxInProgress) {
            if (this.props.meals !== null) {
                meals = this.props.meals.map((meal, index) => {
                    const rowClass = meal.exceeded_calories_per_day ? 'exceeded' : 'not-exceeded';
                    return <tr key={index} className={rowClass}>
                        <td className="col-1">{meal.date}</td>
                        <td className="col-1">{meal.time}</td>
                        <td className="col-4" style={{wordWrap: 'break-word'}}>{meal.text}</td>
                        <td className="col-1">{meal.calories}</td>
                        <td className="col-2">
                            <span className="ml-4 btn btn-light" onClick={this.editMealClick.bind(this, meal)}>
                                <i className="fas fa-edit"/>
                            </span>
                            <span className="ml-4 btn btn-light" onClick={this.onDeleteClick.bind(this, meal.id)}>
                                <i className="fas fa-trash-alt"/>
                            </span>
                        </td>
                    </tr>
                });
            }
        }
        const paginationRow = <Row className="justify-content-center">
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
                forcePage={this.props.currentPage - 1}
            />
        </Row>;

        return <Container>
            <Row className="justify-content-center">
                <FilterFormContainer/>
            </Row>
            {/*<Row className="justify-content-end">*/}
            {/*<div className="col-3">*/}
            {/**/}
            {/*</div>*/}
            {/*</Row>*/}
            {paginationRow}
            <table className="table" style={{tableLayout: 'fixed'}}>
                <thead>
                <tr>
                    <th scope="col" className="col-1">Date</th>
                    <th scope="col" className="col-1">Time</th>
                    <th scope="col" className="col-4">Text</th>
                    <th scope="col" className="col-1">Callories</th>
                    <th scope="col" className="col-2">
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {meals}
                </tbody>
            </table>
            {spinner}
            {paginationRow}
            <AddEditMealContainer/>
        </Container>
    }
}

export default MealList;
