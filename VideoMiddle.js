import React from 'react';
import ReactPlayer from 'react-player';


export default class VideoMiddle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            duration: 0,
            playedSeconds: 0,

        };
    }

    onDuration = (duration) => {
        this.setState({ duration });
        this.props.duration(this.props.turntable.name, this.state.duration);
    }

    onProgress = state => {
        // We only want to update time slider if we are not currently seeking
        if (!this.props.turntable.seeking) {
            this.setState({ playedSeconds: state.playedSeconds })
            this.props.progress(this.props.turntable.name, state.playedSeconds)
        } else {
            console.log(this.props.turntable.seeking)
        }
    }
    ref = player => {
        this.player = player
    }
    render() {
        if (this.props.turntable.seeking) {
            this.player.seekTo(this.props.turntable.progress);
        }

        const url = `https://www.youtube.com/watch?v=${this.props.turntable.video}`
        return (
            <ReactPlayer 
            	url={url} 
            	ref={this.ref}
				width='49%'
				height='10%'
				config={{  youtube: {
     				 playerVars: { showinfo: 1 }
   				 }, }}
   				volume={this.props.volume}
				onDuration={this.onDuration}
				onProgress={this.onProgress}
				playing={this.props.turntable.play}
				playbackRate={this.props.turntable.playbackRate}
				onChange={this.onSeek}

			/>
        );
    }
}