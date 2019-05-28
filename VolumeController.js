import React from 'react';

export default class AudioController extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="ranges-volumes">
					<div className="volume-slider" ><i className="icon icon-volume"></i><input type="range" className="volume-range-input" min="0" max="100" value="75"/></div>
					<h5>YouTube <br /> DJ</h5>
					<div className="volume-slider" ><input type="range" className="volume-range-input" min="0" max="100" defaultValue="75"/><i className="icon icon-volume"></i></div>
				</div>
				<div className="range-crossfader">
					<input type="range" className="crossfader" min="0" max="100" defaultValue="50"/>
				</div>
			</div>
		);
	}
}
