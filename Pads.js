import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';

 class Pads extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toggle : false,
		}
	}

	toggle = () => {

		this.setState({toggle: !this.state.toggle})
		
		this.props.action(this.state.toggle)
	}

	onClicktoggle = (event) => {
		console.log(event)
		this.setState({toggle: !this.state.toggle})
		
		this.props.action(!this.state.toggle)
	}
	back = (event) => {
		
		let fiveSeconds = -5;

		//this.props.backfoward(fiveSeconds);
	}

	render() {
		const touchesPad = this.props.pads;

		return (
			<div className="pads">
							<KeyboardEventHandler
				    handleKeys={['alphabetic']}
				    onKeyEvent={(key, e) =>{
				    		switch (key) {
				    			case touchesPad[0]:	
				    			console.log(`je suis dans le  ${key}`);
				    			return this.toggle();
				    			break;
				    			case touchesPad[1]:
				    			console.log(`je suis dans le  ${key}`);
				    			break;
				    			
				    		}
				    	}}
				    >
				</KeyboardEventHandler>
				<div className="pads-buttons">
					<button className="btn-pads icon-pads" >Loop<br/>i<span className="tiny-letters"  >{this.props.pads[1].toUpperCase()}</span>n</button>
					<button className="btn-pads icon-pads" >Loop<br/>out<span className="tiny-letters"  >{this.props.pads[2].toUpperCase()}</span></button>
					<button className="btn-pads icon-pads" onClick={this.foward} ><i className="icon icon-fast-foward"></i><span className="tiny-letters">5 sec</span></button>
					<p className="btn-pads icon-pads" onMouseDown={this.onClicktoggle} ><i className={this.props.canPlay ? 'icon icon-pause-dj' : 'icon icon-play-dj'}></i><span className="tiny-letters">{this.props.pads[0].toUpperCase()}</span></p>
				</div>
				
				<div className="pads-buttons">

					<p className="btn-pads letters-pads" onKeyPress={this.back} >{this.props.pads[3].toUpperCase()}</p>
					<p className="btn-pads letters-pads" >{this.props.pads[4].toUpperCase()}</p>
					<p className="btn-pads letters-pads" >{this.props.pads[5].toUpperCase()}</p>
					<p className="btn-pads letters-pads" >{this.props.pads[6].toUpperCase()}</p>
				</div>
				  
			</div>
		);
	}
}
export default Pads;

/*		 <KeyboardEventHandler
				    handleKeys={touchesPad}
				    onKeyEvent={(key, e) =>{
				    		switch (key) {
				    			case touchesPad[0]:
				    				 this.setState({toggle:!this.state.toggle});
				    			console.log(`je suis dans le  ${touchesPad[0]}`);
				    			break;
				    			case touchesPad[1]:
				    			console.log(`je suis dans le  ${touchesPad[1]}`);
				    			break;
				    			case touchesPad[2]:
				    			console.log(`je suis dans le  ${touchesPad[2]}`);
				    			break;
				    			case touchesPad[3]:
				    			console.log(`je suis dans le  ${touchesPad[3]}`);
				    			break;
				    			case touchesPad[4]:
				    			console.log(`je suis dans le  ${touchesPad[4]}`);
				    			break;
				    			case touchesPad[5]:
				    			console.log(`je suis dans le  ${touchesPad[5]}`);
				    			break;
				    			case touchesPad[6]:
				    			console.log(`je suis dans le  ${touchesPad[6]}`);
				    			break;
				    			default: 
							    console.log("unknown category");
							    break;
				    		}
				    		/*if(key === touchesPad[0]){
				    			 this.setState({toggle:!this.state.toggle});
				    			console.log(e)
				    		}
				    	}}
				    >
					</KeyboardEventHandler>*/