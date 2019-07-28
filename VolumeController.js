import React from 'react';

export default class AudioController extends React.Component {

	constructor(props) {
		super(props);
	this.state = ({volumeRight:1,
					volumeLeft:1,
					valueLeft:0.75,
					valueRight:0.75
					});

	}
	handleVolume = (event) => {
		let level = parseFloat(event.target.value);
		let turntable = event.target.name;
		this.props.volume(level, turntable);
		
		if(event.target.name === "volumeRight"){
			this.setState({valueRight:event.target.value });
		}else if (event.target.name === "volumeLeft"){
			this.setState({valueLeft:event.target.value });
		}
	}

	getValueCrossfader= (event) =>{
		this.props.crossfader(event.target.value);
	}
	render() {

		return (
			<div>
				<div className="ranges-volumes">
					<div className="volume-slider" >
						<i className="icon icon-volume"></i>
						<input 
							type="range" 
							name="volumeLeft" 
							onChange={this.handleVolume} 
							className="volume-range-input"  
							step="any" 
							min="0" 
							max="1"  
							value={this.state.valueLeft}/>
					</div>
					<h5>YouTube <br /> DJ</h5>
					<div className="volume-slider" >
						<input 
							type="range" 
							className="volume-range-input" 
							name="volumeRight" 
							onChange={this.handleVolume}  
							className="volume-range-input" 
							step="any"
						    min="0" 
						    max="1" 
						    value={this.state.valueRight}/>
						    <i className="icon icon-volume"></i>
					</div>
				</div>
				<div className="range-crossfader">
					<input type="range" className="crossfader" onChange={this.getValueCrossfader} min="0" max="100" defaultValue="50"/>
				</div>
			</div>
		);
	}
}
