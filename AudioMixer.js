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
			<div className="module-dj"> 
				<div className="panel-back panel-default"></div>
			</div>
		);
	}
}
export default  AudioMixer;