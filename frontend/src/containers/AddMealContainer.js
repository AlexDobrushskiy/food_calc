import {connect} from 'react-redux';

import {AddMeal} from '../components/AddMealComponent';
import {closeAddMealModal} from '../actions';

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
    dispatch
});

export const AddMealContainer = connect(mapStateToProps, mapDispatchToProps)(AddMeal);
