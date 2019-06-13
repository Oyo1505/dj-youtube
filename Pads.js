import React from 'react';

 class Pads extends React.Component {
	constructor(props) {
		super(props);
		this.sate = {toggle : false}
}

	toggle = () => {
		this.setState({toggle:!this.state.toggle})
	}

	render() {
		return (
			<div className="pads">
				<div className="pads-buttons">
					<button className="btn-pads icon-pads" >Rewind</button>
					<button className="btn-pads icon-pads" >Forward</button>
					<button className="btn-pads icon-pads" >Stop</button>
					<button className="btn-pads icon-pads" >Play</button>
				</div>
				<div className="pads-buttons">
					<button className="btn-pads letters-pads" >Q</button>
					<button className="btn-pads letters-pads" >S</button>
					<button className="btn-pads letters-pads" >D</button>
					<button className="btn-pads letters-pads" >F</button>
				</div>
			</div>
		);
	}
}
export default Pads