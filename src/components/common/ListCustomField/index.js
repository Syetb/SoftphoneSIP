import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Modal, Image, KeyboardAvoidingView } from 'react-native'

import Touchable from '../Touchable'
import slcf from './styles'

class ListCustomField extends Component {

    constructor(props) {
        super(props)

        this.state = {
            active: false,
            text: this.props.value
        }

        this._onModalOpenPress = this.onModalOpenPress.bind(this)
        this._onModalClosePress = this.onModalClosePress.bind(this)
        this._onModalOkPress = this.onModalOkPress.bind(this)
    }

    close() {
        this.setState({
            active: false
        })
    }

    onModalOpenPress() {
        this.setState({
            active: true
        })
    }

    onModalClosePress() {
        this.setState({
            active: false
        })
        this.props.onClosePress && this.props.onClosePress()
    }

    onModalOkPress() {
        this.setState({
            active: false
        })
        this.props.onOkPress && this.props.onOkPress()
    }

    render() {
        let value = this.props.value
        const empty = !this.props.value || this.props.value.length === 0

        if (this.props.valueType === 'password') {
            value = "*".repeat(value.length)
        }

        return (
            <View>
                <Touchable style={slcf.listContainer} onPress={this._onModalOpenPress}>
                    <View style={slcf.listContent}>
                        <Text style={(empty ? slcf.listTitle : slcf.listPlaceholder)}>{this.props.title}</Text>
                        <Text style={(empty ? slcf.listPlaceholder : slcf.listTitle)}>
                            {
                                this.props.value && this.props.value.length > 0 ? value : this.props.placeholder
                            }
                        </Text>
                    </View>
                    <View style={slcf.listIconContainer}>
                        <Image source={require('../../../assets/images/common/lined-goto.png')}/>
                    </View>
                </Touchable>

                <Modal
                    animationType={"fade"}
                    transparent
                    visible={this.state.active}
                    onRequestClose={this._onModalClosePress}
                >
                    <View style={slcf.modalBackground} onStartShouldSetResponderCapture={this.onHandleCapture}>
                        <KeyboardAvoidingView behavior='position'>
                            <View style={slcf.modalContent}>
                                <View style={slcf.modalHeader}>
                                    <Text style={slcf.modalTitle}>{this.props.title}</Text>
                                    <Touchable style={slcf.modalClose} onPress={this._onModalClosePress}>
                                        <Image source={require('../../../assets/images/modal/close-icon.png')}/>
                                    </Touchable>
                                </View>

                                {this.props.children}

                                <Touchable onPress={this._onModalOkPress} style={slcf.modalSubmitTouchable}>
                                    <Text style={slcf.modalSubmitText}>Guardar</Text>
                                </Touchable>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </Modal>
            </View>
        )
    }
}

ListCustomField.propTypes = {
    children: PropTypes.node,
    value: PropTypes.string,
    valueType: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    onClosePress: PropTypes.func,
    onOkPress: PropTypes.func
}

export default ListCustomField
