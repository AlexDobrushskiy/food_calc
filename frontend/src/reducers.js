import * as actionTypes from './actionTypes';

const reducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.OPEN_REGISTER_FORM:
            return { ...state, isOpen: true };
        case actionTypes.CLOSE_REGISTER_FORM:
            return { ...state, isOpen: false };
        default:
            return state;
    }
};

export default reducer;