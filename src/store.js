import { createStore } from 'redux';
import contactReducer from './reducers/contactReducer.js';

const store = createStore(contactReducer);

export default store;
