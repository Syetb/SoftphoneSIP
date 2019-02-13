import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Text, Image, Dimensions } from 'react-native'

import { noop } from 'lodash'

import Keypad from '../Keypad'
import KeypadInputText from '../KeypadInputText'

import sk from '../Keypad/styles'
import ska, { inputStyle, textStyle, keyUnderlayColor } from './styles'

export default class KeypadWithActions extends Component {

    constructor(props) {
        super(props)

        const { height, width } = Dimensions.get('window')
        const ratio = height / width

        this.state = {
            value: '',
            actionSize: false,
            heightRatio: ratio * ratio
        }

        this._onClearPress = this.onClearPress.bind(this)
        this._onBackspacePress = this.onBackspacePress.bind(this)
        this._onKeyPress = this.onKeyPress.bind(this)
        this._onDefineKeySize = this.onDefineKeySize.bind(this)

        this._onActionCallBack = this.onActionCallBack.bind(this)
    }

    onBackspacePress() {
        this.setState({
            value: this.state.value.substr(0, this.state.value.length - 1)
        })
    }

    onClearPress() {
        this.setState({
            value: ''
        })
    }

    onKeyPress(key) {
        this.setState({
            value: this.state.value + key
        })
    }

    onDefineKeySize({width}) {
        this.setState({
            actionSize: width
        })
    }

    onActionCallBack(destination) {
        this._onClearPress()

        if(this.props.status && this.props.status !== 'Registrado') {
            alert('Servicio no disponible')
            return
        }

        this.props.actions[0].callback(destination)
    }

    renderActionKey(type, description, callback = noop) {
        let icon = null
        const actionTouchableStyle = this.props.theme === "dark" ? ska.actionDarkTouchable : null
        const actionTextStyle = this.props.theme === "dark" ? ska.actionDarkText : null

        switch (type) {
            case 'call':
                icon = require('../../../assets/images/keypad/call-icon.png')
                break
            case 'message':
                icon = require('../../../assets/images/keypad/message-icon.png')
                break
            case 'redirect':
                icon = require('../../../assets/images/call/action-redirect.png')
                break
            case 'attendant-transfer':
                icon = require('../../../assets/images/call/action-attendant-transfer-icon.png')
                break
            case 'blind-transfer':
                icon = require('../../../assets/images/call/action-blind-transfer.png')
                break
        }

        if (!this.state.actionSize) {
            return (
                <View key={"action" + type} style={{flex: 0.202}}/>
            )
        }

        const touchableStyles = [
            { width: this.state.actionSize - 27, height: this.state.actionSize - 27 },
            ska.actionTouchable,
            actionTouchableStyle
        ]

        if (type === 'call') {
            touchableStyles.push(ska.actionGreenTouchable)
        }

        return (
            <View key={"action" + type} style={ska.action}>
                <TouchableOpacity onPress={() => {callback(this.state.value)}} style={touchableStyles}>
                    <Image source={icon}/>
                </TouchableOpacity>
                <Text style={[ska.actionText, actionTextStyle]}>{description}</Text>
            </View>
        )
    }

    render() {

        const { theme } = this.props
        const { heightRatio } = this.state
        const actions = []

        if( this.props.actions === 3) {
            const acts = this.props.actions

            actions.push(<View key='view-1' style={sk.outerLineOffset}/>)
            actions.push(this.renderActionKey(acts[0]['icon'], acts[0]['text'], acts[0]['callback']))

            actions.push(<View key='view-2' style={sk.innerLineOffset}/>)
            actions.push(this.renderActionKey(acts[1]['icon'], acts[1]['text'], acts[1]['callback']))

            actions.push(<View key='view-3' style={sk.innerLineOffset}/>)
            actions.push(this.renderActionKey(acts[2]['icon'], acts[2]['text'], acts[2]['callback']))

            actions.push(<View key='view-4' style={sk.outerLineOffset}/>)

        } else {
            for( const action of this.props.actions ) {
                actions.push(this.renderActionKey(action['icon'], action['text'], this._onActionCallBack))
            }
        }

        return(
            <View style={this.props.style}>
                <KeypadInputText
                    style={inputStyle(heightRatio, theme)}
                    textStyle={textStyle(theme)}
                    value={this.state.value}
                    onBackspacePress={this._onBackspacePress}
                    onClearPress={this._onClearPress}
                />
                <View style={{ flex: 0.008 * this.state.heightRatio }}/>
                <Keypad
                    style={ { flex: 0.75} }
                    keyStyle={ { backgroundColor: 'transparent' } }
                    keyUnderlayColor={ keyUnderlayColor(theme) }
                    keyTextStyle={ textStyle(theme) }
                    onKeyPress={ this._onKeyPress }
                    onDefineKeySize={ this._onDefineKeySize }
                />
                <View style={ {flex: 0.002 } } />
                <View style={ ska.actionsWrapper }>
                    { actions }
                </View>
            </View>
        )
    }
}

KeypadWithActions.propTypes = {
    style: Text.propTypes.style,
    actions: PropTypes.array,
    theme: PropTypes.string,
    status: PropTypes.string
}
