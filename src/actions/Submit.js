import { submit, submission_successful, submission_failure } from '../ActionTypes/ActionTypes';

export const SubmitAction = (
	user_email,
	user_password,
	user_password_confirmation,
	user_full_name,
	user_phone,
	user_nationality,
	user_extra_data,
	lang,
	company_name,
	company_address,
	company_phone,
	company_business_email,
	company_country_id,
	company_city_id,
	company_extra_data,
	user_position
) => dispatch => {
	dispatch({
		type: submit
	});
	var axios = require('axios');
	var FormData = require('form-data');
	var data = new FormData();
	data.append('user_email', user_email);
	data.append('user_password', user_password);
	data.append('user_password_confirmation', user_password_confirmation);
	data.append('user_full_name', user_full_name);
	data.append('user_phone', user_phone);
	data.append('user_nationality', user_nationality);
	data.append('user_extra_data[phone]', user_extra_data);

	data.append('lang', lang);
	data.append('company_name', company_name);
	data.append('company_address', company_address);
	data.append('company_phone', company_phone);
	data.append('company_business_email', company_business_email);
	data.append('company_country_id', company_country_id);
	data.append('company_city_id', company_city_id);
	data.append('company_extra_data[phone]', company_extra_data);

	// ** Image step will be postponed **

	// data.append('company_avatar', fs.createReadStream('/home/abdo/Pictures/Screenshot from 2020-08-16 14-22-54.png'));
	data.append('user_position', user_position);
	var config = {
		method: 'post',
		url: 'https://id.safav2.io.safavisa.com/register',
		data: data
	};
	axios(config)
		.then(function (response){
			// console.log(JSON.stringify(response.data));
			dispatch({
				type: submission_successful
			});
		})
		.catch(function (error){
			dispatch({
				type: submission_failure
			});
			// console.log(error);
		});
};
