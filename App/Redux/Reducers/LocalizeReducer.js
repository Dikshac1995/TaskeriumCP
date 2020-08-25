import { SET_TRANSLATION, RESET_STORE } from '../Actions/Constants';

const translations = {
    en: require('../../Config/Locals/en.json'),
    he: require('../../Config/Locals/he.json'),
}

const INITIAL_STATE = {
    translations,
    activeLanguage: 'en'
}

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SET_TRANSLATION:
            return { ...state, activeLanguage: action.language };
        case RESET_STORE:
            return INITIAL_STATE;
        default:
            return state;
    }
}