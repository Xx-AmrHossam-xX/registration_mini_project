import React, { useState, useEffect } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
//Actions
import { SubmitAction } from '../../actions/Submit';
//Images
import MailBox from '../../Assets/Images/MailBox.jpg';
//CSS
import './Finish.css';
//React Router
import { useHistory } from 'react-router-dom';
//Components
import FooterButtons from '../../UIComponents/FooterButtons/FooterButtons';
import Background from '../../UIComponents/Background/Background';
import Loading from '../../UIComponents/Loading/Loading';

function Finish (){
	//React Router
	const history = useHistory();
	//Use Selector
	const {
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
		company_avatar,
		user_position,
		StepOneDone,
		StepTwoDone,
		RegStarted,
		RegSuccess,
		RegFailed
	} = useSelector(
		state => ({
			user_email: state.RegReducer.user_email,
			user_password: state.RegReducer.user_password,
			user_password_confirmation: state.RegReducer.user_password_confirmation,
			user_full_name: state.RegReducer.user_full_name,
			user_phone: state.RegReducer.user_phone,
			user_nationality: state.RegReducer.user_nationality,
			user_extra_data: state.RegReducer.user_extra_data,
			lang: state.RegReducer.lang,
			company_name: state.RegReducer.company_name,
			company_address: state.RegReducer.company_address,
			company_phone: state.RegReducer.company_phone,
			company_business_email: state.RegReducer.company_business_email,
			company_country_id: state.RegReducer.company_country_id,
			company_city_id: state.RegReducer.company_city_id,
			company_extra_data: state.RegReducer.company_extra_data,
			company_avatar: state.RegReducer.company_avatar,
			user_position: state.RegReducer.user_position,
			StepOneDone: state.RegReducer.StepOneDone,
			StepTwoDone: state.RegReducer.StepTwoDone,
			RegStarted: state.SubmitReducer.RegStarted,
			RegSuccess: state.SubmitReducer.RegSuccess,
			RegFailed: state.SubmitReducer.RegFailed
		}),
		shallowEqual
	);
	// DISPATCH
	const dispatch = useDispatch();
	useEffect(() => {
		if (!StepOneDone) {
			alert('Please Go back to step one and enter your data');
			history.push('/');
		} else if (!StepTwoDone) {
			alert('Please Go back to step two and enter your data');
			history.push('/verify');
		}
	}, []);
	useEffect(
		() => {
			if (RegFailed) {
				alert('Something went wrong please try again');
			}
		},
		[ RegFailed ]
	);

	const confirm = () => {
		dispatch(
			SubmitAction(
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
				company_avatar,
				user_position
			)
		);
	};
	if (!RegSuccess) {
		return (
			<React.Fragment>
				{RegStarted ? <Loading /> : null}
				<Background title="You're all set. Ready?">
					<img src={MailBox} alt="A mailbox" className="MailBoxImage" />
					<p className="FinishMainParagraph">We will send a message for this e-mail</p>
					<p className="text-center">{user_email}</p>
				</Background>
				<FooterButtons Next={confirm} NextText="Confirm" Back="upload" />
			</React.Fragment>
		);
	} else if (RegSuccess) {
		return (
			<div className="SuccessContainer">
				{RegStarted ? <Loading /> : null}
				<Background>
					<img src={MailBox} alt="A mailbox" className="mt-5 MailBoxImageSuccess" />
					<p className="mt-2">Congratz,you successfully created your account</p>
					<p>We just sent you a confirmation email</p>
					<p>Please check your E-mail</p>
					<p className="mt-5">Didn't receive it ?</p>
					<p className="ResendPar mb-3">
						Check your spam folder or <span onClick={confirm}>Resend Email</span>
					</p>
				</Background>
			</div>
		);
	}
}

export default Finish;
