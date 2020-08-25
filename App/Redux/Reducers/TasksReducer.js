import { SET_TASKS, RESET_STORE } from '../Actions/Constants';

const INITIAL_STATE = {}


export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SET_TASKS:
            return action.taskData;

        case RESET_STORE:
            return {};

        default:
            return state || [];
    }
}
