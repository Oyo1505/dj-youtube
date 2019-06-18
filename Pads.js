import React from 'react';

 class Pads extends React.Component {
	constructor(props) {
		super(props);
		this.state = {toggle : false}
}

	toggle = () => {
		this.setState({toggle: !this.state.toggle})
		this.props.action(!this.state.toggle)
	}

	render() {
		return (
			<div className="pads">
				<div className="pads-buttons">
					<button className="btn-pads icon-pads" >Loop<br/>in</button>
					<button className="btn-pads icon-pads" >Loop<br/>out</button>
					<button className="btn-pads icon-pads" ><i className="icon icon-fast-foward"></i></button>
					<button className="btn-pads icon-pads" onClick={this.toggle} ><i className={this.state.toggle ? 'icon icon-pause-dj' : 'icon icon-play-dj'}></i></button>
				</div>
				<div className="pads-buttons">
					<button className="btn-pads letters-pads" >Q</button>
					<button className="btn-pads letters-pads" >S</button>
					<button className="btn-pads letters-pads" >D</button>
					<button className="btn-pads letters-pads" onClick={this.toggle}  >F</button>
				</div>
			</div>
		);
	}
}
export default Pads