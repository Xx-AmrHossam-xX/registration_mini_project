import React, { useState, useEffect } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
//Actions
import { StepThreeAction } from '../../actions/StepThree';
//CSS
import './Upload.css';
//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faImage } from '@fortawesome/free-solid-svg-icons';

//React Router
import { useHistory } from 'react-router-dom';
//Components
import FooterButtons from '../../UIComponents/FooterButtons/FooterButtons';
import Background from '../../UIComponents/Background/Background';
function Upload (){
	//Use Selector
	const { StepOneDone, StepTwoDone } = useSelector(
		state => ({
			StepOneDone: state.RegReducer.StepOneDone,
			StepTwoDone: state.RegReducer.StepTwoDone
		}),
		shallowEqual
	);
	// DISPATCH
	const dispatch = useDispatch();
	const [ image, setimage ] = useState();
	//React Router
	const history = useHistory();

	useEffect(() => {
		if (!StepOneDone) {
			alert('Please Go back to step one and enter your data');
			history.push('/');
		} else if (!StepTwoDone) {
			alert('Please Go back to step two and enter your data');
			history.push('/verify');
		}
	}, []);
	const Next = () => {
		if (image) {
			dispatch(StepThreeAction(image));
		}
		history.push('/finish');
	};
	const onFileChange = async e => {
		if (e.target.files && e.target.files.length > 0) {
			const imageDataUrl = await readFile(e.target.files[0]);
			setimage(imageDataUrl);
		}
	};
	const readFile = file => {
		return new Promise(resolve => {
			const reader = new FileReader();
			reader.addEventListener('load', () => resolve(reader.result), false);
			reader.readAsDataURL(file);
		});
	};
	return (
		<React.Fragment>
			<Background title="Upload Company Logo">
				<div className="ml-auto mr-auto ImageContainer ">
					<FontAwesomeIcon style={{ color: '#FF5F59' }} icon={faPlusCircle} className="Plusicon" />
					<FontAwesomeIcon style={{ color: 'grey' }} icon={faImage} className="ImageIcon" />
					<input type="file" className="Inputimage" accept=".jpg, .jpeg, .png" onChange={onFileChange} />
				</div>

				<p className="mt-1 text-center">Only images with a size lower than 500 KB are allowed</p>
			</Background>
			<FooterButtons Next={Next} Back="verify" />
		</React.Fragment>
	);
}
export default Upload;
