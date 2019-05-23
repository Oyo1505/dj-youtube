import React from 'react';

class AudioMixer extends React.Component {
	/*static propTypes = {
		name: React.PropTypes.string,
	};*/

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="module-dj audio-mixer-panel"> 
				
				<div className="panel-back panel-default panel-sound-control">
					TEST
				</div>
				<div className=" panel-default panel-video-audio-mixer">
					video
				</div>
				<div className="panel-back panel-default social-media-panel">
					TROISIEME
				</div>
			</div>
		);
	}
}
export default  AudioMixer;