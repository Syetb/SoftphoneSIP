import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, Modal } from 'react-native'

import sicml from './styles'

const IncomingCallModal = ( { call, onAnswerPress, onDeclinePress } ) => {
    if (!call) {
        return null
    }

    return (
        <Modal
            animationType={"fade"}
            transparent
            visible
            onRequestClose={onDeclinePress}
        >
            <View style={sicml.modalBackground}>
                <View style={sicml.contentBackground}>
                    <View style={sicml.titleContainer}>
                        <Text style={sicml.titleText}>{call.getRemoteFormattedNumber()} esta llamando</Text>
                    </View>

                    <TouchableOpacity onPress={onAnswerPress} style={[sicml.actionTouchable, sicml.actionGreen]}>
                        <Text style={sicml.actionText}>Contestar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onDeclinePress} style={[sicml.actionTouchable, sicml.actionRed]}>
                        <Text style={sicml.actionText}>Rechazar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

IncomingCallModal.propTypes = {
    call: PropTypes.object,
    onAnswerPress: PropTypes.func,
    onDeclinePress: PropTypes.func
}

export default IncomingCallModal
