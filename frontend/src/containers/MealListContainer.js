import {connect} from 'react-redux';

import MealList from '../components/MealListComponent';
import {openEditMealModal, saveMealList, setCurrentPage, setMaxPage} from '../actions';


const mapStateToProps = state => ({
    meals: state.meals,
    token: state.token,
    currentPage: state.currentPage,
    maxPage: state.maxPage,
    userInfo: state.userInfo,
    ajaxInProgress: state.ajaxInProgress
});

const mapDispatchToProps = dispatch => ({
    saveMealList: (meals) => {
        dispatch(saveMealList(meals));
    },
    setCurrentPage: (number) => {
        dispatch(setCurrentPage(number));
    },
    setMaxPage: (number) => {
        dispatch(setMaxPage(number));
    },
    openEditMealModal: () => {
        dispatch(openEditMealModal())
    },
    dispatch
});

export const MealListContainer = connect(mapStateToProps, mapDispatchToProps)(MealList);
