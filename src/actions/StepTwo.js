import { step_two } from '../ActionTypes/ActionTypes';

export const StepTwoAction = (lang, Cname, Caddress, Cphone, Cemail, Ccountry, Ccity, CextraPhone) => dispatch => {
	dispatch({
		type: step_two,
		lang,
		Cname,
		Caddress,
		Cphone,
		Cemail,
		Ccountry,
		Ccity,
		CextraPhone
	});
};
