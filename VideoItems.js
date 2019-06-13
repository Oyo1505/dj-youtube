import React from 'react';

 class VideoItems extends React.Component {

 	replaceString = (title) =>{

        let newTitle = `${title.substr(0, 27)}...`;

        return newTitle;

    }

	render() {
		console.log(this.props.video.items)
		var videos = this.props.video.items;
		var videoItem;
		if(videos){
			videoItem = videos.map(video => {
				console.log(video)
				return <li className="video-item-dj"><div className="thumbnail-video-item"><img src={video.snippet.thumbnails.default.url}/></div><div> {this.replaceString(video.snippet.title)} </div></li>
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