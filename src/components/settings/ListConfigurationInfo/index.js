import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import slci from './styles'

const ListConfigurationInfo = ({ style, icon, title, description, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={ [slci.container, style] }>
            <View style={slci.iconContainer}>
                <Image icon={icon}/>
            </View>

            <View style={slci.descriptionContainer}>
                <Text style={slci.descriptionTitle} numberOfLines={1} ellipsizeMode="middle">
                    {title}
                </Text>
                <Text style={slci.descriptionText}>
                    {description}
                </Text>
            </View>

            <View style={slci.goContainer}>
                <Image source={require('../../../assets/images/common/lined-goto.png')}/>
            </View>
        </TouchableOpacity>
    )
}

ListConfigurationInfo.propTypes = {
    style: Text.propTypes.style,
    icon: Image.propTypes.source,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onPress: PropTypes.func
}

export default ListConfigurationInfo
