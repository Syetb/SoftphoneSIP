import React from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native'
import {Navigation} from 'react-native-navigation'

import JsSIP from 'jssip'

export default class Screen2 extends React.Component {
    static get options() {
        return {
            topBar: {
                title: {
                    text: 'Screen 2'
                },
            }
        };
    }

    registerWebRTCPeer() {
        // Create our JsSIP instance and run it:
        const socket = new JsSIP.WebSocketInterface('wss://192.168.1.133:8089/ws');     // poner aviso si el servidor ws no es alcanzable
        const configuration = {
            sockets  : [ socket ],
            uri      : 'sip:webrtc_client@192.168.1.133',
            password : '5678'
        };

        const ua = new JsSIP.UA(configuration);

        ua.start();
        ua.register();

    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Screen 2</Text>
                <Button
                    // onPress={() => Navigation.pop(this.props.componentId)}
                    onPress={() => this.registerWebRTCPeer()}
                    title="Go Back"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})