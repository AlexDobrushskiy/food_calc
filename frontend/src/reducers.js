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
        default:
            return state;
    }
};

export default reducer;
