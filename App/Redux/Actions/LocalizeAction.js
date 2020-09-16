import { SET_TRANSLATION } from './Constants';

export const setTranslation = (language) => {
    console.log("lan",language)
    return {
        type: SET_TRANSLATION,
        language
    }
}
