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

			</div>
		);
	}
}
export default Pads