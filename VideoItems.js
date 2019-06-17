import React from 'react';

 class VideoItems extends React.Component {

 	replaceString = (title) =>{

        let newTitle = `${title.substr(0, 27)}...`;

        return newTitle;

    }
    addToPlaylist = (video) => {
    	this.props.action(video);
    }



	render() {
	
		var videos = this.props.videos.items;
		var videoItem;
		if(videos){
			videoItem = videos.map(video => {
				return <li className="video-item-dj"><div className="thumbnail-video-item"><img src={video.snippet.thumbnails.default.url}/></div><div> <span>{this.replaceString(video.snippet.title)}</span> </div><button className="btn-add-playlist"  >Add to Playlist</button> </li>
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