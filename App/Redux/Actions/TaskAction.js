import { SET_TASKS } from './Constants';

export const setTasks = (data) => {
    return {
        type: SET_TASKS,
        taskData: data
    }
}
