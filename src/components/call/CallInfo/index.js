import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import sci from './styles'

const CallInfo = ( { call } ) => {
    let items = null

    if (call.getRemoteName() && call.getRemoteNumber()) {
        items = [
            (<Text key="top" style={sci.remoteNameText} numberOfLines={1} ellipsizeMode="middle">
                { call.getRemoteName() }
            </Text>),

            (<Text key="bot" style={sci.remoteNumberText} numberOfLines={1} ellipsizeMode="middle">
                { call.getRemoteNumber() }
            </Text>)
        ]
    } else if (call.getRemoteNumber()) {
        items = [
            (<Text key="top" style={sci.remoteNameText} numberOfLines={1} ellipsizeMode="middle">
                { call.getRemoteNumber() }
            </Text>)
        ]
    } else {
        items = [
            (<Text key="top" style={sci.remoteNameText} numberOfLines={1} ellipsizeMode="middle">
                { call.getRemoteUri() }
            </Text>)
        ]
    }

    return (
        <View style={sci.container}>
            { items }
        </View>
    )
}

CallInfo.propTypes = {
    call: PropTypes.object.isRequired,
    style: Text.propTypes.style,
//    onBackspacePress: PropTypes.func,
    onClearPress: PropTypes.func
}

export default CallInfo
