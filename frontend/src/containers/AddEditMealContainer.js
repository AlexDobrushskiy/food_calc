import {connect} from 'react-redux';

import {AddEditMeal} from '../components/AddEditMealComponent';

const mapStateToProps = state => ({
    isEditOpen: state.editMealModalOpened,
    isAddOpen: state.addMealModalOpened,
    meal: state.mealToEdit,
    errors: state.mealErrors
});

const mapDispatchToProps = dispatch => ({
    dispatch
});

export const AddEditMealContainer = connect(mapStateToProps, mapDispatchToProps)(AddEditMeal);
