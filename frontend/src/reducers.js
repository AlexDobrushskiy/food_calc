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
        case actionTypes.CHANGE_EDIT_MEAL:
            return {...state, mealToEdit: {...state.mealToEdit, [action.field]: action.value}};
        case actionTypes.CHANGE_EDIT_USER:
            return {...state, userToEdit: {...state.userToEdit, [action.field]: action.value}};
        case actionTypes.OPEN_ADD_MEAL_MODAL:
            return {
                ...state, addMealModalOpened: true,
                mealToEdit: {date: '', time: '', text: '', calories: 0}
            };
        case actionTypes.CLOSE_ADD_MEAL_MODAL:
            return {...state, addMealModalOpened: false};
        case actionTypes.OPEN_EDIT_MEAL_MODAL:
            return {...state, editMealModalOpened: true};
        case actionTypes.CLOSE_EDIT_MEAL_MODAL:
            return {...state, editMealModalOpened: false, addMealModalOpened: false};
        case actionTypes.START_FETCHING_MEALS:
            return {...state, mealFetchingInProgress: true};
        case actionTypes.MEALS_ARE_FETCHED:
            return {...state, mealFetchingInProgress: false};
        case actionTypes.DELETE_MEAL_START:
            return {...state, mealDeleteInProgress: true};
        case actionTypes.DELETE_MEAL_DONE:
            return {...state, mealDeleteInProgress: false};
        case actionTypes.SET_MEAL_TO_EDIT:
            return {...state, mealToEdit: action.meal};
        case actionTypes.OPEN_SETTINGS_MODAL:
            return {...state, settingsModalIsOpen: true};
        case actionTypes.CLOSE_SETTINGS_MODAL:
            return {...state, settingsModalIsOpen: false};
        case actionTypes.CHANGE_CALORIES_SETTING_VALUE:
            return {...state, caloriesSettingsValue: action.value};
        case actionTypes.SHOW_USER_REGISTERED_ALERT:
            return {...state, alertVisible: true};
        case actionTypes.HIDE_USER_REGISTERED_ALERT:
            return {...state, alertVisible: false};
        case actionTypes.SAVE_USER_LIST:
            return {...state, users: action.users};
        case actionTypes.SET_USER_TO_EDIT:
            return {...state, userToEdit: action.user};
        case actionTypes.OPEN_ADD_USER_MODAL:
            return {
                ...state, addUserModalOpened: true,
                userToEdit: {username: '', password: '', role: 0}
            };
        case actionTypes.CLOSE_ADD_USER_MODAL:
            return {...state, addUserModalOpened: false};
        case actionTypes.OPEN_EDIT_USER_MODAL:
            return {...state, editUserModalOpened: true};
        case actionTypes.CLOSE_EDIT_USER_MODAL:
            return {...state, editUserModalOpened: false, addUserModalOpened: false};

        default:
            return state;
    }
};

export default reducer;
