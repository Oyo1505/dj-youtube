import React from 'react';

export default class AudioController extends React.Component {

	constructor(props) {
		super(props);
	//this.state = ({volumeRight:0});

	}
	handleVolume = (event) => {
		let level = parseFloat(event.target.value);
		let turntable = event.target.name;
		this.props.volume(level, turntable)
	}
	render() {
		return (
			<div>
				<div className="ranges-volumes">
					<div className="volume-slider" ><i className="icon icon-volume"></i><input type="range" name="volumeLeft" onChange={this.handleVolume} className="volume-range-input"  step="any" min="0" max="1" defaultValue="0.75"/></div>
					<h5>YouTube <br /> DJ</h5>
					<div className="volume-slider" ><input type="range" className="volume-range-input" name="volumeRight" onChange={this.handleVolume}  className="volume-range-input" step="any" min="0" max="1" defaultValue="0.75"/><i className="icon icon-volume"></i></div>
				</div>
				<div className="range-crossfader">
					<input type="range" className="crossfader" min="0" max="100" defaultValue="50"/>
				</div>
			</div>
		);
	}
}
