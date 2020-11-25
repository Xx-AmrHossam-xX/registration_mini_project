import { step_one, step_two, step_three } from '../ActionTypes/ActionTypes';

let Default = {
	user_email: '',
	user_password: '',
	user_password_confirmation: '',
	user_full_name: '',
	user_phone: '',
	user_nationality: '',
	user_extra_data: '',
	lang: 'en',
	company_name: '',
	company_address: '',
	company_phone: '',
	company_business_email: '',
	company_country_id: '',
	company_city_id: '',
	company_extra_data: '',
	company_avatar: '',
	user_position: 'A front-end developer',
	StepOneDone: false,
	StepTwoDone: false,
	StepThreeDone: false,
	RegSuccess: false
};

export default function RegReducer (state = Default, action){
	switch (action.type) {
		case step_one:
			return {
				...state,
				user_email: action.email,
				user_password: action.password,
				user_password_confirmation: action.passRepeated,
				user_full_name: action.name,
				user_phone: action.phone,
				user_nationality: action.nationality,
				user_extra_data: action.extraPhone,
				StepOneDone: true
			};
		case step_two:
			return {
				...state,
				lang: action.lang,
				company_name: action.Cname,
				company_address: action.Caddress,
				company_phone: action.Cphone,
				company_business_email: action.Cemail,
				company_country_id: action.Ccountry,
				company_city_id: action.Ccity,
				company_extra_data: action.CextraPhone,
				StepTwoDone: true
			};
		case step_three:
			return {
				...state,
				company_avatar: action.img,
				StepThreeDone: true
			};
		default:
			return state;
	}
}
