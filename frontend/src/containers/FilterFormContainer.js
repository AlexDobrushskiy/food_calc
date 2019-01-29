import {connect} from 'react-redux';

import {FilterForm} from '../components/FilterFormComponent';
import {saveMealList, setCurrentPage, setFilterField, setMaxPage} from '../actions';

const mapStateToProps = state => ({
    filterDateFrom: state.filterDateFrom,
    filterDateTo: state.filterDateTo,
    filterTimeFrom: state.filterTimeFrom,
    filterTimeTo: state.filterTimeTo,
    token: state.token
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
    }
});

export const FilterFormContainer = connect(mapStateToProps, mapDispatchToProps)(FilterForm);
