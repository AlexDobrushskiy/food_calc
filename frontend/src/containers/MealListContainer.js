import {connect} from 'react-redux';

import MealList from '../components/MealListComponent';
import {saveMealList, setCurrentPage, setMaxPage} from '../actions';


const mapStateToProps = state => ({
    meals: state.meals,
    token: state.token,
    currentPage: state.currentPage,
    maxPage: state.maxPage
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
    dispatch
});

export const MealListContainer = connect(mapStateToProps, mapDispatchToProps)(MealList);
