//React Router
import { useHistory } from 'react-router-dom';

//CSS
import './FooterButtons.css';

function FooterButtons ({ Next, Back, NextText }){
	const history = useHistory();
	return (
		<div className="BackNextContainer mt-4">
			<button className="btn  btn-secondary mr-1" onClick={() => history.push(`/${Back}`)}>
				Back
			</button>
			<button className="btn  btn-primary" onClick={Next}>
				{NextText ? NextText : 'Next'}
			</button>
		</div>
	);
}
export default FooterButtons;
