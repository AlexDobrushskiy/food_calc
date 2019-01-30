import * as actionTypes from './actionTypes';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.OPEN_REGISTER_FORM:
            return {...state, isOpen: true};
        case actionTypes.CLOSE_REGISTER_FORM:
            return {...state, isOpen: false};
        case actionTypes.SAVE_API_TOKEN:
            return {...state, token: action.token};
        case actionTypes.FORGET_API_TOKEN:
            return {...state, token: ''};
        case actionTypes.SAVE_MEAL_LIST:
            return {...state, meals: action.meals};
        case actionTypes.SET_CURRENT_PAGE:
            return {...state, currentPage: action.number};
        case actionTypes.SET_MAX_PAGE:
            return {...state, maxPage: action.number};
        case actionTypes.SET_FILTER_FIELD:
            return {...state, [action.fieldName]: action.value};
        case actionTypes.OPEN_ADD_MEAL_MODAL:
            return {...state, addMealModalOpened: true};
        case actionTypes.CLOSE_ADD_MEAL_MODAL:
            return {...state, addMealModalOpened: false};
        case actionTypes.START_FETCHING_MEALS:
            return {...state, mealFetchingInProgress: true};
        case actionTypes.MEALS_ARE_FETCHED:
            return {...state, mealFetchingInProgress: false};
        case actionTypes.DELETE_MEAL_START:
            return {...state, mealDeleteInProgress: true};
        case actionTypes.DELETE_MEAL_DONE:
            return {...state, mealDeleteInProgress: false};
        default:
            return state;
    }
};

export default reducer;
