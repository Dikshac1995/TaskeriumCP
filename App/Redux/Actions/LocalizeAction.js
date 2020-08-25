import { SET_TRANSLATION } from './Constants';

export const setTranslation = (language) => {
    return {
        type: SET_TRANSLATION,
        language
    }
}
