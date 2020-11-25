import './Loading.css';
function Loading (){
	return (
		<div className="LoadingContainer">
			<div class="spinner-border text-danger" role="status">
				<span class="sr-only">Loading...</span>
			</div>
			<p className="mt-5">Your Request is being processed please wait . . .</p>
		</div>
	);
}
export default Loading;
