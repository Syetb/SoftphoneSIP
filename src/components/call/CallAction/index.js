import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, Image } from 'react-native'

import sca from './styles'

const CallAction = ( { type, description, onPress } ) => {
    let icon = null
    let toggle = false

    switch (type) {
        case 'add':
            icon = require('../../../assets/images/call/action-add.png')
            break
        case 'earpiece':
            icon = require('../../../assets/images/call/action-speaker.png')
            break
        case 'speaker':
            icon = require('../../../assets/images/call/action-speaker-active.png')
            toggle = true
            break
        case 'merge':
            icon = require('../../../assets/images/call/action-merge.png')
            break
        case 'dtmf':
            icon = require('../../../assets/images/call/action-dtmf.png')
            break
        case 'mute':
            icon = require('../../../assets/images/call/action-mute.png')
            break
        case 'unmute':
            icon = require('../../../assets/images/call/action-mute-active.png')
            toggle = true
            break
        case 'hold':
            icon = require('../../../assets/images/call/action-hold.png')
            break
        case 'unhold':
            icon = require('../../../assets/images/call/action-hold-active.png')
            toggle = true
            break
        case 'park':
            icon = require('../../../assets/images/call/action-park.png')
            break
        case 'transfer':
            icon = require('../../../assets/images/call/action-transfer.png')
            break
        case 'record':
            icon = require('../../../assets/images/call/action-record.png')
            break
    }

    return (
        <View style={sca.container}>
            <TouchableOpacity
                style={ ( toggle ? [ sca.touchable, sca.touchableActive ] : [ sca.touchable, sca.touchableInactive ] ) }
                onPress={onPress}
            >
                <Image resizeMode="contain" style={sca.image} source={icon}/>
            </TouchableOpacity>
            <Text style={sca.text}>{description}</Text>
        </View>
    )
}

CallAction.propTypes = {
    style: Text.propTypes.style,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onPress: PropTypes.func
}

export default CallAction
