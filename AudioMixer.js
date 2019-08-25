import React, { Fragment } from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import FormContact from "../FormContact";
import { Modal } from 'react-bootstrap';
import VolumeController from './VolumeController';
import VideoMiddle from './VideoMiddle';
import rewind from "../../sounds/kamelott/rewind.mp3";
import sirenOne from '../../sounds/siren_dub_1.mp3';
import sirenTwo from '../../sounds/siren_dub_2.mp3';
import sirenThree from '../../sounds/siren_dub_3.mp3';
import sirenFour from '../../sounds/siren_dub_4.mp3';
import axios from 'axios'


class AudioMixer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            volumeLeft: 0,
            volumeRight: 0,
            crossfader: 0,
            toggle: false,
            isShowing: false,
            alarmsShowing:false,
            isFocus: false,
        }
    }

    componentWillMount = () => {
        this.setState({
            volumeLeft: 0.75,
            volumeRight: 0.75,
            crossfader: 50
        })
    }

    getVolumes = (level, turntable) => {

        if (turntable === 'volumeLeft') {
            this.setState({ volumeLeft: level })
        } else if (turntable === 'volumeRight') {
            this.setState({ volumeRight: level })
        }
    }

    getProgress = (turntable, playedSeconds) => {

        this.props.onProgress(turntable, playedSeconds);
    }

    getDuration = (turntable, duration) => {
        this.props.duration(turntable, duration)
    }

    getSeek = (turntable, bool) => {
        this.props.onSeek(turntable, bool)
    }

    handleValueCrossfader = (value) => {

        if (value < 50) {
            let volumeRight = value / 50
            this.setState({ volumeRight: volumeRight });
        } else if (value > 50) {
            let volumeLeft = 50 / value - 0.5;
            this.setState({ volumeLeft: volumeLeft });
        }
    }
    handlePullpUp = () => {
        
        var rewindTurntables = this.refs.rewind;
        rewindTurntables.currentTime = 0;
        rewindTurntables.play();
        this.props.reset(true, 0);

    }

    canPlay = () => {
        this.props.reset(true);
    }

    toggle = () => {
        this.setState({ toggle: !this.state.toggle })
    }

    handleCloseModal = () => {
        this.setState({ toggle: !this.state.toggle })
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const message = e.target.message.value;
        const data = { name, email, message };

        const form = await axios.post('/api/form', data)
            .then(response => {
                console.log('message Envoyer');
            }).catch(err => {
                console.log('message pas Envoyer');
                console.log(err);
            });

        this.setState({
            name: '',
            email: '',
            message: ''
        });
        alert('Merci Pour votre message');
    }

    //Siren menu
    handleAlarmsMenu = (event) => {
         event.preventDefault();
        this.setState({alarmsShowing:true }, ()=> {
            document.addEventListener('click', this.closeAlarmsMenu);
        })
    }
    closeAlarmsMenu = (event) => {
        
        if (!this.refs.dropdownMenuAlarms.contains(event.target)) {
      
              this.setState({ alarmsShowing: false }, () => {
                document.removeEventListener('click', this.closeAlarmsMenu);
        });  
     }

    }

    /*Share menu*/
    showShareMenu = (event) => {
        event.preventDefault();
        this.setState({ isShowing: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
    }

    closeMenu =(event) => {
    
    if (!this.refs.dropdownMenu.contains(event.target)) {
      
      this.setState({ isShowing: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  playAlarm = (event) => {
    event.preventDefault();
    const alarmSound = event.currentTarget.querySelector('audio')
    alarmSound.currentTime = 0
    alarmSound.play();
  }
    render() {

        const shareUrl = "https://www.henripierrerigoulet.fr/dj-youtube";
        const title = "Hey check this out! Visit my Website: https://www.henripierrerigoulet.fr/, Github : https://github.com/Oyo1505 or join me on Twitch : https://www.twitch.tv/oyo1505 #react #devweb";
        const alarmsSounds = [sirenOne, sirenTwo, sirenThree, sirenFour];
        let alarms;

         if(this.state.alarmsShowing){
           alarms = alarmsSounds.map((alarm, index) => {
                
                return <button className="button-dub-siren alarm-item-list"   key={`alarm-${index}`} > <span  onClick={this.playAlarm} ><audio src={alarm}></audio>{`Siren-${index}`}</span></button>
            })
        }

        return (
            <div className="module-dj audio-mixer-panel"> 
                
                <div className="panel-back panel-default panel-sound-control">
                    <VolumeController  volume={this.getVolumes} crossfader={this.handleValueCrossfader}/>
                </div>
                <div className=" panel-default panel-video-audio-mixer">
                    <VideoMiddle 
                    turntable={this.props.left} 
                    duration={this.getDuration} 
                    volume={this.state.volumeLeft} 
                    progress={this.getProgress}
                    seek={this.getSeek}
                    seeking={this.props.seeking}
                    />

                    <VideoMiddle 
                    turntable={this.props.right} 
                    duration={this.getDuration} 
                    volume={this.state.volumeRight} 
                    progress={this.getProgress} 
                    seek={this.getSeek}
                    seeking={this.props.seeking}
                    />
                </div>
                <div className="panel-back panel-default social-media-panel"   >
              
                                 <Fragment>
                                 <button className="button-social-media-panel"  onClick={this.toggle} >
                                 <i className="icon icon-like-white"></i> Like </button>
                               
                                    <Modal  
                                    size="l"  
                                     aria-labelledby="contained-modal-title-vcenter"
                                    centered  
                                    animation={true}
                                    onHide={this.handleCloseModal}
                                    show={this.state.toggle} 
                                    >
                                    <Modal.Title className="title-modal-djyoutube"> It's a trap ! 🙊</Modal.Title>
                                     <Modal.Body className="modal-body-djyoutube">
                                        <span>Désolé ! Tu ne peux pas liker ce mix pas car ce boutton ne marche pas mais tu peux toujours me contacter pour du travail. 😏</span>
                                        <br/>
                                        <br/>
                                        <a href="https://github.com/Oyo1505"><i className="icon icon-github-black"></i> Tu peux visiter mon Github!</a>
                                        <br/>
                                       <span> ou m'appeler  au  07 83 06 72 40</span>
                                        
                                        <br/>
                                        <FormContact />
                                     </Modal.Body>
                                     </Modal>
                                </Fragment> 
                                <button className="button-social-media-panel" id="share-button-panel"  onClick={this.showShareMenu} > <i className="icon icon-share" ></i>Share</button>
                              
                                
                                 
                                   {this.state.isShowing &&
                                     <div  ref="dropdownMenu" className="menu-share-panel" style={{ display : this.state.isShowing ? 'block' : 'none'}}>
                                    <Fragment>
                                    <TwitterShareButton
                                        
                                        url={shareUrl}
                                        title={title}
                                        className="network-share-button-panel twitter-share-button-panel">
                                        <i className ="icon icon-twitter"></i> Share on Twitter !
                                      </TwitterShareButton>
                                  
                                      <FacebookShareButton
        
                                         url={shareUrl}
                                        quote={title}
                                        className="network-share-button-panel facebook-share-button-panel "
                                      >
                                     <i className ="icon icon-facebook "></i> Share on Facebook !
                                      </FacebookShareButton>

                                      </Fragment>

                                      <hr />

                                        <button className="network-share-button-panel github-share-button-panel"><a href="https://github.com/Oyo1505"><i className="icon icon-github"></i>Visite mon Github</a></button>
                                      </div> 
                                   }
                                     
                                   
                                    
                        <button className="button-social-media-panel" onClick={this.handlePullpUp}><audio preload="none" ref="rewind"    src={rewind} ></audio><i className="icon icon-pullup"></i>Pull Up</button>
                        <button className="button-social-media-panel "><i className="icon icon-keyboard"></i>ShortCuts</button>
                       
                        <button className="button-social-media-panel last" onClick={this.handleAlarmsMenu}><i className="icon icon-siren"></i>Dub Siren</button>

                        {this.state.alarmsShowing &&
                              <div  ref="dropdownMenuAlarms" className="menu-alarm-panel" style={{ display : this.state.alarmsShowing ? 'block' : 'none'}}>
                                    {alarms}
                             </div>
                        }
                      

                        
                    </div>
                
            </div>
        );
    }
}
export default AudioMixer;