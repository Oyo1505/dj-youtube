import React from 'react';
import {Form, FormGroup, FormControl} from 'react-bootstrap';
import SpeedRange from './SpeedRange';
import vinyl from '../../images/vinyl-panel.png'
 
class Turntable extends React.Component {
	/*static propTypes = {
		name: React.PropTypes.string,
	};*/

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="module-dj">
				<div className="input-dj-video">
					<Form>
						<FormGroup>
							<FormControl type="text" className="input-dj-video-panel" placeholder="Search song on youtube"/> 		  
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