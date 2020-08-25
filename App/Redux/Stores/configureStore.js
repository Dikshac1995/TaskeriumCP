import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { globals } from '../../Config';

import LoginReducer from '../Reducers/LoginReducer';
import LocalizeReducer from '../Reducers/LocalizeReducer';
import TaskReducer from '../Reducers/TasksReducer'



const logger = createLogger({
    predicate: (getState, action) => !globals.live ? __DEV__ : false,
    collapsed: true
});

export default (initialState = {}) => (
    createStore(
        combineReducers({
            loginData: LoginReducer,
            localize: LocalizeReducer,
            tasks: TaskReducer,
        }),
        initialState,
        applyMiddleware(thunk, logger)
    )
);