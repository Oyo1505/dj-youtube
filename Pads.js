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
		this.setState({toggle: !this.state.toggle})
		this.props.action(this.state.toggle)
	}
	backward = () => {
		this.props.backward();
	}

	onKeyEventPads = (key) => {
		this.props.getTouchPad(key);
	}

	onKeyEventLoopIn = () => {
		this.props.handleTouchLoopIn();
	}

	onKeyEventLoopOut = () => {
		this.props.handleTouchLoopOut();
	}
	render() {
		const touchesPad = this.props.pads;
		
		return (
			<div className="pads">
							<KeyboardEventHandler
				    handleKeys={['alphabetic']}
				    onKeyEvent={(key) =>{
				    	
				    		switch (key) {
				    			case touchesPad[0]:	
				    			return this.toggle();
				    			break;
				    			case touchesPad[1]:
				    			return this.onKeyEventLoopIn();
				    			break;
				    			case touchesPad[2]:
				    			return this.onKeyEventLoopOut();
				    			break;
				    			case touchesPad[3]:
				    			return this.onKeyEventPads(touchesPad[3]);
				    			break;
				    			case touchesPad[4]:
				    			return this.onKeyEventPads(touchesPad[4]);
				    			break;
				    			case touchesPad[5]:
				    			return this.onKeyEventPads(touchesPad[5]);
				    			break;
				    			case touchesPad[6]:
				    			return this.onKeyEventPads(touchesPad[6]);
				    			break;
				    			
				    		}
				    	}}
				    >
				</KeyboardEventHandler>
				<div className="pads-buttons">
					<button className="btn-pads"   style={{backgroundColor: this.props.toggleLoopIn ? "#32CD32" : "#6999a1" , visibility : this.props.looping ?  "hidden" : "visible"}}>Loop<br/>i<span className="tiny-letters"  >{this.props.pads[1].toUpperCase()}</span>n</button>
					<button className="btn-pads"  style={{backgroundColor : this.props.looping ? "red" : "#6999a1" }}>Loop<br/>out<span className="tiny-letters"  >{this.props.pads[2].toUpperCase()}</span></button>		
					<button className="btn-pads icon-pads" onClick={this.backward} ><i className="icon icon-fast-foward"></i><span className="tiny-letters">5 sec</span></button>					
					<button className="btn-pads icon-pads" onClick={this.onClicktoggle} ><i className={this.props.canPlay ? 'icon icon-pause-dj' : 'icon icon-play-dj'}></i><span className="tiny-letters">{this.props.pads[0].toUpperCase()}</span></button>
				</div>
				
				<div className="pads-buttons">

					<p className="btn-pads letters-pads" onClick={(key)=>this.onKeyEventPads(touchesPad[3])}>{this.props.pads[3].toUpperCase()}</p>
					<p className="btn-pads letters-pads" onClick={(key)=>this.onKeyEventPads(touchesPad[4])}>{this.props.pads[4].toUpperCase()}</p>
					<p className="btn-pads letters-pads" onClick={(key)=>this.onKeyEventPads(touchesPad[5])}>{this.props.pads[5].toUpperCase()}</p>
					<p className="btn-pads letters-pads" onClick={(key)=>this.onKeyEventPads(touchesPad[6])}>{this.props.pads[6].toUpperCase()}</p>
				</div>
				  
			</div>
		);
	}
}
export default Pads;


/*	<button className="btn-pads"  style={{backgroundColor: this.props.toggleLoopIn ? "#32CD32" : "#6999a1" , visibility : this.props.looping ?  "hidden" : "visible"}}>Loop<br/>i<span className="tiny-letters"  >{this.props.pads[1].toUpperCase()}</span>n</button>
					<button className="btn-pads"  style={{backgroundColor : this.props.looping ? "red" : "#6999a1" }}>Loop<br/>out<span className="tiny-letters"  >{this.props.pads[2].toUpperCase()}</span></button>*/