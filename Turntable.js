import React from 'react';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import SpeedRange from './SpeedRange';
import VideoItems from './VideoItems';
import Pads from './Pads';
import vinyl from '../../images/vinyl-panel.png';



class Turntable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: null,
            video: null,
            title: '',
            toggle: false,
            layerX: 0,
            widthTarget: 0,
            seeking: false,
            positionMarkers: {
                touch1: { name: this.props.song.pads[3], position: 20 },
                touch2: { name: this.props.song.pads[4], position: 40 },
                touch3: { name: this.props.song.pads[5], position: 60 },
                touch4: { name: this.props.song.pads[6], position: 80 },
            },
            loop: {
                isLooping: false,
                loopIn: { 
                    position: 0,
                    toggle: false,
                     },
                loopOut: { position: 0 }
            }
        }
    }
    componentDidMount = () => {
        this.setState({ widthTarget: this.refs.progressBar.clientWidth });
    }

    replaceString = (title) => {
        let newTitle = `${title.substr(0, 65)}`;
        return newTitle;
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (nextProps !== nextState ) {

            if(this.state.loop.isLooping && this.props.song.progress === this.state.loop.loopOut.position ){
              
                let positionLoopIn = this.state.loop.loopIn.position;
                this.onSeekChangeLoop(positionLoopIn);
                return true;
            }
            
            return true;
        }

    }

    handleVideo = async (event) => {
        let value = event.target.value.replace(/\s/g, "+");
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${value}&key=AIzaSyAUYnlLM70t9p7mGT7u-5odJ9c3WOXTRlE`)
            .then(response => response.json())
            .then(json => this.setState({ videos: json }));
    }

    getPlayBackRate = (speed) => {
        this.props.playbackrate(this.props.name, speed)
    }

    getVideoMix = (video, title) => {
        this.setState({ video, title });
        this.props.track(this.props.name, video);
    }

    onPlay = (bool) => {
        this.props.action(this.props.name, bool);
        this.setState({ toggle: bool });
    }

    onDelete = () => {
        this.setState({ videos: null });
    }

    getTouchPad = (key) => {

        let positionMarkersArray = Object.values(this.state.positionMarkers);

        for (var j = 0; j < positionMarkersArray.length; j++) {
            if (key === positionMarkersArray[j].name) {
                this.onSeekChangePad(positionMarkersArray[j].position);
            }
        }

    }

    handleTouchLoopIn = (key) => {
        let newLoopInPosition = this.props.song.progress;
        let cloneLoop = Object.assign(this.state.loop);
        cloneLoop.loopIn.position = newLoopInPosition;
        cloneLoop.loopIn.toggle = !this.state.loop.loopIn.toggle;
        this.setState({ loop: cloneLoop });
    }

    handleTouchLoopOut = (key) => {
        let newLoopOutPosition = this.props.song.progress;
        let cloneLoop = Object.assign(this.state.loop);

        if (this.state.loop.loopIn.position !== 0) {
            cloneLoop.loopOut.position = newLoopOutPosition;
            cloneLoop.isLooping = !this.state.loop.isLooping;
            this.setState({ loop: cloneLoop });

        }

    }

    onSeekChangeLoop = (position) => {
        //turntable
        let turntable = this.props.name;

        //can play
        this.props.seek(this.props.name, true);
        this.props.changeProgressSong(turntable, position);
        this.setState({ toggle: true });
        this.props.action(turntable, true);
    }

    onSeekChangePad = (percent) => {
        let durationSong = this.props.song.duration;
        let newValueSeconds = percent / 100 * durationSong;

        //turntable
        let turntable = this.props.name;

        //can play
   
        this.props.seek(this.props.name, true);
        this.props.changeProgressSong(this.props.name, newValueSeconds);
        this.setState({ toggle: true });
        this.props.action(turntable, true);
    }

    onSeekMouseDown = (event) => {
        // new position on the progress
        event.persist()
        let layerX = event.nativeEvent.layerX;
        let progressWidth = event.target.clientWidth;
        let newPositionOnTheBar = parseInt(event.nativeEvent.layerX / progressWidth * 100);
         //console.log("seek mouse ");
        this.setState({ layerX: newPositionOnTheBar })
    }

    onSeekChange = (event, bool) => {
        let percent = this.state.layerX;
        let durationSong = this.props.song.duration;

        //translate  in px of the progress bar the percent when the transition end 
        let newValueSeconds = percent / 100 * durationSong;

        //turntable
        let turntable = this.props.name;

        //can play
       
        this.props.seek(this.props.name, true);
        this.props.changeProgressSong(this.props.name, newValueSeconds);
        this.setState({ toggle: true });
        this.props.action(turntable, true);
    }



    render() {
    
        /*  const positionX = this.props.song.progress;
           let progressWidth = this.state.widthTarget;
           let newPositionOnTheBar = positionX / progressWidth * 100;*/
        return (
            <div className="module-dj">
                <div className="input-dj-video">
                    <Form>
                        <FormGroup>
                            <FormControl type="text" onChange={this.handleVideo} defaultValue="" className="input-dj-video-panel" placeholder="Search song on Youtube"/>
                            {this.state.videos  &&
                                <VideoItems delete={this.onDelete} videos={this.state.videos} action={this.getVideoMix} />    
                            }
                        </FormGroup>
                    </Form>
                </div>
                    <div className="panel-deck panel-back panel-default panel-turntable">
                        <div 
                        ref="progressBar"
                        className="progressbar-music"
                        onClick={this.onSeekMouseDown}
                        data-max={this.props.song.duration} 
                        > 

                        <div className="range-song-duration"  onTransitionEnd={this.onSeekChange} style={{width: `${this.state.layerX}%`}}> </div> 
                           
                        <div className="marker" style={{left: `${this.state.positionMarkers.touch1.position}%`}}><p className="label label-info unselectable">{this.props.song.pads[3].toUpperCase()}</p></div>
                        <div className="marker" style={{left: `${this.state.positionMarkers.touch2.position}%`}}><p className="label label-info unselectable">{this.props.song.pads[4].toUpperCase()}</p></div>
                        <div className="marker" style={{left: `${this.state.positionMarkers.touch3.position}%`}}><p className="label label-info unselectable">{this.props.song.pads[5].toUpperCase()}</p></div> 
                        <div className="marker" style={{left: `${this.state.positionMarkers.touch4.position}%`}}><p className="label label-info unselectable">{this.props.song.pads[6].toUpperCase()}</p></div> 
                        <div className="timers">
                          <div className="text-duration-left">
                                 {this.props.song.progress <= 9 &&
                                       <span> 00:0{moment.duration(this.props.song.progress,"seconds").format("h:mm:ss")}</span>
                                 }
                                 {this.props.song.progress > 9 && this.props.song.progress <= 59 &&
                                      <span> 00:{moment.duration(this.props.song.progress,"seconds").format("h:mm:ss")}</span>
                                }
                                {this.props.song.progress > 59 &&
                                    <span>{moment.duration(this.props.song.progress,"seconds").format("h:mm:ss")}</span>

                                }
                                 </div>
                                     <div className="text-duration-right">
                                        <span>{moment.duration(this.props.song.duration,"seconds").format("h:mm:ss")}</span>
                                    </div>
                                </div>
                         
                          

                        </div>
                        <div className="panel-body-turntable">
                            <p className="title-name-song">{this.replaceString(this.state.title)}</p>
                            <img src={vinyl} alt="vinyl-turntable" className={this.state.toggle ? "spin" : " "} />

                            <SpeedRange playbackrate={this.getPlayBackRate} speed={this.props.song.playbackRate} />
                           <Pads 
                               name={this.props.song.name} 
                               pads={this.props.song.pads} 
                               action={this.onPlay}
                               looping={this.state.loop.isLooping}
                               toggleLoopIn={this.state.loop.loopIn.toggle} 
                               canPlay={this.props.song.play} 
                               keyDown={this.props.keydown}
                               getTouchPad={this.getTouchPad}
                               handleTouchLoopIn={this.handleTouchLoopIn}
                               handleTouchLoopOut={this.handleTouchLoopOut}
                           />
                        </div>  
                    </div>

            </div>
        );
    }
}
export default Turntable;