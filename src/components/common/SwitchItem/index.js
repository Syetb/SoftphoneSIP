import React from 'react'
import PropTypes from 'prop-types'
import { View, Switch, Text } from 'react-native'

import ssi from './styles'

const SwitchItem = (props) => {
    return (
        <View style = {ssi.container}>
            <Text style={ssi.switchText}>{props.switchName}</Text>
            <Switch
                disabled
                onValueChange = {props.onToggleSwitch}
                value = {props.switchValue}/>
        </View>
    )
}

SwitchItem.propTypes = {
    switchName: PropTypes.string,
    switchValue: PropTypes.bool,
    onToggleSwitch: PropTypes.func,
}

export default SwitchItem
