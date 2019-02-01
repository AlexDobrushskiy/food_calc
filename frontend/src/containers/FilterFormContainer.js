import {connect} from 'react-redux';

import {FilterForm} from '../components/FilterFormComponent';
import {openAddMealModal, saveMealList, setCurrentPage, setFilterField, setMaxPage} from '../actions';

const mapStateToProps = state => ({
    filterDateFrom: state.filterDateFrom,
    filterDateTo: state.filterDateTo,
    filterTimeFrom: state.filterTimeFrom,
    filterTimeTo: state.filterTimeTo,
    currentPage: state.currentPage,
    token: state.token,
    ajaxInProgress: state.ajaxInProgress.meal
});

const mapDispatchToProps = dispatch => ({
    setFilterField: (fieldName, value) => {
        dispatch(setFilterField(fieldName, value));
    },
    saveMealList: (meals) => {
        dispatch(saveMealList(meals));
    },
    setCurrentPage: (number) => {
        dispatch(setCurrentPage(number));
    },
    setMaxPage: (number) => {
        dispatch(setMaxPage(number));
    },
    openAddMealModal: () => {
        dispatch(openAddMealModal());
    },
    dispatch
});

export const FilterFormContainer = connect(mapStateToProps, mapDispatchToProps)(FilterForm);
