import React from 'react';
import {Form, FormGroup, FormControl} from 'react-bootstrap';

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
				<div className="panel-deck panel-back panel-default"></div>

			</div>
		);
	}
}
export default Turntable;