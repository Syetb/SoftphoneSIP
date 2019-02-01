import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, View, Text, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { connect } from 'react-redux'
import { goTo, goBack } from "../../actions/navigate";
import * as CallAnimation from './anim'
import {
    answerCall, declineCall, hangupCall, makeCall,
    holdCall, unholdCall, muteCall, unmuteCall, useSpeaker, useEarpiece, dtmfCall, xferCall, xferReplacesCall, redirectCall
} from '../../actions/pjsip'

import CallState from '../../components/call/CallState'
import CallInfo from '../../components/call/CallInfo'
import CallAvatar from '../../components/call/CallAvatar'
import CallControls from '../../components/call/CallControls'
import CallActions from '../../components/call/CallActions'
import CallParallelInfo from '../../components/call/CallParallelInfo'
import TransferModal from '../../components/call/TransferModal'
import DtmfModal from '../../components/call/DtmfModal'
import DialerModal from '../../components/call/DialerModal'
import IncomingCallModal from '../../components/call/IncomingCallModal'

import scs from './styles'
import sc from '../../assets/styles/containers'

class CallScreen extends Component {

    static get options() {
        return {
            topBar: {
                visible: false,
                drawBehind: true,
                title: {
                    text: 'Mi Nueva Cuenta'
                },
                leftButtons: {
                    id: 'toggleButtom',
                    enabled: false
                }
            },
            bottomTabs: {
                visible: false
            }
        }
    }

    constructor(props) {
        super(props)

        const { height: screenHeight, width: screenWidth } = Dimensions.get('window')
        let call = this.props.call

        if (call instanceof Promise) {
            call
                .then(
                    call => this.onInitializationResponse(call),

                    error => this.onInitializationError(error)
                )

            call = null
        }

        this.state = {
            call,
            incomingCall: null,

            isAddModalVisible: false,
            isRedirectModalVisible: false,
            isDtmfModalVisible: false,
            isTransferModalVisible: false,

            screenHeight,
            screenWidth,

            error: null,

            ...CallAnimation.calculateComponentsHeight(screenHeight)
        }

        if (call) {
            this.state = {
                ...this.state,
                ...CallAnimation.calculateInitialDimensions(
                    { ...this.state, totalCalls: Object.keys(props.calls).length },
                    call
                )
            }
        }

        this._onCallAnswer = this.onCallAnswer.bind(this)
        this._onCallHangup = this.onCallHangup.bind(this)
        this._onCallMutePress = this.onCallMutePress.bind(this)
        this._onCallUnMutePress = this.onCallUnMutePress.bind(this)
        this._onCallSpeakerPress = this.onCallSpeakerPress.bind(this)
        this._onCallEarpiecePress = this.onCallEarpiecePress.bind(this)

        this._onCallHoldPress = this.onCallHoldPress.bind(this)
        this._onCallUnHoldPress = this.onCallUnHoldPress.bind(this)

        this._onCallDtmfPress = this.onCallDtmfPress.bind(this)
        this._onCallDtmfKeyPress = this.onCallDtmfKeyPress.bind(this)
        this._onCallDtmfModalClosePress = this.onCallDtmfModalClosePress.bind(this)

        this._onCallTransferPress = this.onCallTransferPress.bind(this)
        this._onCallTransferClosePress = this.onCallTransferClosePress.bind(this)
        this._onCallAttendantTransferPress = this.onCallAttendantTransferPress.bind(this)
        this._onCallBlindTransferPress = this.onCallBlindTransferPress.bind(this)

        this._onCallAddPress = this.onCallAddPress.bind(this)
        this._onCallAddClosePress = this.onCallAddClosePress.bind(this)
        this._onCallAddSubmitPress = this.onCallAddSubmitPress.bind(this)

        this._onCallRedirect = this.onCallRedirectPress.bind(this)
        this._onCallRedirectClosePress = this.onCallRedirectClosePress.bind(this)
        this._onCallRedirectSubmitPress = this.onCallRedirectSubmitPress.bind(this)

        this._onIncomingCallAnswer = this.onIncomingCallAnswer.bind(this)
        this._onIncomingCallDecline = this.onIncomingCallDecline.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        // Remember latest state of current call, to be able display call information after removal from state
        if ( ( !this.state.call && nextProps.call && !(nextProps.call instanceof Promise) ) ||
            ( this.state.call && nextProps.calls.hasOwnProperty(this.state.call.getId()) ) ) {

            const prevCall = this.state.call ? this.state.call : nextProps.call
            let call = nextProps.calls[prevCall.getId()]

            if (!call) {
                call = prevCall
            }

            const calls = Object.keys(nextProps.calls).map((key) => nextProps.calls[key])
            const init = !this.state.call && nextProps.call

            // Handle incoming call
            let incomingCall = this.state.incomingCall

            if (!incomingCall && calls.length > 1) {
                for (const c of calls) {
                    if (c.getId() === call.getId()) {
                        continue
                    }

                    if (c.getState() === "PJSIP_INV_STATE_INCOMING") {
                        incomingCall = c
                    }
                }
            } else if (incomingCall) {
                let exist = false

                for (const c of calls) {
                    if (c.getId() === incomingCall.getId()) {
                        exist = true
                        break
                    }
                }

                if (!exist) {
                    incomingCall = null
                }
            }

            if (init) {
                this.setState({
                    call,
                    incomingCall,
                    ...CallAnimation.calculateInitialDimensions({
                        ...this.state,
                        totalCalls: Object.keys(nextProps.calls).length
                    }, call)
                })
            } else {
                CallAnimation.animateCallState({...this.state, totalCalls: calls.length}, call)
                this.setState({ call, incomingCall })
            }

            if (call.getState() === "PJSIP_INV_STATE_DISCONNECTED") {
                this.props.onCallEnd && this.props.onCallEnd(call)
            }
        }
    }

