import React from 'react';
import VolumeController from './VolumeController';
import VideoMiddle from './VideoMiddle';

class AudioMixer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
					volumeLeft:0,
					volumeRight: 0,
					crossfader:0
			 		}
	}
	componentWillMount = () =>{
		this.setState({
					volumeLeft:0.75,
					volumeRight: 0.75,
					crossfader:50
		})
	}
	getVolumes = (level, turntable) => {
		
		if(turntable === 'volumeLeft'){
			this.setState({volumeLeft: level})
		}else if( turntable === 'volumeRight'){
			this.setState({volumeRight: level})
		}
		
	}
	getDuration = (turntable, duration) => {
		this.props.duration(turntable, duration)
	}

	render() {
		console.log(this.props.right.playbackRate)
		return (
			<div className="module-dj audio-mixer-panel"> 
				
				<div className="panel-back panel-default panel-sound-control">
					<VolumeController  volume={this.getVolumes}/>
				</div>
				<div className=" panel-default panel-video-audio-mixer">
					<VideoMiddle turntable={this.props.left} duration={this.getDuration} volume={this.state.volumeLeft} />
					<VideoMiddle turntable={this.props.right} duration={this.getDuration} volume={this.state.volumeRight} />
				</div>
				<div className="panel-back panel-default social-media-panel">
					<button className="button-social-media-panel" ><i className="icon icon-like-white"></i> Like</button> 
					<button className="button-social-media-panel"><i className="icon icon-share"></i>Share</button>
					<button className="button-social-media-panel"><i className="icon icon-pullup"></i>Pull Up</button>
					<button className="button-social-media-panel last"><i className="icon icon-keyboard"></i>ShortCuts</button>

				</div>
			</div>
		);
	}
}
export default  AudioMixer;