import React, { Component } from 'react';
import { Platform, View, Button, Text } from 'react-native';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    getUserMedia
} from 'react-native-webrtc';

class Main extends Component {
    // Global Variables
    localStream;

    // Initial State
    constructor (props) {
        super(props);
        this.state = {
            videoUrl: null,
            isFront: false
        };
    }

    componentDidMount() {
        // Do something here
        const configuration = {'iceServers': [{'url': 'stun:stun.l.google.com:19302'}]};
        const pc = new RTCPeerConnection(configuration);
        const { isFront } = this.state;

        this._getLocalStream(isFront, pc);

        pc.createOffer()
            .then(pc.setLocalDescription)
            .then(() => {
                // Send pc.localDescription to peer
                console.log('pc.setLocalDescription :O event no exist!');
            })
            .catch(logError => {
                console.log(logError.message);
                throw logError;
            });

        pc.onicecandidate = function (event) {
            // send event.candidate to peer
            console.log('pc.onicecandidate: ', event);
        };
    }

    _getLocalStream(isFront, pc) {
        MediaStreamTrack.getSources()
            .then(sourceInfos => {
                console.log('MediaStreamTrack.getSources()', sourceInfos);
                let videoSourceId;
                for (let i = 0; i < sourceInfos.length; i++) {
                    const sourceInfo = sourceInfos[i];
                    // I like ' than "
                    if(sourceInfo.kind === 'video' && sourceInfo.facing === (isFront ? 'front' : 'back')) {
                        videoSourceId = sourceInfo.id;
                    }
                }

                return getUserMedia({
                    audio: true,
                    // If platform is IOS
                    // THIS IS FOR SIMULATOR ONLY - In fact, you better test on real iOS/Android device
                    // We just can test audio in simulator, so I set video = false
                    video: {
                        mandatory: {
                            width: 50, // Provide your own width, height and frame rate here
                            height: 50,
                            minFrameRate: 60
                        },
                        facingMode: (isFront ? 'user' : 'environment'),
                        optional: (videoSourceId ? [{sourceId: videoSourceId}] : [])
                    }
                });

            }).then(stream => {
            console.log('Streaming OK... :)', stream);
            console.log('stream.toURL()', stream.toURL());

            // It's callback function :)
            this.setState({
                videoUrl: stream.toURL()
            });

            if (this.localStream) {
                pc.removeStream(this.localStream);
                this.localStream.release();
            }
            this.localStream = stream;

            pc.addStream(stream);

            return stream

        }).catch(logError => {
            console.log('Ooops, we getting error: ', logError.message);
            throw logError;
        });
    }

    _switchVideoType() {
        // const configuration = {'iceServers': [{'url': 'stun:stun.l.google.com:19302'}]};
        // const pc = new RTCPeerConnection(configuration);
        // const isFront = !this.state.isFront;
        // this.setState({isFront});
        //
        // this._getLocalStream(isFront, pc);

        this.localStream._tracks[1]._switchCamera();
        console.log('Camara cambiada!!! :)');
    }

    render() {
        return (
            <View style={styles.container}>
                <RTCView streamURL={this.state.videoUrl} style={styles.camera}/>
                <View>

                    <Button
                        onPress={ this._switchVideoType.bind(this) } //use .bind(this) to access state in renderResults
                        title="Cambiar Camara!"
                        color="#841584" />
                </View>

                <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}}/>

            </View>

        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    camera: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#cc180e',
        borderWidth: 1,
        borderColor: '#cc180e'
    }
};

export default Main;
