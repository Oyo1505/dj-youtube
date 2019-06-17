import React from 'react';
import ReactPlayer from 'react-player'

export default class VideoMiddle extends React.Component {

	render() {
		const url= `https://www.youtube.com/watch?v=${this.props.video}`
		return (
			<ReactPlayer url={url} 
				width='49%'
				height='10%'
				youtubeConfig={{ playerVars: { showinfo: 1 } }}
				onDuration={this.onDuration}
			/>
		);
	}
}
