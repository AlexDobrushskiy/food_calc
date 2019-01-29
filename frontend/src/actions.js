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

export const startFetchingMeals = () => ({
    type: actionTypes.START_FETCHING_MEALS
});

export const mealsAreFetched = () => ({
    type: actionTypes.MEALS_ARE_FETCHED
});

export const fetchMeals = (token, dateFrom, dateTo, timeFrom, timeTo, pageNumber) => {
    return dispatch => {
        dispatch(startFetchingMeals);
        let mealRequestUrl = `${settings.MEAL_URL}?page=${pageNumber}&`;

        if (dateFrom) {
            mealRequestUrl = `${mealRequestUrl}date__gte=${strftime('%Y-%m-%d', dateFrom)}&`
        }
        if (dateTo) {
            mealRequestUrl = `${mealRequestUrl}date__lte=${strftime('%Y-%m-%d', dateTo)}&`
        }
        if (timeFrom) {
            mealRequestUrl = `${mealRequestUrl}time__gte=${strftime('%H:%M:%S', timeFrom)}&`
        }
        if (timeTo) {
            mealRequestUrl = `${mealRequestUrl}time__lte=${strftime('%H:%M:%S', timeTo)}&`
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
