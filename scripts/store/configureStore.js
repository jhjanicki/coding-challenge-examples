import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import DataReducer from '../reducers/dataReducers';

export default function configureStore(initialState) {
    return createStore(
        DataReducer,
        initialState,
        applyMiddleware(thunk)
    );
}
