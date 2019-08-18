import React from 'react';

class VideoItems extends React.Component {

    replaceString = (title) => {

        let newTitle = `${title.substr(0, 27)}...`;

        return newTitle;

    }
    addToPlaylist = (event) => {

        let id = event.target.dataset.id;
        let title = event.target.dataset.name;
        this.props.action(id, title);
        this.props.delete();
    }

    onClear = (event) => {
        this.props.delete();
    }

    render() {

        var videos = this.props.videos.items;
        var videoItem;
        if (videos) {
            videoItem = videos.map(video => {

                let id = video.id.videoId
                return <li key={id} className="video-item-dj"><div className="thumbnail-video-item"><img src={video.snippet.thumbnails.default.url} alt="thumbnail video youtube"/></div><div> <span>{this.replaceString(video.snippet.title)}</span> </div><div className="btn-add-playlist" data-name={video.snippet.title} data-id={id} onClick={this.addToPlaylist} >Add to Playlist</div> </li>
            })
        }
        return (
            <div className="result-video-dj panel-back">
				<ul>
					<p onClick={this.onClear}> Close</p>
					<hr/>
					{videoItem}

				</ul>
				
			</div>
        );
    }
}
export default VideoItems;