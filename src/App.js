import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';

//ReactStrap
import { Container } from 'reactstrap';

//Components
import Profile from './Components/Profile/Profile';
import Verify from './Components/Verify/Verify';
import Upload from './Components/Upload/Upload';
import Finish from './Components/Finish/Finish';

//CSS
import './App.css';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faCheckCircle, faImages } from '@fortawesome/free-solid-svg-icons';

//Router
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App (){
	// USE SELECTOR
	//These values will help you debug and test the app
	const {
		// user_email,
		// user_password,
		// user_password_confirmation,
		// user_full_name,
		// user_phone,
		// user_nationality,
		// user_extra_data,
		// lang,
		// company_name,
		// company_address,
		// company_phone,
		// company_business_email,
		// company_country_id,
		// company_city_id,
		// company_extra_data,
		// company_avatar,
		// user_position,
		// StepOneDone,
		// StepTwoDone,
		// StepThreeDone,
		// RegStarted,
		RegSuccess
		// RegFailed
	} = useSelector(
		state => ({
			// user_email: state.RegReducer.user_email,
			// user_password: state.RegReducer.user_password,
			// user_password_confirmation: state.RegReducer.user_password_confirmation,
			// user_full_name: state.RegReducer.user_full_name,
			// user_phone: state.RegReducer.user_phone,
			// user_nationality: state.RegReducer.user_nationality,
			// user_extra_data: state.RegReducer.user_extra_data,
			// lang: state.RegReducer.lang,
			// company_name: state.RegReducer.company_name,
			// company_address: state.RegReducer.company_address,
			// company_phone: state.RegReducer.company_phone,
			// company_business_email: state.RegReducer.company_business_email,
			// company_country_id: state.RegReducer.company_country_id,
			// company_city_id: state.RegReducer.company_city_id,
			// company_extra_data: state.RegReducer.company_extra_data,
			// company_avatar: state.RegReducer.company_avatar,
			// user_position: state.RegReducer.user_position,
			// StepOneDone: state.RegReducer.StepOneDone,
			// StepTwoDone: state.RegReducer.StepTwoDone,
			// StepThreeDone: state.RegReducer.StepThreeDone,
			// RegStarted: state.SubmitReducer.RegStarted,
			RegSuccess: state.SubmitReducer.RegSuccess
			// RegFailed: state.SubmitReducer.RegFailed
		}),
		shallowEqual
	);
	return (
		<Container className="themed-container TopContainer" fluid={true}>
			<div className="SubContainer">
				<Router>
					{!RegSuccess ? (
						<nav className="RouterNav">
							<ul className="RouterList">
								<li>
									<Link to="/" tabIndex={-1}>
										<FontAwesomeIcon style={{ color: 'lightgrey' }} icon={faUser} />
									</Link>
								</li>
								<li>
									<Link to="/verify" tabIndex={-1}>
										<FontAwesomeIcon style={{ color: 'lightgrey' }} icon={faBuilding} />
									</Link>
								</li>
								<li>
									<Link to="/upload" tabIndex={-1}>
										<FontAwesomeIcon style={{ color: 'lightgrey' }} icon={faImages} />
									</Link>
								</li>
								<li>
									<Link to="/finish" tabIndex={-1}>
										<FontAwesomeIcon style={{ color: 'lightgrey' }} icon={faCheckCircle} />
									</Link>
								</li>
							</ul>
						</nav>
					) : null}

					<Switch>
						<Route path="/upload">
							<Upload />
						</Route>
						<Route path="/verify">
							<Verify />
						</Route>
						<Route path="/finish">
							<Finish />
						</Route>
						<Route path="/">
							<Profile />
						</Route>
					</Switch>
				</Router>
			</div>
		</Container>
	);
}

export default App;