    onInitializationResponse(call) {
        let state = {
            call: call
        }

        state = {
            ...state,
            ...CallAnimation.calculateInitialDimensions({
                ...this.state,
                ...state,
                totalCalls: Object.keys(this.props.calls).length
            }, call)
        }

        this.setState(state)
    }

    onInitializationError(reason) {
        this.setState( { error: reason } )
        this.props.onCallEnd && this.props.onCallEnd(this.state.call)
    }

    onCallAnswer() {
        this.props.onCallAnswer && this.props.onCallAnswer(this.state.call)
    }

    onCallHangup() {
        this.props.onCallHangup && this.props.onCallHangup(this.state.call)
    }

    // onCallEnd()

    onCallAddPress() {
        // TODO: Put local call on hold while typing digits
        this.setState( { isAddModalVisible: true } )
    }

    onCallAddClosePress() {
        this.setState( { isAddModalVisible: false } )
    }

    onCallAddSubmitPress(destination) {
        this.setState( { isAddModalVisible: false } )
        this.props.onCallAdd && this.props.onCallAdd(this.state.call, destination)
    }

    // onCallSelect()

    onIncomingCallAnswer() {
        this.setState( { incomingCall: null } )
        this.props.onIncomingCallAnswer && this.props.onIncomingCallAnswer(this.state.incomingCall)
    }

    onIncomingCallDecline() {
        this.setState( { incomingCall: null } )
        this.props.onIncomingCallDecline && this.props.onIncomingCallDecline(this.state.incomingCall)
    }

    onCallHoldPress() {
        this.props.onCallHold && this.props.onCallHold(this.state.call)
    }

    onCallUnHoldPress() {
        this.props.onCallUnHold && this.props.onCallUnHold(this.state.call)
    }

    onCallMutePress() {
        this.props.onCallMute && this.props.onCallMute(this.state.call)
    }

    onCallUnMutePress() {
        this.props.onCallUnMute && this.props.onCallUnMute(this.state.call)
    }

    onCallSpeakerPress() {
        this.props.onCallSpeaker && this.props.onCallSpeaker(this.state.call)
    }

    onCallEarpiecePress() {
        this.props.onCallEarpiece && this.props.onCallEarpiece(this.state.call)
    }

    onCallDtmfPress() {
        this.setState( { isDtmfModalVisible: true } )
    }

    onCallDtmfKeyPress(key) {
        this.props.onCallDtmf && this.props.onCallDtmf(this.state.call, key)
    }

    onCallDtmfModalClosePress() {
        this.setState( { isDtmfModalVisible: false } )
    }

    onCallTransferPress() {
        // TODO: Put local call on hold while typing digits

        console.log("onCallTransferPress")
        this.setState( { isTransferModalVisible: true } )
    }

    onCallTransferClosePress() {
        this.setState( { isTransferModalVisible: false } )
    }

    onCallAttendantTransferPress(destinationCall) {
        this.setState( { isTransferModalVisible: false } )
        this.props.onCallAttendantTransfer && this.props.onCallAttendantTransfer(this.state.call, destinationCall)
    }

    onCallBlindTransferPress(value) {
        if (value.length > 0) {
            this.setState( { isTransferModalVisible: false } )
            this.props.onCallBlindTransfer && this.props.onCallBlindTransfer(this.state.call, value)
        }
    }

