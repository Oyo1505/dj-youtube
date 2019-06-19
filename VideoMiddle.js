import React from 'react';
import ReactPlayer from 'react-player'

export default class VideoMiddle extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			duration:0,

		};
	}

	onDuration = (duration) =>{

		this.setState({duration});
		this.props.duration(this.props.turntable.name, this.state.duration);
	} 
	render() {

		const url= `https://www.youtube.com/watch?v=${this.props.turntable.video}`
		return (
			<ReactPlayer url={url} 
				width='49%'
				height='10%'
				config={{  youtube: {
     				 playerVars: { showinfo: 1 }
   				 }, }}
				onDuration={this.onDuration}
				playing={this.props.turntable.play}
			/>
		);
	}
}
