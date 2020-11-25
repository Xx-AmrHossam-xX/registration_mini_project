import React, { useEffect, useState } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
//Actions
import { StepTwoAction } from '../../actions/StepTwo';

//CSS
import './Verify.css';

//React Router
import { useHistory } from 'react-router-dom';

//Components
import FooterButtons from '../../UIComponents/FooterButtons/FooterButtons';

//Material Imports
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

function Verify (){
	//Use Selector
	const { StepOneDone } = useSelector(
		state => ({
			StepOneDone: state.RegReducer.StepOneDone
		}),
		shallowEqual
	);
	// DISPATCH
	const dispatch = useDispatch();
	//React Router
	const history = useHistory();
	//Material
	const classes = useStyles();

	//Variables
	const [ values, setValues ] = useState({
		CompanyName: '',
		lang: 'en',
		address: '',
		BusinessEmail: '',
		country: '',
		city: '',
		CompanyPhoneNo: '',
		RepCompanyPhoneNo: ''
	});
	const [ errors, SetErrors ] = useState({
		CompanyName: false,
		lang: false,
		address: false,
		BusinessEmail: false,
		country: false,
		city: false,
		CompanyPhoneNo: false,
		RepCompanyPhoneNo: false
	});
	const [ changed, setchanged ] = useState({
		CompanyName: false,
		lang: false,
		address: false,
		BusinessEmail: false,
		country: false,
		city: false,
		CompanyPhoneNo: false,
		RepCompanyPhoneNo: false
	});
	useEffect(() => {
		if (!StepOneDone) {
			alert('Please Go back to step one and enter your data');
			history.push('/');
		}
	}, []);
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
			case 'CompanyName':
				if (val.length < 3 || !/\S/.test(val) || val.length > 15 || !/^[a-zA-Z\s]*$/.test(val)) {
					SetErrors({ ...errors, [prop]: true });
				} else {
					SetErrors({ ...errors, [prop]: false });
				}
				break;
			case 'address':
				if (val.length < 15 || !/\S/.test(val) || val.length > 30 || !/^[a-zA-Z\s]*$/.test(val)) {
					SetErrors({ ...errors, [prop]: true });
				} else {
					SetErrors({ ...errors, [prop]: false });
				}
				break;
			case 'BusinessEmail':
				if (
					!/\S/.test(val) ||
					!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						val
					)
				) {
					SetErrors({ ...errors, [prop]: true });
				} else {
					SetErrors({ ...errors, [prop]: false });
				}
				break;
			case 'country':
				if (!/\S/.test(val)) {
					SetErrors({ ...errors, [prop]: true });
				} else {
					SetErrors({ ...errors, [prop]: false });
				}
				break;
			case 'city':
				if (!/\S/.test(val)) {
					SetErrors({ ...errors, [prop]: true });
				} else {
					SetErrors({ ...errors, [prop]: false });
				}
				break;
			case 'CompanyPhoneNo':
				if (val.length < 10 || !/\S/.test(val)) {
					SetErrors({ ...errors, [prop]: true });
				} else {
					SetErrors({ ...errors, [prop]: false });
				}
				break;
			case 'RepCompanyPhoneNo':
				if (val.length < 10 || !/\S/.test(val) || val !== values.CompanyPhoneNo) {
					SetErrors({ ...errors, [prop]: true });
				} else {
					SetErrors({ ...errors, [prop]: false });
				}
				break;

			default:
				break;
		}
	};
	const Next = () => {
		if (
			errors.CompanyName ||
			errors.address ||
			errors.BusinessEmail ||
			errors.country ||
			errors.city ||
			errors.CompanyPhoneNo ||
			errors.RepCompanyPhoneNo ||
			!changed.CompanyName ||
			!changed.address ||
			!changed.BusinessEmail ||
			!changed.country ||
			!changed.city ||
			!changed.CompanyPhoneNo ||
			!changed.RepCompanyPhoneNo
		) {
			alert('Please Fill in the Form with valid data and try again');
		} else {
			dispatch(
				StepTwoAction(
					values.lang,
					values.CompanyName,
					values.address,
					values.CompanyPhoneNo,
					values.BusinessEmail,
					values.country,
					values.city,
					values.RepCompanyPhoneNo
				)
			);
			history.push('/upload');
		}
	};

	return (
		<React.Fragment>
			<h1 className="text-center mt-5 ProfileTitle">Verify your company</h1>
			<form className={classes.root} autoComplete="off">
				<div
					className={[ classes.root, 'pt-1 ', 'pb-1' ].join(' ')}
					style={{ justifyContent: 'center', backgroundColor: 'white' }}
				>
					<p>Entering this information correctly will facilitate the company verification process</p>
					<FormControl
						className={classes.margin}
						variant="outlined"
						style={{ width: '78%', margin: 5, marginRight: 0 }}
					>
						<InputLabel htmlFor="outlined-adornment-amount">COMPANY NAME</InputLabel>
						<OutlinedInput
							type="text"
							style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
							dir={values.lang === 'en' ? 'ltr' : 'rtl'}
							error={errors.CompanyName}
							required
							placeholder={values.lang === 'en' ? 'Enter your company name' : 'ادخل اسم شركتك'}
							id="outlined-adornment-amount"
							value={values.CompanyName}
							onChange={handleChange('CompanyName')}
							onBlur={handleBlur('CompanyName')}
							labelWidth={130}
						/>
						{errors.CompanyName ? (
							<FormHelperText error={errors.CompanyName} id="component-error-text">
								Min number of characters is 3
							</FormHelperText>
						) : null}
					</FormControl>
					<FormControl
						variant="outlined"
						className={classes.formControl}
						style={{ width: '18%', margin: 5, marginLeft: 0 }}
					>
						<Select
							style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }}
							error={errors.ErrCountry}
							required
							id="demo-simple-select-outlined"
							value={values.lang}
							onChange={handleChange('lang')}
							onBlur={handleBlur('lang')}
						>
							<MenuItem value={'en'}>English</MenuItem>
							<MenuItem value={'ar'}>عربى</MenuItem>
						</Select>
					</FormControl>
					<FormControl fullWidth className={classes.margin} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-amount">ِADRESS</InputLabel>
						<OutlinedInput
							error={errors.address}
							required
							type="text"
							placeholder="Enter your Adress"
							id="outlined-adornment-amount"
							value={values.address}
							onChange={handleChange('address')}
							onBlur={handleBlur('address')}
							labelWidth={65}
						/>
						{errors.address ? (
							<FormHelperText error={errors.address} id="component-error-text">
								Please Enter a proper address
							</FormHelperText>
						) : null}
					</FormControl>
					<FormControl fullWidth className={classes.margin} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-amount">BUSINESS EMAIL</InputLabel>
						<OutlinedInput
							error={errors.BusinessEmail}
							required
							type="email"
							placeholder="Enter your Business Email"
							id="outlined-adornment-amount"
							value={values.BusinessEmail}
							onChange={handleChange('BusinessEmail')}
							onBlur={handleBlur('BusinessEmail')}
							labelWidth={130}
						/>
						{errors.BusinessEmail ? (
							<FormHelperText error={errors.BusinessEmail} id="component-error-text">
								Please Enter a valid email
							</FormHelperText>
						) : null}
					</FormControl>

					<FormControl
						variant="outlined"
						className={classes.formControl}
						style={{ margin: 5 }}
						id="VerifyCountry"
					>
						<InputLabel id="demo-simple-select-outlined-label">COUNTRY</InputLabel>
						<Select
							error={errors.country}
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
						{errors.country ? (
							<FormHelperText error={errors.country} id="component-error-text">
								Please choose a country
							</FormHelperText>
						) : null}
					</FormControl>
					<FormControl
						variant="outlined"
						className={classes.formControl}
						style={{ margin: 5, marginBottom: 15 }}
						id="VerifyCity"
					>
						<InputLabel id="demo-simple-select-outlined-label">CITY</InputLabel>
						<Select
							error={errors.city}
							required
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={values.city}
							onChange={handleChange('city')}
							onBlur={handleBlur('city')}
							label="CITY"
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							<MenuItem value={'5'}>Alexandria</MenuItem>
							<MenuItem value={'6'}>Damascus</MenuItem>
							<MenuItem value={'7'}>Bagdad</MenuItem>
						</Select>
						{errors.city ? (
							<FormHelperText error={errors.city} id="component-error-text">
								Please choose a city
							</FormHelperText>
						) : null}
					</FormControl>
					<FormControl style={{ margin: -3 }} id="VerifyCompanyNo">
						<TextField
							error={errors.CompanyPhoneNo}
							required
							value={values.mobile}
							onChange={handleChange('CompanyPhoneNo')}
							onBlur={handleBlur('CompanyPhoneNo')}
							type="number"
							label="COMPANY PHONE NUMBER"
							placeholder="Enter your company phone number"
							id="outlined-start-adornment"
							className={clsx(classes.margin, classes.textField)}
							InputProps={{
								startAdornment: <InputAdornment position="start">+20</InputAdornment>
							}}
							variant="outlined"
						/>
						{errors.CompanyPhoneNo ? (
							<FormHelperText
								error={errors.CompanyPhoneNo}
								id="component-error-text"
								style={{ marginTop: -3, marginLeft: 10 }}
							>
								Please enter a valid phone number without the country code
							</FormHelperText>
						) : null}
					</FormControl>
					<FormControl style={{ margin: -3 }} id="VerifyRepeatedCompanyNo">
						<TextField
							error={errors.RepCompanyPhoneNo}
							required
							value={values.RepCompanyPhoneNo}
							onChange={handleChange('RepCompanyPhoneNo')}
							onBlur={handleBlur('RepCompanyPhoneNo')}
							type="number"
							label="COMPANY PHONE NUMBER"
							placeholder="Enter your company phone number"
							id="outlined-start-adornment"
							className={clsx(classes.margin, classes.textField)}
							InputProps={{
								startAdornment: <InputAdornment position="start">+20</InputAdornment>
							}}
							variant="outlined"
						/>
						{errors.RepCompanyPhoneNo ? (
							<FormHelperText
								error={errors.RepCompanyPhoneNo}
								id="component-error-text"
								style={{ marginTop: -3, marginLeft: 10 }}
							>
								Please repeat the exact company phone number
							</FormHelperText>
						) : null}
					</FormControl>
				</div>
			</form>
			<FooterButtons Next={Next} Back="" />
		</React.Fragment>
	);
}
export default Verify;
