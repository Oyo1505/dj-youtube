import React from 'react';
import {Form, FormGroup, FormControl} from 'react-bootstrap';
import SpeedRange from './SpeedRange';
import VideoItems from './VideoItems';
import Pads from './Pads';
import vinyl from '../../images/vinyl-panel.png'
 
class Turntable extends React.Component {
	/*static propTypes = {
		name: React.PropTypes.string,
	};*/

	constructor(props) {
		super(props);
		this.state = { 
			videos: null,
			video:null,
			 }
	}

	handleVideo = async (event) => {
		
		
		let value = event.target.value.replace(/\s/g, "+");

		fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${value}&key=API_KEY`)
		.then(response => response.json())
		.then(json => this.setState({videos : json}))
		
	}

	getVideoMix = ( video ) => {
		this.setState({video});
	}

	render() {

		return (
			<div className="module-dj">
				<div className="input-dj-video">
					<Form>
						<FormGroup>
							<FormControl type="text" onChange={this.handleVideo} defaultValue="" className="input-dj-video-panel" placeholder="Search song on youtube"/>
							{this.state.videos  &&
								<VideoItems video={this.state.videos} action={this.getVideoMix}/>	  
							}

  						</FormGroup>
					</Form>
				</div>
					<div className="panel-deck panel-back panel-default panel-turntable">
						<div className="progressbar-music"> 
							<input type="range" className="range-song-duration" defaultValue="00:00"  />
							{this.state.video &&
								<span>{this.state.video.snippet.title}</span>
							}
						</div>
						<div className="panel-body-turntable">
							
							<img src={vinyl} alt="vinyl-turntable"  />

							<SpeedRange />
							<Pads />
						</div>	
					</div>

			</div>
		);
	}
}
export default Turntable;
