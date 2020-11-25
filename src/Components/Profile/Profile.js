import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

//ACTIONS
import { StepOneAction } from '../../actions/StepOne';

//CSS
import './Profile.css';

//Material
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

//React Router
import { useHistory } from 'react-router-dom';

//Material
const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	margin: {
		margin: theme.spacing(1)
	},
	withoutLabel: {
		marginTop: theme.spacing(3)
	}
}));

function Profile (){
	// DISPATCH
	const dispatch = useDispatch();
	//React Router
	const history = useHistory();
	//Material
	const classes = useStyles();
	//Variables
	const [ values, setValues ] = useState({
		country: '',
		mobile: '',
		name: '',
		email: '',
		password: '',
		RepPassword: '',
		showPassword: false,
		ShowRepeatPassword: false
	});
	const [ errors, SetErrors ] = useState({
		ErrCountry: false,
		ErrMobile: false,
		ErrName: false,
		ErrEmail: false,
		ErrPassword: false,
		ErrRepPassword: false
	});
	const [ changed, setchanged ] = useState({
		country: false,
		mobile: false,
		name: false,
		email: false,
		password: false,
		RepPassword: false
	});

	const handleChange = prop => event => {
		setValues({ ...values, [prop]: event.target.value });
		setchanged({ ...changed, [prop]: true });
	};
	const handleBlur = prop => event => {
		const val = event.target.value;
		Validate(prop, val);
	};
	const Validate = (prop, val) => {
		switch (prop) {
			case 'name':
				if (val.length < 3 || !/\S/.test(val) || val.length > 15 || !/^[a-zA-Z\s]*$/.test(val)) {
					SetErrors({ ...errors, ErrName: true });
				} else {
					SetErrors({ ...errors, ErrName: false });
				}
				break;
			case 'mobile':
				if (val.length < 10 || !/\S/.test(val) || val.length > 12) {
					SetErrors({ ...errors, ErrMobile: true });
				} else {
					SetErrors({ ...errors, ErrMobile: false });
				}
				break;
			case 'country':
				if (!/\S/.test(val)) {
					SetErrors({ ...errors, ErrCountry: true });
				} else {
					SetErrors({ ...errors, ErrCountry: false });
				}
				break;
			case 'email':
				if (
					!/\S/.test(val) ||
					!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						val
					)
				) {
					SetErrors({ ...errors, ErrEmail: true });
				} else {
					SetErrors({ ...errors, ErrEmail: false });
				}
				break;
			case 'password':
				if (!/\S/.test(val) || val.length < 8 || val.length > 14) {
					SetErrors({ ...errors, ErrPassword: true });
				} else {
					SetErrors({ ...errors, ErrPassword: false });
				}
				break;
			case 'RepPassword':
				if (!/\S/.test(val) || val.length < 8 || val !== values.password || val.length > 14) {
					SetErrors({ ...errors, ErrRepPassword: true });
				} else {
					SetErrors({ ...errors, ErrRepPassword: false });
				}
				break;
			default:
				break;
		}
	};
	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};
	const handleClickRepeatShowPassword = () => {
		setValues({ ...values, ShowRepeatPassword: !values.ShowRepeatPassword });
	};

	const handleMouseDownPassword = event => {
		event.preventDefault();
	};
	const Next = () => {
		if (
			errors.ErrCountry ||
			errors.ErrEmail ||
			errors.ErrMobile ||
			errors.ErrName ||
			errors.ErrPassword ||
			errors.ErrRepPassword ||
			!changed.country ||
			!changed.email ||
			!changed.mobile ||
			!changed.name ||
			!changed.password ||
			!changed.RepPassword
		) {
			alert('Please Fill in the Form with valid data and try again');
		} else {
			dispatch(
				StepOneAction(
					values.email,
					values.password,
					values.RepPassword,
					values.name,
					values.mobile,
					values.country,
					values.mobile
				)
			);
			history.push('/verify');
		}
	};

	return (
		<React.Fragment>
			<h1 className="text-center mt-5 ProfileTitle">Tell us more about you</h1>
			<form className={classes.root} autoComplete="off" id="Profile">
				<div className={classes.root} style={{ justifyContent: 'center', backgroundColor: 'white' }}>
					<FormControl fullWidth className={classes.margin} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-amount">FULL NAME</InputLabel>
						<OutlinedInput
							type="text"
							error={errors.ErrName}
							required
							placeholder="Enter your full name"
							id="outlined-adornment-amount"
							value={values.name}
							onChange={handleChange('name')}
							onBlur={handleBlur('name')}
							labelWidth={90}
						/>
						{errors.ErrName ? (
							<FormHelperText error={errors.ErrName} id="component-error-text">
								Min number of characters is 3
							</FormHelperText>
						) : null}
					</FormControl>
					<FormControl fullWidth className={classes.margin} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-amount">BUSINESS EMAIL</InputLabel>
						<OutlinedInput
							error={errors.ErrEmail}
							required
							type="email"
							placeholder="Enter your Business Email"
							id="outlined-adornment-amount"
							value={values.email}
							onChange={handleChange('email')}
							onBlur={handleBlur('email')}
							labelWidth={130}
						/>
						{errors.ErrEmail ? (
							<FormHelperText error={errors.ErrEmail} id="component-error-text">
								Please Enter a valid email
							</FormHelperText>
						) : null}
					</FormControl>

					<FormControl
						variant="outlined"
						className={classes.formControl}
						style={{ margin: 5 }}
						id="ProfileCountry"
					>
						<InputLabel id="demo-simple-select-outlined-label">COUNTRY</InputLabel>
						<Select
							error={errors.ErrCountry}
							required
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={values.country}
							onChange={handleChange('country')}
							onBlur={handleBlur('country')}
							label="COUNTRY"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={'20'}>Egypt</MenuItem>
							<MenuItem value={'30'}>Syria</MenuItem>
							<MenuItem value={'40'}>Iraq</MenuItem>
						</Select>
						{errors.ErrCountry ? (
							<FormHelperText error={errors.ErrCountry} id="component-error-text">
								Please choose a country
							</FormHelperText>
						) : null}
					</FormControl>
					<FormControl style={{ margin: -3 }} id="ProfileMobile">
						<TextField
							error={errors.ErrMobile}
							required
							value={values.mobile}
							onChange={handleChange('mobile')}
							onBlur={handleBlur('mobile')}
							type="number"
							label="PHONE NUMBER"
							placeholder="Enter your phone number"
							id="outlined-start-adornment"
							className={clsx(classes.margin, classes.textField)}
							InputProps={{
								startAdornment: <InputAdornment position="start">+20</InputAdornment>
							}}
							variant="outlined"
						/>
						{errors.ErrMobile ? (
							<FormHelperText
								error={errors.ErrMobile}
								id="component-error-text"
								style={{ marginTop: -3, marginLeft: 10 }}
							>
								Please enter a valid phone number without the country code
							</FormHelperText>
						) : null}
					</FormControl>
					<FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">PASSWORD</InputLabel>
						<OutlinedInput
							error={errors.ErrPassword}
							required
							id="outlined-adornment-password"
							type={values.showPassword ? 'text' : 'password'}
							placeholder="Choose a password"
							value={values.password}
							onChange={handleChange('password')}
							onBlur={handleBlur('password')}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{values.showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
							labelWidth={90}
						/>
						{errors.ErrPassword ? (
							<FormHelperText error={errors.ErrPassword} id="component-error-text">
								Please enter a password between 8 and 14 characters
							</FormHelperText>
						) : null}
					</FormControl>

					<FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">REPEAT PASSWORD</InputLabel>
						<OutlinedInput
							error={errors.ErrRepPassword}
							required
							id="outlined-adornment-password"
							type={values.ShowRepeatPassword ? 'text' : 'password'}
							placeholder="Repeat your password"
							value={values.RepPassword}
							onChange={handleChange('RepPassword')}
							onBlur={handleBlur('RepPassword')}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickRepeatShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{values.showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
							labelWidth={150}
						/>
						{errors.ErrRepPassword ? (
							<FormHelperText error={errors.ErrRepPassword} id="component-error-text">
								Please enter a matching password
							</FormHelperText>
						) : null}
					</FormControl>
				</div>
			</form>
			<div className="PrevNextContainer mt-4">
				<span>Back to login</span>
				<button className="btn  btn-primary" onClick={Next}>
					Next
				</button>
			</div>
		</React.Fragment>
	);
}
export default Profile;
