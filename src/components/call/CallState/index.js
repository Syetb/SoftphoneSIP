import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, Text } from 'react-native'

import scst from './styles'

class CallState extends Component {
    constructor(props) {
        super(props)

        const timer = setInterval(() => {
            this.onTick()
        }, 1000)

        this.state = {
            timer: timer
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    onTick() {
        if (this.props.call.getState() === "PJSIP_INV_STATE_CONFIRMED" && this.statusTextInput) {
            this.statusTextInput.setNativeProps({text: this.props.call.getFormattedConnectDuration()})
        }
    }

    render() {
        const call = this.props.call
        let description = null

        switch (call.getState()) {
            case 'PJSIP_INV_STATE_NULL':
                description = "Inicializando"
                break
            case 'PJSIP_INV_STATE_CALLING':
            case 'PJSIP_INV_STATE_EARLY':
            case 'PJSIP_INV_STATE_CONNECTING':
                description = "Llamando"
                break
            case 'PJSIP_INV_STATE_INCOMING':
                description = "Llamada entrante"
                break
            case 'PJSIP_INV_STATE_DISCONNECTED':
                if (call.getLastStatusCode() != "PJSIP_SC_OK") {
                    description = call.getLastReason()

                    if (!description) {
                        description = call.getLastStatusCode()
                    }
                } else {
                    description = call.getFormattedConnectDuration()
                }
                break
            default:
                description = call.getFormattedConnectDuration()
                break
        }

        return (
            <View style={scst.container}>
                {
                    this.props.call.getState() === "PJSIP_INV_STATE_CONFIRMED" &&
                        <Text style={scst.text}>
                            Llamada
                        </Text>
                }
                <TextInput
                    ref={(c) => {
                        this.statusTextInput = c
                    }}
                    underlineColorAndroid="transparent"
                    numberOfLines={1}
                    editable={false}
                    style={scst.text}
                    value={description}
                />
            </View>
        )
    }
}

CallState.propTypes = {
    style: Text.propTypes.style,
    call: PropTypes.object.isRequired,
//    onBackspacePress: PropTypes.func,
    onClearPress: PropTypes.func
}

export default CallState
