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

		fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${value}&key=AIzaSyAUYnlLM70t9p7mGT7u-5odJ9c3WOXTRlE`)
		.then(response => response.json())
		.then(json => this.setState({videos : json}))
	}

	getVideoMix = ( video ) => {
		this.setState({video});
	}

	onPlay = (bool) =>{
		console.log(bool);
		this.props.action(this.props.name, bool)
	}

	render() {
		
		return (
			<div className="module-dj">
				<div className="input-dj-video">
					<Form>
						<FormGroup>
							<FormControl type="text" onChange={this.handleVideo} defaultValue="" className="input-dj-video-panel" placeholder="Search song on Youtube"/>
							{this.state.videos  &&
								<VideoItems videos={this.state.videos}/>	  
							}

  						</FormGroup>
					</Form>
				</div>
					<div className="panel-deck panel-back panel-default panel-turntable">
						<div className="progressbar-music"> 
							<input type="range" className="range-song-duration" defaultValue="0"  />
							{this.state.video &&
								<span>{this.state.video.snippet.title}</span>
							}
						</div>
						<div className="panel-body-turntable">
							
							<img src={vinyl} alt="vinyl-turntable"  />

							<SpeedRange />
							<Pads action={this.onPlay} />
						</div>	
					</div>

			</div>
		);
	}
}
export default Turntable;