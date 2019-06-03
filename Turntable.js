import React from 'react';
import {Form, FormGroup, FormControl} from 'react-bootstrap';
import SpeedRange from './SpeedRange';
import VideoItems from './VideoItems';
import vinyl from '../../images/vinyl-panel.png'
 
class Turntable extends React.Component {
	/*static propTypes = {
		name: React.PropTypes.string,
	};*/

	constructor(props) {
		super(props);
		this.state = { video: [] }
	}

	handleVideo = (event) => {
		
		
		let value = event.target.value.replace(/\s/g, "+");
		
		fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&key=AIzaSyAlN3r_xXHhgpuwYTYFcl4c3kKZJc6rXTY`)
		.then(response => response.json())
		.then(json => this.setState({video : json}))
		console.log(this.state.video)
	}

	render() {

		return (
			<div className="module-dj">
				<div className="input-dj-video">
					<Form>
						<FormGroup>
							<FormControl type="text" onChange={this.handleVideo} className="input-dj-video-panel" placeholder="Search song on youtube"/>
							<VideoItems video={this.state.video}/>	  
  						</FormGroup>
					</Form>
				</div>
					<div className="panel-deck panel-back panel-default panel-turntable">
						<div className="progressbar-music"> <input type="range" className="range-song-duration" /></div>
						<div className="panel-body-turntable">
							
							<img src={vinyl} alt="vinyl-turntable"  />

							<SpeedRange />
						</div>
					</div>

			</div>
		);
	}
}
export default Turntable;