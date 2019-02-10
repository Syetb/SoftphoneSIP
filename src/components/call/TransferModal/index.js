import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, Image, Modal } from 'react-native'

import DialerModal from '../DialerModal'

import stm from './styles'

class TransferModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isRedirectModalVisible: false
        }

        this._onBlindTransferRequest = this.onBlindTransferRequest.bind(this)
        this._onBlindTransferPress = this.onBlindTransferPress.bind(this)
        this._onBlindTransferClose = this.onBlindTransferClose.bind(this)
    }

    onBlindTransferRequest() {
        this.setState({
            isRedirectModalVisible: true
        })
    }

    onBlindTransferPress(value) {
        this.setState({
            isRedirectModalVisible: false
        })

        this.props.onBlindTransferPress && this.props.onBlindTransferPress(value)
    }

    onBlindTransferClose() {
        this.setState({
            isRedirectModalVisible: false
        })
        this.props.onRequestClose && this.props.onRequestClose()
    }

    renderOptions(options) {
        const result = []

        for (let i = 0; i < options.length; i++) {
            const opt = options[i]
            const last = i === options.length - 1

            result.push((
                <TouchableOpacity
                    key={opt.key}
                    onPress={opt.callback}
                    style={[stm.optionTouchable, (last ? stm.optionTouchableLast : null)]}
                >
                    <Text style={stm.optionText}>{opt.title}</Text>
                </TouchableOpacity>
            ))
        }

        return result
    }

    render() {

        const calls = this.props.calls
        if (Object.keys(calls).length === 1 || this.state.isRedirectModalVisible) {
            return (
                <DialerModal
                    actions={ [ { icon: "blind-transfer", text: "Blind\nTransfer", callback: this._onBlindTransferPress } ] }
                    theme="dark"
                    visible={this.props.visible}
                    onRequestClose={this._onBlindTransferClose}
                />
            )
        }

        const options = []

        for (const id in calls) {
            if (calls.hasOwnProperty(id)) {
                const c = calls[id]

                if (c.getId() === this.props.call.getId()) {
                    continue
                }

                options.push({
                    key: `merge_${c.getId()}`,
                    title: `Merge with${c.getRemoteFormattedNumber()}`,
                    callback: this.props.onAttendantTransferPress.bind(null, c)
                })
            }
        }

        options.push({
            key: "new_call",
            title: "New call",
            callback: this._onBlindTransferRequest
        })

        return (
            <Modal
                animationType={"fade"}
                transparent
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}
            >
                <View style={stm.modalBackground}>
                    <View style={stm.contentBackground}>
                        <View style={stm.titleContainer}>
                            <Text style={stm.titleText}>Transfer call</Text>
                            <TouchableOpacity onPress={this._onBlindTransferRequest}>
                                <Image source={require('../../../assets/images/modal/close-icon.png')}/>
                            </TouchableOpacity>
                        </View>
                        {this.renderOptions(options)}
                    </View>
                </View>
            </Modal>
        )
    }
}

TransferModal.propTypes = {
    call: PropTypes.object.isRequired,
    calls: PropTypes.object.isRequired,
    visible: Modal.propTypes.visible,
    onRequestClose: Modal.propTypes.onRequestClose,
    onBlindTransferPress: PropTypes.func,
    onAttendantTransferPress: PropTypes.func
}

export default TransferModal
