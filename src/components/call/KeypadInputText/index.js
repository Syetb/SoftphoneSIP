import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, Image } from 'react-native'

import skit from './styles'

const KeypadInputText = ({ style, textStyle, value, editable, onBackspacePress, onClearPress }) => {

    return (
        <View style={[skit.container, style]}>
            <Text
                numberOfLines={1} ellipsizeMode="head"
                style={[skit.inputText, (editable === false ? skit.textNotEditable : null), textStyle]}
            >
                {value}
            </Text>

            {
                !value || value.length === 0 || editable === false ? null :
                    <TouchableOpacity
                        onPress={onBackspacePress}
                        onLongPress={onClearPress}
                        style={skit.clearTouchable}
                    >
                        <Image style={skit.stretch} source={require('../../../assets/images/keypad/input-back.png')}/>
                    </TouchableOpacity>
            }
        </View>
    )
}

KeypadInputText.propTypes = {
    style: Text.propTypes.style,
    textStyle: Text.propTypes.style,
    value: PropTypes.string.isRequired,
    editable: PropTypes.bool,
    onBackspacePress: PropTypes.func,
    onClearPress: PropTypes.func
}

export default KeypadInputText
