import React, { Fragment } from 'react';
import FormContact from "../FormContact"
import { Modal } from 'react-bootstrap';
import VolumeController from './VolumeController';
import VideoMiddle from './VideoMiddle';
import rewind from "../../sounds/kamelott/rewind.mp3";
import axios from 'axios'
//import Toggle from "../../Utilities/Toggle";

class AudioMixer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            volumeLeft: 0,
            volumeRight: 0,
            crossfader: 0,
            toggle: false
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
        this.props.reset(false);
        var rewindTurntables = this.refs.rewind;
        rewindTurntables.currentTime = 0;
        rewindTurntables.play();
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
    render() {

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
                <div className="panel-back panel-default social-media-panel">
                
                                 <Fragment>
                                 <button className="button-social-media-panel" onClick={this.toggle} >
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
                                        <a href="https://github.com/Oyo1505"><i className="icon icon-github"></i>Tu peux visiter mon Github!</a>
                                        <br/>
                                       <span> ou m'appeler  au  07 83 06 72 40</span>
                                        
                                        <br/>
                                        <FormContact />
                                     </Modal.Body>
                                     </Modal>
                                </Fragment>
                     
                    <button className="button-social-media-panel"><i className="icon icon-share"></i>Share</button>
                    <button className="button-social-media-panel"onClick={this.handlePullpUp}><audio preload="none" ref="rewind"  onEnded={this.canPlay}  src={rewind} ></audio><i className="icon icon-pullup"></i>Pull Up</button>
                    <button className="button-social-media-panel last"><i className="icon icon-keyboard"></i>ShortCuts</button>
                    <button className="button-social-media-panel last"><i className="icon icon-siren"></i>Dub Alarms</button>
                </div>
            </div>
        );
    }
}
export default AudioMixer;