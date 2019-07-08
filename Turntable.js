import React from 'react';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import SpeedRange from './SpeedRange';
import VideoItems from './VideoItems';
import Pads from './Pads';
import vinyl from '../../images/vinyl-panel.png';



class Turntable extends React.Component {
    /*static propTypes = {
        name: React.PropTypes.string,
    };*/

    constructor(props) {
        super(props);
        this.state = {
            videos: null,
            video: null,
            toggle: false,
            seeking:false
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
    getVideoMix = (video) => {

        this.setState({ video });
        this.props.track(this.props.name, video);
    }

    onPlay = (bool) => {

        this.props.action(this.props.name, bool);
        this.setState({ toggle: bool });
    }
    onDelete = () => {

        this.setState({ videos: null });
    }

    onSeekMouseDown = event => {
        this.props.seek(this.props.name, true);
    }
    onSeekChange = (event, bool) => {
        
        let newValueSeconds = parseInt(event.target.value);
        let turntable = this.props.name;
         //can play
        this.props.action(turntable, true);
        this.setState({ toggle:true});
        console.log(this.state.toggle, this.props.name)
        this.props.changeProgressSong(this.props.name, newValueSeconds);
    
    }
    onSeekMouseUp = event => {
        this.props.seek(this.props.name, false);
    }

    render() {
       
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
                        <div className="progressbar-music"> 
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
                            <input
                             type="range" 
                             className="range-song-duration" 
                             defaultValue="0" 
                             max={this.props.song.duration} 
                             onMouseDown={this.onSeekMouseDown}
                             onChange={this.onSeekChange}
                             onMouseUp={this.onSeekMouseUp} 
                             />                            
                        </div>
                        <div className="panel-body-turntable">
                            
                            <img src={vinyl} alt="vinyl-turntable" className={this.state.toggle ? "spin" : " "} />

                            <SpeedRange playbackrate={this.getPlayBackRate} speed={this.props.song.playbackRate} />
                            <Pads action={this.onPlay} pads={this.props.song.pads}  canPlay={this.props.song.play}  />
                        </div>  
                    </div>

            </div>
        );
    }
}
export default Turntable;