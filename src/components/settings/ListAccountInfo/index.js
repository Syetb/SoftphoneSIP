import React  from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import colorify from '../../../utils/colorify'
import abbr from '../../../utils/abbr'
import slai from './styles'

const ListAccountInfo = ({ style, account, connectivity, onPress }) => {
    const acc = account
    const registration = acc.getRegistration()

    const accountColor = colorify(acc.getURI())
    const presenceColor = registration.isActive() && registration.getStatusText() === "OK" ? "#34D023" : "#CCC"
    let status = registration.getStatusText()

    if (connectivity === false) {
        status = "No connectivity or Limited"
    }

    return (
        <TouchableOpacity onPress={onPress} style={[slai.container, style]}>
            <View style={[slai.abbrContainer, {backgroundColor: accountColor}]}>
                <Text style={slai.abbrText}>{abbr(acc.getName())}</Text>
                <View style={[slai.abbrPresence, {backgroundColor: presenceColor}]}/>
            </View>
            <View style={slai.infoContainer}>
                <Text style={slai.infoTitle} numberOfLines={1} ellipsizeMode="middle">{acc.getURI()}</Text>
                <Text style={slai.infoStatus}>{status}</Text>
            </View>
            <View style={slai.goContainer}>
                <Image source={require('../../../assets/images/common/lined-goto.png')}/>
            </View>
        </TouchableOpacity>
    )
}

ListAccountInfo.propTypes = {
    style: Text.propTypes.style,
    account: PropTypes.object,
    connectivity: PropTypes.bool,
    onPress: PropTypes.func
}

export default ListAccountInfo
