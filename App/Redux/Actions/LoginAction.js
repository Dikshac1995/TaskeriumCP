// import { SET_TASKS } from './Constants';
import { SET_LOGIN_DATA, SET_LOGIN_PROP, RESET_STORE } from '../Actions/Constants';




export const login = (data) => {
    return {
        type: SET_LOGIN_DATA,
        loginData: data
    }

}
