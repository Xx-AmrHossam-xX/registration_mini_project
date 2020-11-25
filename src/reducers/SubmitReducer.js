import { submit, submission_successful, submission_failure } from '../ActionTypes/ActionTypes';

let Default = {
	RegStarted: false,
	RegSuccess: false,
	RegFailed: false
};

export default function SubmitReducer (state = Default, action){
	switch (action.type) {
		case submit:
			return {
				RegStarted: true,
				RegSuccess: false,
				RegFailed: false
			};
		case submission_successful:
			return {
				RegStarted: false,
				RegSuccess: true,
				RegFailed: false
			};
		case submission_failure:
			return {
				RegStarted: false,
				RegSuccess: false,
				RegFailed: true
			};
		default:
			return state;
	}
}
