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
	back = (event) => {
		console.log(event.key)
		let fiveSeconds = -5;

		//this.props.backfoward(fiveSeconds);
	}

	render() {
		return (
			<div className="pads">
				<div className="pads-buttons">
					<button className="btn-pads icon-pads" >Loop<br/>i<span className="tiny-letters"  onKeyPress={this.back} >{this.props.pads[1].toUpperCase()}</span>n</button>
					<button className="btn-pads icon-pads" >Loop<br/>out<span className="tiny-letters"  onKeyPress={this.back} >{this.props.pads[2].toUpperCase()}</span></button>
					<button className="btn-pads icon-pads" onClick={this.foward} ><i className="icon icon-fast-foward"></i><span className="tiny-letters"  onKeyPress={this.back} >5 sec</span></button>
					<button className="btn-pads icon-pads" onClick={this.toggle} ><i className={this.props.canPlay ? 'icon icon-pause-dj' : 'icon icon-play-dj'}></i><span className="tiny-letters"  onKeyPress={this.back} >{this.props.pads[0].toUpperCase()}</span></button>
				</div>
				<div className="pads-buttons">
					<button className="btn-pads letters-pads" >{this.props.pads[3].toUpperCase()}</button>
					<button className="btn-pads letters-pads" >{this.props.pads[4].toUpperCase()}</button>
					<button className="btn-pads letters-pads" >{this.props.pads[5].toUpperCase()}</button>
					<button className="btn-pads letters-pads" >{this.props.pads[6].toUpperCase()}</button>
				</div>
			</div>
		);
	}
}
export default Pads