import React, {Fragment} from 'react';
import Turntable from './Turntable';
import AudioMixer from './AudioMixer';

export default class DjApp extends React.Component {
	/*static propTypes = {
		name: React.PropTypes.string,
	};*/

	constructor(props) {
		super(props);

		this.state = {
			turntableLeft: {
				name: "turntableLeft",
				video: "kCGNWdrN3yw",
				speed: 1,
				duration:212, 
				play:false,
			},
			turntableRight: {
				name: "turntableRight",
				video:"7IhV2nDhNAI",
				speed: 1,
				duration:207, 
				play:false,
			},
			audioMixer: [{
				volumeLeft:75,
				volumeRight: 75,
				crossfader:50,
			}]
		}
	}
	onPlay = (turntable ,play) => {
		if(turntable == turntableLeft.name){
			this.setState({turntableLeft: { play: play}})
		}
		
	}
	render() {
		
		return (
			<div id="dj-youtube" >
				<div className="turntable-container">
					<div className="container-dj-app"> 
						<Turntable action={this.onPlay} song={this.state.turntableLeft} name={this.state.turntableLeft.name} />
						<AudioMixer left={this.state.turntableLeft.video} right={this.state.turntableRight.video} levelVolume={this.state.audioMixer}/>
						<Turntable action={this.onPlay} song={this.state.turntableRight} name={this.state.turntableRight.name}/>
					</div>
				</div>
			</div>	
		);
	}
}
