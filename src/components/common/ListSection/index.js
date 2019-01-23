import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import sls from './styles'

const ListSection = ( { title } ) => {

    return (
        <LinearGradient colors={['#F8F8F8', '#EDF1F4']} style={sls.gradient}>
            <Text style={sls.text}>
                {title}
            </Text>
        </LinearGradient>
    )
}

ListSection.propTypes = {
    title: PropTypes.string
}

export default ListSection
