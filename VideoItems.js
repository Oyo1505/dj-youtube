import React from 'react';

 class VideoItems extends React.Component {

	render() {
		console.log(this.props.video.items)
		var videos = this.props.video.items;
		var videoItem;
		if(videos){
			videoItem = videos.map(video => {
				return <li> {video.snippet.title} </li>
			})
		}
		return (
			<div className="result-video-dj panel-back">
				<ul>
					{videoItem}
				</ul>
				
			</div>
		);
	}
}
export default VideoItems;