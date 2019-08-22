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
            showVideo:false,
            layerX: 0,
            widthTarget: 0,
            seeking: false,
            moveMarker:false,
            positionMouse: 0,
            positionMarkers: {
                touch1: { name: this.props.song.pads[3], position: 20, translate : 0 },
                touch2: { name: this.props.song.pads[4], position: 40, translate : 0 },
                touch3: { name: this.props.song.pads[5], position: 60, translate : 0 },
                touch4: { name: this.props.song.pads[6], position: 80, translate : 0 },
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

    shouldComponentUpdate = (nextProps, nextState, prevProps) => {
        if (nextProps !== nextState ) {

            if(this.state.loop.isLooping && this.props.song.progress === this.state.loop.loopOut.position ){
              
                let positionLoopIn = this.state.loop.loopIn.position;
                this.onSeekChangeLoop(positionLoopIn);
                return true;
            }
        }
        return true;
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

    handleTouchLoopIn = () => {
        
        let newLoopInPosition = this.props.song.progress;
        let cloneLoop = Object.assign(this.state.loop);
        cloneLoop.loopIn.position = newLoopInPosition;
        cloneLoop.loopIn.toggle = !this.state.loop.loopIn.toggle;
        this.setState({ loop: cloneLoop });
    }

    handleTouchLoopOut = () => {
        
        let newLoopOutPosition = this.props.song.progress;
        let cloneLoop = Object.assign(this.state.loop);

        if (this.state.loop.loopIn.position !== 0 ) {
            console.log("in")
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
        this.setState({  layerX });

    }

    onSeekChange = (event) => {
       

        let percent = parseInt(this.state.layerX / this.state.widthTarget *100);
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

    backward = () => {
        let currentProgress = this.props.song.progress;
        let newValueSeconds = currentProgress - 5;

        //turntable
        let turntable = this.props.name;

        //can play
        if(currentProgress >= 5){
            this.props.seek(this.props.name, true);
            this.props.changeProgressSong(this.props.name, newValueSeconds);
            this.setState({ toggle: true });
            this.props.action(turntable, true);
        }

    }

    geThumbPositionOnProgressBar = () => {
            
           let percentSong = parseInt(this.props.song.progress / this.props.song.duration * 100)  ;
           let progressWidth = this.state.widthTarget;
           let newPositionOnTheBar = parseInt(percentSong / 100 * progressWidth);
           return newPositionOnTheBar
    }

    showVideoItems = (event) => {
        event.preventDefault();
        this.setState({ showVideo: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
    }

    closeMenu =(event) => {
    if (!this.refs.resultVideo.contains(event.target)) {
      this.setState({ showVideo: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
    }
  }

  onMouseDragging(mouseDownX, startTranslate) {
    return (e) => {
      console.log('clientx: ' + e.clientX)
      console.log('mouse down x: ' + mouseDownX)
      console.log('startTranslate is ' + startTranslate);
      if (this.holding) {
        let newTranslate = (e.clientX - mouseDownX) + startTranslate;
        if (newTranslate < 0) {
          newTranslate = 0;
        }
        if (newTranslate > this.scrubBar.parentNode.offsetWidth - 2*R) {
          newTranslate = this.scrubBar.parentNode.offsetWidth - 2*R;
        }
        this.setState({ translate: newTranslate })
      }
    };
  }
  handleMarker = (event) => {
    
        const marker = event.currentTarget;
        const markerPos = event.clientX;
        this.setState({moveMarker: !this.state.moveMarker,  })
       // this.onDraggingFunctionRef = this.onMouseDragging(e.clientX, this.state.translate);
        //document.addEventListener('mousemove', this.onDraggingFunctionRef)
        document.addEventListener("mousemove", (e)=> {
            console.log(event)
            if(this.state.moveMarker === true){
                const mousePosX = this.state.positionMouse;
                let newDataX = mousePosX - markerPos;
                marker.dataset.X = newDataX;
                marker.style.transform = `translateX(${newDataX}px)`;
             }
         }) 
  }

  deleteDataSetOnMarker = (event) =>{

    const marker = event.currentTarget;
    this.setState({moveMarker: !this.state.moveMarker})
    document.removeEventListener("mousemove", (e)=>{
                console.log("in");
            });
        if(this.state.moveMarker === false){

            marker.removeAttribute("data-x");
            marker.style.removeProperty("transform");
        }
  }
  mousePositionXOnProgressBar = (event)=> {
   // console.log(this.state.moveMarker)
    this.setState({positionMouse: event.clientX})

  }
    render() {

            if(this.props.song.play){
             var pos =  this.geThumbPositionOnProgressBar();
            }

        return (
            <div className="module-dj" onMouseMove={this.mousePositionXOnProgressBar}>
                <div className="input-dj-video">
                    <Form>
                        <FormGroup>
                            <FormControl ref="resultVideo" type="text" onChange={this.handleVideo} onFocus={this.showVideoItems} defaultValue="" className="input-dj-video-panel" placeholder="Search song on Youtube"/>
                            {this.state.videos  && this.state.showVideo &&
                                <VideoItems  delete={this.onDelete} videos={this.state.videos} action={this.getVideoMix} />    
                            }
                        </FormGroup>
                    </Form>
                </div>
                    <div className="panel-deck panel-back panel-default panel-turntable" >
                        <div 
                        ref="progressBar"
                        className="progressbar-music"
                        onMouseDown={this.onSeekMouseDown}
                        onMouseUp={this.onSeekChange}
                        data-max={this.props.song.duration} 

                        > 

                        <div ref="cursorProgressBar" className="range-song-duration"  style={{width : pos + "px" }}> </div> 
                           
                        <div className="marker" data-name={this.state.positionMarkers.touch1.name} onMouseDown={this.handleMarker} onMouseUp={this.deleteDataSetOnMarker} style={{left: `${this.state.positionMarkers.touch1.position}%`}}>
                         <p className="label label-info unselectable">{this.props.song.pads[3].toUpperCase()}</p>
                        </div>
                        <div className="marker" onMouseDown={this.handleMarker} onMouseUp={this.deleteDataSetOnMarker} style={{left: `${this.state.positionMarkers.touch2.position}%`}}>
                         <p className="label label-info unselectable">{this.props.song.pads[4].toUpperCase()}</p>
                        </div>
                        <div className="marker" onMouseDown={this.handleMarker} onMouseUp={this.deleteDataSetOnMarker} style={{left: `${this.state.positionMarkers.touch3.position}%`}}>
                         <p className="label label-info unselectable">{this.props.song.pads[5].toUpperCase()}</p>
                        </div> 
                        <div className="marker" onMouseDown={this.handleMarker} onMouseUp={this.deleteDataSetOnMarker} style={{left: `${this.state.positionMarkers.touch4.position}%`}}>
                         <p className="label label-info unselectable">{this.props.song.pads[6].toUpperCase()}</p>
                        </div> 
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
                               backward={this.backward}
                           />
                        </div>  
                    </div>

            </div>
        );
    }
}
export default Turntable;
