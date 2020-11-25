import { step_three } from '../ActionTypes/ActionTypes';

export const StepThreeAction = img => dispatch => {
	dispatch({
		type: step_three,
		img
	});
};
