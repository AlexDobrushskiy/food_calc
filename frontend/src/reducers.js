import * as actionTypes from './actionTypes';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.OPEN_REGISTER_FORM:
            return { ...state, isOpen: true };
        case actionTypes.CLOSE_REGISTER_FORM:
            return { ...state, isOpen: false };
        case actionTypes.SAVE_API_TOKEN:
            return { ...state, token: action.token};
        default:
            return state;
    }
};

export default reducer;