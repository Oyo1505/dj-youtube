import React from 'react';

class SpeedRange extends React.Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="range-speed-containter">
				<div className="slider-vertical">
					<input className="range-speed" type="range" defaultValue="1" min="0.5" max="2" /><p className="speed-p">Speed</p>
				</div>
			</div>
		);
	}
}
export default  SpeedRange;