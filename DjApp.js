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
				name: null,
				video: null,
				speed: 0,
				duration:0, 
				progress: 0,
				play:null,
			}],
			turntableRight: [{
				name: null,
				video:null,
				speed: 0,
				duration:0, 
				progress: 0,
				play:false,
			}],
			audioMixer: [{
				volumeLeft:0,
				volumeRight: 0,
				crossfader:0,
			}]
		}
	}

	componentWillMount = () => {
		this.setState({
			turntableLeft: [{
				name: "turntableLeft",
				video: "kCGNWdrN3yw",
				speed: 1,
				duration:212, 
				progress: 0,
				play:false,
			}],
			turntableRight: [{
				name: "turntableRight",
				video:"7IhV2nDhNAI",
				speed: 1,
				duration:207, 
				progress: 0,
				play:false,
			}],
			audioMixer: [{
				volumeLeft:75,
				volumeRight: 75,
				crossfader:50,
				videoIds: [],
			}]

		})
	}

	getVideoId = (turntable, id) =>{
		//clone each turntable 
		let turntableLeftClone = this.state.turntableLeft.slice();
		let turntableRightClone =  this.state.turntableRight.slice();

		//check the name of the turntable and change the play value
		if(turntable === turntableLeftClone[0].name){

			turntableLeftClone[0].video = id;

			this.setState({turntableLeft: turntableLeftClone});


		}else if(turntable === turntableRightClone[0].name){

			turntableRightClone[0].video = id;
			this.setState({turntableRight: turntableRightClone});

		}	

	}
	getDuration = (turntable, duration) =>{
		console.log(turntable, duration);
		//clone each turntable 
		let turntableLeftClone = this.state.turntableLeft.slice();
		let turntableRightClone =  this.state.turntableRight.slice();

		//check the name of the turntable and change the play value
		if(turntable === turntableLeftClone[0].name){

			turntableLeftClone[0].duration = duration;

			this.setState({turntableLeft: turntableLeftClone});


		}else if(turntable === turntableRightClone[0].name){

			turntableRightClone[0].duration = duration;
			this.setState({turntableRight: turntableRightClone});

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


		}else if(turntable === turntableRightClone[0].name){

			turntableRightClone[0].play = play;
			this.setState({turntableRight: turntableRightClone});

		}	
		
	}
	onProgress = (seconds) =>{
		//this.setState()
	}
	render() {
		
		return (
			<div id="dj-youtube" >
				<div className="turntable-container">
					<div className="container-dj-app"> 
						<Turntable 
							 track={this.getVideoId}
							 action={this.onPlay} 
							 song={this.state.turntableLeft[0]} 
							 name={this.state.turntableLeft[0].name} 

						 />
						<AudioMixer 
							left={this.state.turntableLeft[0]} 
							right={this.state.turntableRight[0]} 
							levelVolume={this.state.audioMixer}
							duration={this.getDuration}
						/>
						<Turntable 
							track={this.getVideoId} 
							action={this.onPlay} 
							song={this.state.turntableRight[0]} 
							name={this.state.turntableRight[0].name}
						/>
					</div>
				</div>
			</div>	
		);
	}
}
