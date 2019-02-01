import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as settings from './settings';
import strftime from 'strftime';
import history from './history';

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

export const startAjax = (entity) => ({
    type: actionTypes.START_AJAX,
    entity
});

export const stopAjax = (entity) => ({
    type: actionTypes.STOP_AJAX,
    entity
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

export const setUserToEdit = (user) => ({
    type: actionTypes.SET_USER_TO_EDIT,
    user
});

export const fetchMeals = () => {
    return (dispatch, getState) => {
        const {currentPage, token, filterDateFrom, filterDateTo, filterTimeFrom, filterTimeTo} = getState();
        dispatch(startAjax('meal'));
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
            return dispatch(stopAjax('meal'));
        }, (err) => {
            dispatch(stopAjax('meal'));
            if ([401, 403].some(i => i === err.response.status)) {
                history.push('/logout');
            } else {
                alert('Error fetching meals');
            }
        });
    }
};

export const deleteMeal = (id) => {
    return (dispatch, getState) => {
        const {token} = getState();
        const mealDeleteUrl = `${settings.MEAL_URL}${id}/`;
        dispatch(stopAjax('common'));
        return axios.delete(mealDeleteUrl, {headers: {Authorization: 'Token ' + token}}).then((r) => {
                dispatch(stopAjax('common'));
                return dispatch(fetchMeals());
            },
            (err) => {
                dispatch(stopAjax('common'));
                if ([401, 403].some(i => i === err.response.status)) {
                    history.push('/logout');
                } else {
                    alert('Error deleting meal!');
                }
            });
    }
};

export const setMealErrors = (errors) => ({
    type: actionTypes.SET_MEAL_ERRORS,
    errors
});

export const setSettingErrors = (errors) => ({
    type: actionTypes.SET_SETTING_ERRORS,
    errors
});

export const setUserErrors = (errors) => ({
    type: actionTypes.SET_USER_ERRORS,
    errors
});


export const saveEditedMeal = () => {
    return (dispatch, getState) => {
        const {token, mealToEdit, mealErrors} = getState();
        const mealUpdateUrl = mealToEdit.id ? `${settings.MEAL_URL}${mealToEdit.id}/` : settings.MEAL_URL;

        dispatch(stopAjax('common'));
        let data = {
            date: mealToEdit.date,
            time: mealToEdit.time,
            text: mealToEdit.text,
            calories: mealToEdit.calories
        };
        if (mealToEdit.user) {
            data.user = mealToEdit.user;
        }
        const method = mealToEdit.id ? axios.put : axios.post;
        return method(mealUpdateUrl, data, {headers: {Authorization: 'Token ' + token}}).then((r) => {
                dispatch(stopAjax('common'));
                dispatch(setMealToEdit(null));
                return dispatch(fetchMeals());
            },
            (err) => {
                dispatch(stopAjax('common'));
                dispatch(setMealErrors({...mealErrors, ...err.response.data}));
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
        axios.get(settings.CALORIES_SETTING_URL, {headers: {Authorization: 'Token ' + token}}).then((r) => {
                dispatch(changeCaloriesSettingValue(r.data.value));
            }, (err) => {
                if ([401, 403].some(i => i === err.response.status)) {
                    history.push('/logout');
                } else {
                    alert('Error fetching setting!');
                }
            }
        );
    }
};

export const saveCaloriesSetting = () => {
    return (dispatch, getState) => {
        const {token, caloriesSettingsValue, settingErrors} = getState();
        axios.put(settings.CALORIES_SETTING_URL, {value: caloriesSettingsValue}, {headers: {Authorization: 'Token ' + token}}).then((r) => {
            dispatch(closeSettingsModal());
            dispatch(fetchCaloriesSetting());
            dispatch(fetchMeals());
        }, (err) => {
            dispatch(setSettingErrors({...settingErrors, ...err.response.data}));
        });
    }
};

export const showUserRegisteredAlert = () => ({
    type: actionTypes.SHOW_USER_REGISTERED_ALERT
});

export const hideUserRegisteredAlert = () => ({
    type: actionTypes.HIDE_USER_REGISTERED_ALERT
});

export const saveUserList = (users) => ({
    type: actionTypes.SAVE_USER_LIST,
    users
});


export const fetchUsers = () => {
    return (dispatch, getState) => {
        const {token} = getState();
        dispatch(stopAjax('common'));
        return axios.get(settings.USER_URL, {headers: {Authorization: 'Token ' + token}}).then((r) => {
            dispatch(saveUserList(r.data.results));
            return dispatch(stopAjax('common'));
        }, (err) => {
            if ([401, 403].some(i => i === err.response.status)) {
                history.push('/logout');
            }

            return dispatch(stopAjax('common'));
        });
    }
};

export const deleteUser = (id) => {
    return (dispatch, getState) => {
        const {token} = getState();
        const userDeleteUrl = `${settings.USER_URL}${id}/`;
        dispatch(stopAjax('common'));
        return axios.delete(userDeleteUrl, {headers: {Authorization: 'Token ' + token}}).then((r) => {
                dispatch(stopAjax('common'));
                return dispatch(fetchUsers());
            },
            (err) => {
                if ([401, 403].some(i => i === err.response.status)) {
                    history.push('/logout');
                }

                dispatch(stopAjax('common'));
            });
    }
};

export const openEditUserModal = () => ({
    type: actionTypes.OPEN_EDIT_USER_MODAL
});

export const openAddUserModal = () => ({
    type: actionTypes.OPEN_ADD_USER_MODAL
});

export const closeAddEditUserModal = () => ({
    type: actionTypes.CLOSE_EDIT_USER_MODAL
});

export const changeEditUser = (field, value) => ({
    type: actionTypes.CHANGE_EDIT_USER,
    field,
    value
});

export const saveEditedUser = () => {
    return (dispatch, getState) => {
        const {token, userToEdit, userErrors} = getState();
        const userUpdateUrl = userToEdit.id ? `${settings.USER_URL}${userToEdit.id}/` : settings.USER_URL;
        dispatch(stopAjax('common'));
        const data = {
            username: userToEdit.username,
            role: userToEdit.role
        };
        if (userToEdit.password) {
            data.password = userToEdit.password
        }
        const method = userToEdit.id ? axios.patch : axios.post;
        return method(userUpdateUrl, data, {headers: {Authorization: 'Token ' + token}}).then((r) => {
                dispatch(stopAjax('common'));
                dispatch(setUserToEdit(null));
                return dispatch(fetchUsers());
            },
            (err) => {
                dispatch(setUserErrors({...userErrors, ...err.response.data}));
                dispatch(stopAjax('common'));
            });
    }
};


export const saveUserInfo = (userInfo) => ({
    type: actionTypes.SAVE_USER_INFO,
    userInfo
});


export const fetchUserInfo = () => {
    return (dispatch, getState) => {
        const {token} = getState();
        dispatch(stopAjax('common'));
        return axios.get(settings.USER_INFO_URL, {headers: {Authorization: 'Token ' + token}}).then((r) => {
            dispatch(saveUserInfo(r.data));
            return dispatch(stopAjax('common'));
        }, (err) => {
            if ([401, 403].some(i => i === err.response.status)) {
                history.push('/logout');
            } else {
                alert('Error fetching user info')
            }
            return dispatch(stopAjax('common'));
        });
    }
};

export const resetStore = () => ({
    type: actionTypes.RESET_STORE
});
