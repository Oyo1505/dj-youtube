import React from 'react';

export default class AudioController extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="ranges-volumes">
					<input type="range" className="volume-range-input" min="0" max="100" value="75"/>
					<h5>Youtube dj</h5>
					<input type="range" className="volume-range-input" min="0" max="100" value="75"/>
				</div>
				<div className="range-crossfader">
					<input type="range" className="crossfader" min="0" max="100" value="50"/>
				</div>
			</div>
		);
	}
}
