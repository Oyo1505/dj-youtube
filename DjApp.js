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
			turntableLeft: [{
				name: "turntableLeft",
				video: "kCGNWdrN3yw",
				speed: 1,
				duration:212, 
				play:null,
			}],
			turntableRight: [{
				name: "turntableRight",
				video:"7IhV2nDhNAI",
				speed: 1,
				duration:207, 
				play:null,
			}],
			audioMixer: [{
				volumeLeft:75,
				volumeRight: 75,
				crossfader:50,
			}]
		}
	}
	onPlay = (turntable ,play) => {

		//clone each turntable 
		let turntableLeftClone = this.state.turntableLeft.slice();
		let turntableRightClone =  this.state.turntableRight.slice();

		//check the name of the turntable and change the play value
		if(turntable === turntableLeftClone[0].name){

			turntableLeftClone[0].play = play;

			this.setState({turntableLeft: turntableLeftClone});
			console.log(this.state.turntableLeft[0].play)

		}else if(turntable === turntableRightClone[0].name){

			turntableRightClone[0].play = play;
			this.setState({turntableRight: turntableRightClone});

		}	
		
	}

	render() {
		
		return (
			<div id="dj-youtube" >
				<div className="turntable-container">
					<div className="container-dj-app"> 
						<Turntable action={this.onPlay} song={this.state.turntableLeft} name={this.state.turntableLeft[0].name} />
						<AudioMixer left={this.state.turntableLeft[0]} right={this.state.turntableRight[0]} levelVolume={this.state.audioMixer}/>
						<Turntable action={this.onPlay} song={this.state.turntableRight} name={this.state.turntableRight[0].name}/>
					</div>
				</div>
			</div>	
		);
	}
}
