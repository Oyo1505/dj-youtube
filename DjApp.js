import React, { Fragment } from 'react';
import Turntable from './Turntable';
import AudioMixer from './AudioMixer';
import KeyboardEventHandler from 'react-keyboard-event-handler';


class DjApp extends React.Component {
    /*static propTypes = {
    	name: React.PropTypes.string,
    };*/

    constructor(props) {
        super(props);

        this.state = {
             turntableLeft: [{
                name: 'turntableLeft',
                video: 'kCGNWdrN3yw',
                playbackRate: 1,
                duration: 212,
                titleVideo:'',
                progress: 0,
                play: false,
                pads: ["x", "t", "g", "q", "s", "d", "f"],
                seek: false,
            }],
            turntableRight: [{
                name: 'turntableRight',
                video: '7IhV2nDhNAI',
                playbackRate: 1,
                duration: 207,
                titleVideo:'',
                progress: 0,
                play: false,
                pads: ["b", "y", "h", "j", "k", "l", "m"],
                seek: false,
            }],
            key: null,
            seeking: false,
            isFetching:false,
        }
    }


  shouldComponentUpdate(nextProps, nextState) {
    
    if(nextProps !== nextState){
        
    //console.log( nextState, "state");
        return true
    }
    return false
  } 
    getVideoId = (turntable, id) => {
        //clone each turntable 
        let turntableLeftClone = this.state.turntableLeft.slice();
        let turntableRightClone = this.state.turntableRight.slice();

        //check the name of the turntable and change the play value
        if (turntable === turntableLeftClone[0].name) {
            turntableLeftClone[0].video = id;
            this.setState({ turntableLeft: turntableLeftClone });
        } else if (turntable === turntableRightClone[0].name) {
            turntableRightClone[0].video = id;
            this.setState({ turntableRight: turntableRightClone });
        }

    }
    getDuration = (turntable, duration) => {
        //clone each turntable 
        let turntableLeftClone = this.state.turntableLeft.slice();
        let turntableRightClone = this.state.turntableRight.slice();

        //check the name of the turntable and change the play value
        if (turntable === turntableLeftClone[0].name) {
            turntableLeftClone[0].duration = duration;
            this.setState({ turntableLeft: turntableLeftClone });
        } else if (turntable === turntableRightClone[0].name) {
            turntableRightClone[0].duration = duration;
            this.setState({ turntableRight: turntableRightClone });

        }
    }
    onPlay = (turntable, play) => {

        //clone each turntable 
        let turntableLeftClone = this.state.turntableLeft.slice();
        let turntableRightClone = this.state.turntableRight.slice();

        //check the name of the turntable and change the play value
        if (turntable === turntableLeftClone[0].name) {
            turntableLeftClone[0].play = play;
            this.setState({ turntableLeft: turntableLeftClone });
        } else if (turntable === turntableRightClone[0].name) {
            turntableRightClone[0].play = play;
            this.setState({ turntableRight: turntableRightClone });

        }
    }
 
    getPlayBackRate = (turntable, speed) => {

        let turntableLeftClone = this.state.turntableLeft.slice();
        let turntableRightClone = this.state.turntableRight.slice();

        if (turntable === turntableRightClone[0].name) {
            turntableRightClone[0].playbackRate = speed;
            this.setState({ turntableRight: turntableRightClone });

        } else if (turntable === turntableLeftClone[0].name) {
            turntableLeftClone[0].playbackRate = speed;
            this.setState({ turntableLeft: turntableLeftClone });

        }
    }
    onProgress = (turntable, seconds) => {

        let turntableLeftClone = this.state.turntableLeft.slice();
        let turntableRightClone = this.state.turntableRight.slice();

        if (turntable === turntableRightClone[0].name) {

            turntableRightClone[0].progress = seconds;
            this.setState({ turntableRight: turntableRightClone });

        } else if (turntable === turntableLeftClone[0].name) {

            turntableLeftClone[0].progress = seconds;
            this.setState({ turntableLeft: turntableLeftClone });

        }
         
    }

    changeProgressSong = (turntable, duration) => {
        let turntableLeftClone = this.state.turntableLeft.slice();
        let turntableRightClone = this.state.turntableRight.slice();

        if (turntable === turntableRightClone[0].name) {

            turntableRightClone[0].progress = duration;

            this.setState({ turntableRight: turntableRightClone });

        } else if (turntable === turntableLeftClone[0].name) {

            turntableLeftClone[0].progress = duration;

            this.setState({ turntableLeft: turntableLeftClone });

        }
    }

    resetTurntableProgress = (bool, duration) => {
        //clone each turntable
        let turntableLeftClone = this.state.turntableLeft.slice();
        let turntableRightClone = this.state.turntableRight.slice();

        //turntabble right turn on progress to 0 and turn the video to play
        turntableRightClone[0].progress = duration;
        turntableRightClone[0].seek = bool;
       // turntableRightClone[0].play = true;
        //turntabble left on progress to 0 and turn the video to play
        turntableLeftClone[0].progress = duration;
        turntableLeftClone[0].seek = bool;
        //turntableLeftClone[0].play = true;
        //setState the modifications
        this.setState({
            turntableLeft: turntableLeftClone,
            turntableRight: turntableRightClone,
            seeking: bool,
        });


    }

    onSeek = (turntable, bool) => {
        //clone turtables
        let turntableLeftClone = this.state.turntableLeft.slice();
        let turntableRightClone = this.state.turntableRight.slice();
        
        //check the name of the turntable and change the proprety of seek
        if (turntable === turntableRightClone[0].name) {
            //console.log(bool,"right onSeek");
           turntableRightClone[0].seek = bool;
            this.setState({ turntableRight: turntableRightClone});

        } else if (turntable === turntableLeftClone[0].name) {
           // console.log(bool,"left onSeek");
            turntableLeftClone[0].seek = bool;
            this.setState({ turntableLeft: turntableLeftClone });

        }
    }



    


    render() {
        const { isFetching } = this.state.isFetching;
        
        return (
            <div>

			{ isFetching ? <p>Loading...</p> : (
				
					
				<div id="dj-youtube">
					<div className="turntable-container">
						<div className="container-dj-app"> 
							<Turntable 
								 track={this.getVideoId}
								 action={this.onPlay} 
								 song={this.state.turntableLeft[0]} 
								 name={this.state.turntableLeft[0].name} 
								 playbackrate={this.getPlayBackRate}
								 changeProgressSong={this.changeProgressSong}
								 seek={this.onSeek}
								 keydown={this.state.key}
								 
							 />
							<AudioMixer 
								left={this.state.turntableLeft[0]} 
								right={this.state.turntableRight[0]}
								seeking={this.state.seeking}
								audioMixer={this.state.audioMixer}
								levelVolume={this.state.audioMixer}
								duration={this.getDuration}
								onProgress={this.onProgress}
								onSeek={this.onSeek}
								reset={this.resetTurntableProgress}
							/>
							<Turntable 
								track={this.getVideoId} 
								action={this.onPlay} 
								song={this.state.turntableRight[0]} 
								name={this.state.turntableRight[0].name}
								playbackrate={this.getPlayBackRate}
								changeProgressSong={this.changeProgressSong}
								seek={this.onSeek}
								keydown={this.state.key}
								
							/>
						</div>
					</div>
				</div>
		
				)	
			}
			</div>
        );
    }
}
export default DjApp;