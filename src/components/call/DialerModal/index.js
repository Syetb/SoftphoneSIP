import React from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity, View, Text, Modal, Platform} from 'react-native'
import KeypadWithActions from '../KeypadWithActions'

import sdml from './styles'
import sc from '../../../assets/styles/containers'

export const parallelTop = Platform.OS === 'ios' ? 20 : 0

const DialerModal = ( { theme, visible, actions, onRequestClose, flexActionModal } ) => {
    const containerStyles = theme === "dark" ? sdml.containerDarkStyle : sdml.containerStyle
    const contentStyles = theme === "dark" ? sdml.containerDarkStyle : sdml.containerStyle
    const touchableStyle = theme === "dark" ? sdml.touchableDarkStyle : sdml.touchableStyle
    const touchableTextStyle = theme === "dark" ? sdml.touchableTextDarkStyle : sdml.touchableTextStyle

    return (
        <Modal
            animationType={"fade"}
            transparent
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View style={[sc.mainContainer, containerStyles, {paddingTop: parallelTop}]}>
                <KeypadWithActions
                    style={[sc.mainContainer, contentStyles]}
                    theme={theme}
                    actions={actions}
                    flexActionModal={flexActionModal}
                />
                <TouchableOpacity onPress={onRequestClose} style={touchableStyle}>
                    <Text style={[sdml.touchableText, touchableTextStyle]}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

DialerModal.propTypes = {
    visible: Modal.propTypes.visible,
    theme: PropTypes.string,
    actions: PropTypes.array.isRequired,
    onRequestClose: Modal.propTypes.onRequestClose,
    flexActionModal: PropTypes.object,
}

export default DialerModal
