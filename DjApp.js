import React, {Fragment} from 'react';
import Turntable from './Turntable';
import AudioMixer from './AudioMixer';

export default class DjApp extends React.Component {
	/*static propTypes = {
		name: React.PropTypes.string,
	};*/

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="dj-youtube" >
				<div className="turntable-container">
					<div className="container-dj-app"> 
						<Turntable />
						<AudioMixer />
						<Turntable />
					</div>
				</div>
			</div>	
		);
	}
}
