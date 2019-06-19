import React from 'react';

 class VideoItems extends React.Component {

 	replaceString = (title) =>{

        let newTitle = `${title.substr(0, 27)}...`;

        return newTitle;

    }
    addToPlaylist = (event) => {
    	
    	let id = event.target.dataset.id;
    	this.props.action(id);
    }

    onClear = () =>{

    }

	render() {
	
		var videos = this.props.videos.items;
		var videoItem;
		if(videos){
			videoItem = videos.map(video => {
				
				let id = video.id.videoId
				//console.log(id)
				return <li key={id} className="video-item-dj"><div className="thumbnail-video-item"><img src={video.snippet.thumbnails.default.url}/></div><div> <span>{this.replaceString(video.snippet.title)}</span> </div><div className="btn-add-playlist"  data-id={id} onClick={this.addToPlaylist} >Add to Playlist</div> </li>
			})
		}
		return (
			<div className="result-video-dj panel-back">
				<ul>
					<a onClick={this.onClear}> clear</a>
					<hr/>
					{videoItem}

				</ul>
				
			</div>
		);
	}
}
export default VideoItems;