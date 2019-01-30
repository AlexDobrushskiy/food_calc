import {connect} from 'react-redux';

import {EditMeal} from '../components/EditMealComponent';
import {closeEditMealModal} from '../actions';

const mapStateToProps = state => ({
    isOpen: state.editMealModalOpened,
    token: state.token,
    meal: state.mealToEdit
});

const mapDispatchToProps = dispatch => ({
    closeEditMealModal: () => {
        dispatch(closeEditMealModal());
    },
    dispatch
});

export const EditMealContainer = connect(mapStateToProps, mapDispatchToProps)(EditMeal);
