import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as settings from './settings';
import strftime from 'strftime';

export const openRegisterForm = () => ({
    type: actionTypes.OPEN_REGISTER_FORM
});

export const closeRegisterForm = () => ({
    type: actionTypes.CLOSE_REGISTER_FORM
});

export const saveAPIToken = (token) => ({
    type: actionTypes.SAVE_API_TOKEN,
    token
});

export const forgetAPIToken = () => ({
    type: actionTypes.FORGET_API_TOKEN
});

export const saveMealList = (meals) => ({
    type: actionTypes.SAVE_MEAL_LIST,
    meals
});
export const setCurrentPage = (number) => ({
    type: actionTypes.SET_CURRENT_PAGE,
    number
});
export const setMaxPage = (number) => ({
    type: actionTypes.SET_MAX_PAGE,
    number
});
export const setFilterField = (fieldName, value) => ({
    type: actionTypes.SET_FILTER_FIELD,
    fieldName,
    value
});
export const openAddMealModal = () => ({
    type: actionTypes.OPEN_ADD_MEAL_MODAL
});

export const closeAddMealModal = () => ({
    type: actionTypes.CLOSE_ADD_MEAL_MODAL
});

export const openEditMealModal = () => ({
    type: actionTypes.OPEN_EDIT_MEAL_MODAL
});

export const closeAddEditMealModal = () => ({
    type: actionTypes.CLOSE_EDIT_MEAL_MODAL
});

export const startFetchingMeals = () => ({
    type: actionTypes.START_FETCHING_MEALS
});

export const mealsAreFetched = () => ({
    type: actionTypes.MEALS_ARE_FETCHED
});

export const setMealToEdit = (meal) => ({
    type: actionTypes.SET_MEAL_TO_EDIT,
    meal
});

export const changeEditMeal = (field, value) => ({
    type: actionTypes.CHANGE_EDIT_MEAL,
    field,
    value
});

export const fetchMeals = () => {
    return (dispatch, getState) => {
        const {currentPage, token, filterDateFrom, filterDateTo, filterTimeFrom, filterTimeTo} = getState();
        dispatch(startFetchingMeals);
        let mealRequestUrl = `${settings.MEAL_URL}?page=${currentPage}&`;

        if (filterDateFrom) {
            mealRequestUrl = `${mealRequestUrl}date__gte=${strftime('%Y-%m-%d', filterDateFrom)}&`
        }
        if (filterDateTo) {
            mealRequestUrl = `${mealRequestUrl}date__lte=${strftime('%Y-%m-%d', filterDateTo)}&`
        }
        if (filterTimeFrom) {
            mealRequestUrl = `${mealRequestUrl}time__gte=${strftime('%H:%M:%S', filterTimeFrom)}&`
        }
        if (filterTimeTo) {
            mealRequestUrl = `${mealRequestUrl}time__lte=${strftime('%H:%M:%S', filterTimeTo)}&`
        }

        return axios.get(mealRequestUrl, {headers: {Authorization: 'Token ' + token}}).then((r) => {
            dispatch(saveMealList(r.data.results));
            dispatch(setCurrentPage(r.data.current_page));
            dispatch(setMaxPage(r.data.max_page));
            return dispatch(mealsAreFetched);
        }, (err) => {
            alert('Error fetching meals');
            return dispatch(mealsAreFetched);
        });
    }
};

const deleteMealStart = () => ({
    type: actionTypes.DELETE_MEAL_START
});

const deleteMealDone = () => ({
    type: actionTypes.DELETE_MEAL_DONE
});

export const deleteMeal = (id) => {
    return (dispatch, getState) => {
        const {token} = getState();
        const mealDeleteUrl = `${settings.MEAL_URL}${id}/`;
        dispatch(deleteMealStart());
        return axios.delete(mealDeleteUrl, {headers: {Authorization: 'Token ' + token}}).then((r) => {
                dispatch(deleteMealDone());
                return dispatch(fetchMeals());
            },
            (err) => {
                dispatch(deleteMealDone());
                alert('Error deleting meal!');
            });
    }
};

export const saveEditedMeal = () => {
    return (dispatch, getState) => {
        const {token, mealToEdit} = getState();
        const mealUpdateUrl = mealToEdit.id ? `${settings.MEAL_URL}${mealToEdit.id}/` : settings.MEAL_URL;

        dispatch(deleteMealStart());
        const data = {
            date: mealToEdit.date,
            time: mealToEdit.time,
            text: mealToEdit.text,
            calories: mealToEdit.calories
        };
        const method = mealToEdit.id ? axios.put : axios.post;
        return method(mealUpdateUrl, data, {headers: {Authorization: 'Token ' + token}}).then((r) => {
                dispatch(deleteMealDone());
                dispatch(setMealToEdit(null));
                return dispatch(fetchMeals());
            },
            (err) => {
                dispatch(setMealToEdit(null));
                dispatch(deleteMealDone());
                alert('Error saving meal!');
            });
    }
};

export const openSettingsModal = () => ({
    type: actionTypes.OPEN_SETTINGS_MODAL
});


export const closeSettingsModal = () => ({
    type: actionTypes.CLOSE_SETTINGS_MODAL
});

export const changeCaloriesSettingValue = (value) => ({
    type: actionTypes.CHANGE_CALORIES_SETTING_VALUE,
    value
});

export const fetchCaloriesSetting = () => {
    return (dispatch, getState) => {
        const {token} = getState();
        axios.get(settings.CALORIES_SETTING_URL, {headers: {Authorization: 'Token ' + token}}).then((r)=>{
            dispatch(changeCaloriesSettingValue(r.data.value));
        }, (err) => {
            alert('Error fetching setting!');
        });
    }
};

export const saveCaloriesSetting = () => {
    return (dispatch, getState) => {
        const {token, caloriesSettingsValue} = getState();
        axios.put(settings.CALORIES_SETTING_URL, {value: caloriesSettingsValue}, {headers: {Authorization: 'Token ' + token}}).then((r)=>{
            dispatch(closeSettingsModal());
            dispatch(fetchCaloriesSetting());
        }, (err) => {
            alert('Error saving setting!');
            dispatch(closeSettingsModal());
            dispatch(fetchCaloriesSetting());
        });
    }
};