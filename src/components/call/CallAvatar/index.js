import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import sca from './styles'

const CallAvatar = ( { size } ) => {
    const finalSize = size - 20

    return (
        <View style={ [ sca.circle, { borderRadius: finalSize, height: finalSize, width: finalSize } ] }>
            <Text style={sca.abbr}>
                Avatar
            </Text>
        </View>
    )
}

CallAvatar.propTypes = {
    call: PropTypes.object.isRequired,
    size: PropTypes.number.isRequired
}

export default CallAvatar
