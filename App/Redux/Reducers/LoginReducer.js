import { SET_LOGIN_DATA, SET_LOGIN_PROP, RESET_STORE } from '../Actions/Constants';

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SET_LOGIN_DATA:
            return action.loginData;

        case SET_LOGIN_PROP:
            return { ...state, [action.loginProp.prop]: action.loginProp.value };

        case RESET_STORE:
            return INITIAL_STATE;

        default:
            return state;
    }
}