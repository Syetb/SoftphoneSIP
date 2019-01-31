import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, TextInput, Image } from 'react-native'

import scpi from './styles'

class CallParallelInfo extends Component {

    constructor(props) {
        super(props)

        const timer = setInterval( () => {
            this.onTick()
        }, 1000)

        this.state = {
            timer: timer
        }

        this._onPress = this.onPress.bind(this)
    }

    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    onTick() {
        if (this.props.call.getState() === "PJSIP_INV_STATE_CONFIRMED" && this.statusTextInput) {
            this.statusTextInput.setNativeProps( { text: this.props.call.getFormattedConnectDuration() } )
        }
    }

    onPress() {
        this.props.onPress && this.props.onPress(this.props.call)
    }

    render() {
        const call = this.props.call
        const description = call.getRemoteFormattedNumber()
        let duration = ""

        if (call.getState() === 'PJSIP_INV_STATE_CONFIRMED') {
            duration = call.getFormattedConnectDuration()
        }

        const icon = call.isHeld() ? require('../../../assets/images/call/icon-paused.png') : require('../../../assets/images/call/icon-active.png')

        return (
            <TouchableOpacity style={[scpi.container, this.props.style]} onPress={this._onPress}>
                <Image style={scpi.icon} source={icon}/>
                <Text numberOfLines={1} style={scpi.description}>{description}</Text>
                <TextInput
                    ref={ (c) => { this.statusTextInput = c } }
                    underlineColorAndroid="transparent"
                    numberOfLines={1}
                    editable={false}
                    style={scpi.duration}
                    value={duration}
                />
            </TouchableOpacity>
        )
    }
}

CallParallelInfo.propTypes = {
    style: Text.propTypes.style,
    call: PropTypes.object.isRequired,
    onPress: PropTypes.func
}

export default CallParallelInfo
