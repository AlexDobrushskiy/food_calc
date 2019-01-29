import {connect} from 'react-redux';

import {AddMeal} from '../components/AddMealComponent';
import {closeAddMealModal, fetchMeals} from '../actions';

const mapStateToProps = state => ({
    isOpen: state.addMealModalOpened,
    token: state.token,
    currentPage: state.currentPage,
    filterDateFrom: state.filterDateFrom,
    filterDateTo: state.filterDateTo,
    filterTimeFrom: state.filterTimeFrom,
    filterTimeTo: state.filterTimeTo
});

const mapDispatchToProps = dispatch => ({
    closeAddMealModal: () => {
        dispatch(closeAddMealModal());
    },
    fetchMeals: (token, dateFrom, dateTo, timeFrom, timeTo, pageNumber) => {
        dispatch(fetchMeals(token, dateFrom, dateTo, timeFrom, timeTo, pageNumber))
    }
});

export const AddMealContainer = connect(mapStateToProps, mapDispatchToProps)(AddMeal);
