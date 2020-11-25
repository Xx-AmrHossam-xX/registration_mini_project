import { step_one } from '../ActionTypes/ActionTypes';

export const StepOneAction = (email, password, passRepeated, name, phone, nationality, extraPhone) => dispatch => {
	dispatch({
		type: step_one,
		email,
		password,
		passRepeated,
		name,
		phone,
		nationality,
		extraPhone
	});
};
