import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, Image, Modal } from 'react-native'

import Keypad from '../Keypad'
import KeypadInputText from '../KeypadInputText'

import sdtmf from './styles'
import {correctFontSizeForScreen} from "../../../utils/scale";

class DtmfModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            value: ''
        }

        this._onKeyPress = this.onKeyPress.bind(this)
        this._onRequestClose = this.onRequestClose.bind(this)
    }

    onKeyPress(key) {
        this.setState({value: this.state.value + key})
        this.props.onPress && this.props.onPress(key)
    }

    onRequestClose() {
        this.setState({value: ''})
        this.props.onRequestClose()
    }

    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent
                visible={this.props.visible}
                onRequestClose={this._onRequestClose}
            >
                <View style={sdtmf.modalBackground}>
                    <View style={sdtmf.contentBackground}>
                        <View style={sdtmf.titleContainer}>
                            <Text style={sdtmf.titleText}>DTMF</Text>
                            <TouchableOpacity onPress={this._onRequestClose}>
                                <Image source={require('../../../assets/images/modal/close-icon.png')} style={sdtmf.stretch}/>
                            </TouchableOpacity>
                        </View>

                        <KeypadInputText style={sdtmf.keypadInput} value={this.state.value} editable={false}/>

                        <Keypad
                            onKeyPress={this._onKeyPress}
                            style={sdtmf.keypad}
                            keyDigitFontSize={{fontSize: correctFontSizeForScreen(28)}}
                        />
                    </View>
                </View>
            </Modal>
        )
    }
}

DtmfModal.propTypes = {
    visible: Modal.propTypes.visible,
    onPress: PropTypes.func,
    onRequestClose: Modal.propTypes.onRequestClose
}

export default DtmfModal