    onCallRedirect() {
        this.props.onCallRedirect && this.props.onCallRedirect(this.state.call)
    }

    onCallRedirectPress() {
        this.setState( { isRedirectModalVisible: true } )
    }

    onCallRedirectClosePress() {
        this.setState( { isRedirectModalVisible: false } )
    }

    onCallRedirectSubmitPress(destination) {
        if (destination.length > 0) {
            this.setState( { isRedirectModalVisible: false } )
            this.props.onCallRedirect && this.props.onCallRedirect(this.state.call, destination)
        }
    }


    renderSimultaniousCalls() {
        const activeCall = this.state.call
        let result = []

        let i = 0
        for (const id in this.props.calls) {
            if (this.props.calls.hasOwnProperty(id) && id != activeCall.getId()) { // TODO: Check why type of ID is different
                const call = this.props.calls[id]

                result.push((
                    <CallParallelInfo
                        key={`parallel-${call.getId()}`}
                        call={call}
                        onPress={this.props.onCallSelect}
                        style={{marginTop: i === 0 ? 0 : 5}}
                    />
                ))
            }

            i++
        }

        return (
            <View style={ { position: 'absolute', top: 5, width: this.state.screenWidth } }>
                {result}
            </View>
        )
    }

    renderError() {
        return (
            <LinearGradient colors={['#2a5743', '#14456f']} style={sc.mainContainer}>
                <View style={scs.errorContainer}>
                    <Text style={scs.errorText}>{this.state.error}</Text>
                </View>
            </LinearGradient>
        )
    }

    renderCallWait() {
        return (
            <LinearGradient colors={['#2a5743', '#14456f']} style={sc.mainContainer}>
                <View style={scs.initContainer}>
                    <Text style={scs.initText}>Please wait while call initialized</Text>
                </View>
            </LinearGradient>
        )
    }

    render() {
        const call = this.state.call
        const calls = this.props.calls

        if (this.state.error) {
            return this.renderError()
        }

        if (!call) {
            return this.renderCallWait()
        }

        if (this.props.isScreenLocked === true) {

            return (
                <View style={ { flex: 1, backgroundColor: "#000" } }/>
            )
        }

        return (
            <LinearGradient colors={['#2a5743', '#14456f']} style={sc.mainContainer}>
                <View style={sc.mainContainer}>
                    { this.renderSimultaniousCalls() }

                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: this.state.infoOffset,
                            height: this.state.infoHeight,
                            width: this.state.screenWidth
                        }}
                    >
                        <CallInfo call={call}/>
                    </Animated.View>
                    <Animated.View
                        style={{
                            alignItems: 'center',
                            position: 'absolute',
                            top: this.state.avatarOffset,
                            opacity: this.state.avatarOpacity,
                            height: this.state.avatarHeight,
                            width: this.state.screenWidth
                        }}
                    >
                        <CallAvatar
                            call={call}
                            size={this.state.avatarHeight}
                        />
                    </Animated.View>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: this.state.stateOffset,
                            height: this.state.stateHeight,
                            width: this.state.screenWidth
                        }}
                    >
                        <CallState call={call}/>
                    </Animated.View>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: this.state.actionsOffset,
                            height: this.state.actionsHeight,
                            opacity: this.state.actionsOpacity,
                            flexDirection: 'row',
                            width: this.state.screenWidth
                        }}
                    >
                        <CallActions
                            call={call}
                            style={{flex: 1}}
                            onAddPress={this._onCallAddPress}
                            onMutePress={this._onCallMutePress}
                            onUnMutePress={this._onCallUnMutePress}
                            onSpeakerPress={this._onCallSpeakerPress}
                            onEarpiecePress={this._onCallEarpiecePress}
                            onTransferPress={this._onCallTransferPress}
                            onHoldPress={this._onCallHoldPress}
                            onUnHoldPress={this._onCallUnHoldPress}
                            onDTMFPress={this._onCallDtmfPress}
                        />
                    </Animated.View>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: this.state.buttonsOffset,
                            height: this.state.buttonsHeight,
                            alignItems: 'center',
                            width: this.state.screenWidth
                        }}
                    >
                        <CallControls
                            onAnswerPress={this._onCallAnswer}
                            onHangupPress={this._onCallHangup}
                            onRedirectPress={this._onCallRedirect}
                            call={call}
                        />
                    </Animated.View>

                    <DialerModal
                        actions={[ { icon: "call", text: "Call", callback: this._onCallAddSubmitPress } ]}
                        visible={this.state.isAddModalVisible}
                        onRequestClose={this._onCallAddClosePress}
                    />
                    <DialerModal
                        actions={[ { icon: "blind-transfer", text: "Redirect", callback: this._onCallRedirectSubmitPress } ]}
                        theme="dark"
                        visible={this.state.isRedirectModalVisible}
                        onRequestClose={this._onCallRedirectClosePress}
                    />

                    <TransferModal
                        call={call}
                        calls={calls}
                        visible={this.state.isTransferModalVisible}
                        onRequestClose={this._onCallTransferClosePress}
                        onBlindTransferPress={this._onCallBlindTransferPress}
                        onAttendantTransferPress={this._onCallAttendantTransferPress}
                    />

                    <DtmfModal
                        visible={this.state.isDtmfModalVisible}
                        onRequestClose={this._onCallDtmfModalClosePress}
                        onPress={this._onCallDtmfKeyPress}
                    />

                    <IncomingCallModal
                        call={this.state.incomingCall}
                        onAnswerPress={this._onIncomingCallAnswer}
                        onDeclinePress={this._onIncomingCallDecline}
                    />

                </View>
            </LinearGradient>
        )
    }
}

