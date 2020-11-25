import { combineReducers } from 'redux';
import RegReducer from './RegReducer';
import SubmitReducer from './SubmitReducer';

export default combineReducers({
	RegReducer,
	SubmitReducer
});
