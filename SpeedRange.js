import React from 'react';

class SpeedRange extends React.Component {


	constructor(props) {
		super(props);
		this.state = { speed: 1 }
	}
	handleSpeed = (event) => {
		this.setState({speed: event.target.value})
	}
	render() {
		return (
			<div className="range-speed-containter">
				<div className="slider-vertical">
					<input className="range-speed" onChange={this.handleSpeed} type="range" value={this.state.speed} step='0.25' min="0.25"  max="2" /><p className="speed-p">Speed</p>
				</div>
			</div>
		);
	}
}
export default  SpeedRange;