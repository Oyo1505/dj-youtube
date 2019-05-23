import React from 'react';

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
				<div></div>
				<div className="panel-deck panel-back panel-default"></div>

			</div>
		);
	}
}
export default Turntable;