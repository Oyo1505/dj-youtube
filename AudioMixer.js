import React from 'react';
import VolumeController from './VolumeController';
import VideoMiddle from './VideoMiddle';

class AudioMixer extends React.Component {

	constructor(props) {
		super(props);
	}

	getDuration = (turntable, duration) => {
		console.log(duration)
		this.props.duration(turntable, duration)
	}

	render() {
		return (
			<div className="module-dj audio-mixer-panel"> 
				
				<div className="panel-back panel-default panel-sound-control">
					<VolumeController />
				</div>
				<div className=" panel-default panel-video-audio-mixer">
					<VideoMiddle turntable={this.props.left} duration={this.getDuration} />
					<VideoMiddle turntable={this.props.right} duration={this.getDuration} />
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