CallScreen.propTypes = {
    call: PropTypes.object,
    calls: PropTypes.object,
    isScreenLocked: PropTypes.bool,
    onCallAnswer: PropTypes.func,
    onCallHangup: PropTypes.func,
    onCallEnd: PropTypes.func,
    onCallAdd: PropTypes.func,
    onCallSelect: PropTypes.func,
    onIncomingCallAnswer: PropTypes.func,
    onIncomingCallDecline: PropTypes.func,
    onCallHold: PropTypes.func,
    onCallUnHold: PropTypes.func,
    onCallMute: PropTypes.func,
    onCallUnMute: PropTypes.func,
    onCallSpeaker: PropTypes.func,
    onCallEarpiece: PropTypes.func,
    onCallDtmf: PropTypes.func,
    onCallBlindTransfer: PropTypes.func,
    onCallAttendantTransfer: PropTypes.func,
    onCallRedirect: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        calls: state.pjsip.calls,
        call: state.navigate.current.call,
        isScreenLocked: state.pjsip.isScreenLocked
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCallAnswer: (call) => dispatch(answerCall(call)),

        onCallHangup: (call) => dispatch(hangupCall(call)),

        onCallEnd: (call) => {
            setTimeout( () => {

                dispatch( async (dispatch, getState) => {
                    const calls = getState().pjsip.calls
                    const route = getState().navigate.current

                    const doDirectRoute = () => dispatch(goBack())   //dispatch Return to previous screen once call end.

                    const doRoute = (call) => {
                        if (calls.hasOwnProperty(call.getId())) {
                            return
                        }

                        // Open active call once current call ends.
                        for (const id in calls) {
                            if (calls.hasOwnProperty(id)) { return dispatch(goTo(calls[id])) }
                        }

                        // Return to previous screen once call end.
                        return dispatch(goBack())
                    }

                    if (route.name !== 'CallScreen') {
                        return
                    }

                    if (route.call instanceof Promise) {
                        route.call.then(doRoute, doDirectRoute)

                    } else {
                        doRoute(route.call)
                    }
                })

            }, 2000)
        },

        onCallAdd: (call, destination) => dispatch(makeCall(destination, call)),

        onCallSelect: async (call) => dispatch(goTo( { name: 'CallScreen', call } )),

        onIncomingCallAnswer: async (call) => {
            dispatch(answerCall(call))
            dispatch(await goTo( { name: 'CallScreen', call } ))
        },

        onIncomingCallDecline: (call) => dispatch(declineCall(call)),

        onCallHold: (call) => dispatch(holdCall(call)),

        onCallUnHold: (call) => dispatch(unholdCall(call)),

        onCallMute: (call) => dispatch(muteCall(call)),

        onCallUnMute: (call) => dispatch(unmuteCall(call)),

        onCallSpeaker: (call) => dispatch(useSpeaker(call)),

        onCallEarpiece: (call) => dispatch(useEarpiece(call)),

        onCallDtmf: (call, key) => dispatch(dtmfCall(call, key)),

        onCallAttendantTransfer: (call, destination) => dispatch(xferReplacesCall(call, destination)),

        onCallBlindTransfer: (call, destination) => dispatch(xferCall(call, destination)),

        onCallRedirect: (call, destination) => dispatch(redirectCall(call, destination))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CallScreen)

