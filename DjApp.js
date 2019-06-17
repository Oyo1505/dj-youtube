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
				video: "kCGNWdrN3yw",
				speed: 1,
				duration:212, 
			},
			turntableRight: {
				video:"7IhV2nDhNAI",
				speed: 1,
				duration:207, 
			},
			audioMixer: [{
				volumeLeft:75,
				volumeRight: 75,
				crossfader:50,
			}]
		}
	}

	render() {
		console.log(this.state.turntableLeft)
		return (
			<div id="dj-youtube" >
				<div className="turntable-container">
					<div className="container-dj-app"> 
						<Turntable song={this.state.turntableLeft} />
						<AudioMixer left={this.state.turntableLeft.video} right={this.state.turntableRight.video} levelVolume={this.state.audioMixer}/>
						<Turntable song={this.state.turntableRight}/>
					</div>
				</div>
			</div>	
		);
	}
}
