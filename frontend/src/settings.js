const HOST_NAME = 'http://192.168.22.127:8080';
// REST Auth endpoints:
// https://django-rest-auth.readthedocs.io/en/latest/api_endpoints.html

export const LOGIN_URL = HOST_NAME + '/rest-auth/login/';
export const MEAL_URL = HOST_NAME + '/api/v1/meal/';
export const CALORIES_SETTING_URL = HOST_NAME + '/api/v1/max_calories/';
export const REGISTER_USER_URL = HOST_NAME + '/rest-auth/registration/';
export const USER_URL = HOST_NAME + '/api/v1/user/';

export const ROLES = {
    0: 'User',
    1: 'Manager',
    2: 'Admin'
};
