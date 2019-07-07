import React from 'react';

class SpeedRange extends React.Component {


	constructor(props) {
		super(props);
		this.state = { speed: 1 }
	}
	handleSpeed = (event) => {
		let speed = parseFloat(event.target.value)
		this.props.playbackrate(speed);
	}
	
	render() {
		return (
			<div className="range-speed-containter">
				<div className="slider-vertical">
					<input className="range-speed"  onChange={this.handleSpeed} type="range" defaultValue="1" step='0.25' min="0.25"  max="2" /><p className="speed-p">Speed {this.props.speed} X </p>
				</div>
			</div>
		);
	}
}
export default  SpeedRange;