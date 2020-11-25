import React from 'react';
//CSS
import './Background.css';

function Background ({ title, children }){
	return (
		<React.Fragment>
			{title ? <h1 className="text-center mt-5 BackgroundTitle">{title}</h1> : null}
			<div className="Container" id={!title ? 'Success' : null}>
				{children}
			</div>
		</React.Fragment>
	);
}
export default Background;
