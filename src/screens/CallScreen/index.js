import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, View, Text, Dimensions, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { connect } from 'react-redux'
import { goTo, goBack, goAndReplace } from "../../actions/navigate";
import * as CallAnimation from './anim'
import {
    answerCall, declineCall, hangupCall, makeCall,
    holdCall, unholdCall, muteCall, unmuteCall, useSpeaker, useEarpiece, dtmfCall, xferCall, xferReplacesCall, redirectCall
} from '../../actions/pjsip'

import CallState from '../../components/call/CallState'
import CallInfo from '../../components/call/CallInfo'
import CallAvatar from '../../components/call/CallAvatar'
import CallControls, { PJSIP_INV_STATE_INCOMING } from '../../components/call/CallControls'
import CallActions from '../../components/call/CallActions'
import CallParallelInfo from '../../components/call/CallParallelInfo'
import TransferModal from '../../components/call/TransferModal'
import DtmfModal from '../../components/call/DtmfModal'
import DialerModal from '../../components/call/DialerModal'
import IncomingCallModal from '../../components/call/IncomingCallModal'

import scs from './styles'
import sc from '../../assets/styles/containers'

const parallelTop = Platform.OS === 'ios' ? 18 : 0

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
                visible: false,
                drawBehind: true,
            }
        }
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log('\nstatic getDerivedStateFromProps() executed')
    //     console.log('nextProps es: ', nextProps)
    //     console.log('prevState es: ', prevState)
    //
    //     console.log('_______________________________________________')
    //     console.log('nextProps es: ', nextProps)
    //     console.log('this.state.call es: ', prevState.call)
    //     console.log('nextProps.call es: ', nextProps.call)
    //     console.log('nextProps.calls es: ', nextProps.calls)
    //     console.log('!(nextProps.call instanceof Promise) es: ', !(nextProps.call instanceof Promise))
    //
    //     console.log('1er caso if(): Que no existe call en el localState y que exista call en el nextLocalState es: ', !prevState && nextProps.call)
    //     console.log('Y que call en el nextLocalState no sea una instancia de Promise es decir que yo no haga la llamada es: ', !(nextProps.call instanceof Promise))
    //
    //     console.log('2do caso if() Que exista call en el localState y que calls de nextLocalState contenga a call de localState es: ', (prevState.call && nextProps.calls.hasOwnProperty(prevState.call.getId())) )
    //
    //     console.log('1ER CASO ES: ', ( !prevState.call && nextProps.call && !(nextProps.call instanceof Promise) ))
    //     console.log('2DO CASO ES: ', ( prevState.call && nextProps.calls.hasOwnProperty(prevState.call.getId()) ))
    //
    //     if( ( !prevState.call && nextProps.call && !(nextProps.call instanceof Promise) ) || ( prevState.call && nextProps.calls.hasOwnProperty(prevState.call.getId()) ) )
    //         console.log('INGRESA A if() para logica getDerivedStateFromProps()')
    //     else {
    //         console.log('NOOOO INGRESA A if() - getDerivedStateFromProps()')
    //     }
    //
    //     console.log('_______________________________________________')
    //
    //     // Remember latest state of current call, to be able display call information after removal from state
    //     if ( ( !prevState.call && nextProps.call && !(nextProps.call instanceof Promise) ) ||
    //         ( prevState.call && nextProps.calls.hasOwnProperty(prevState.call.getId()) ) ) {
    //
    //         if( ( !prevState.call && nextProps.call && !(nextProps.call instanceof Promise) ) )
    //             console.log('Ingresa a logica getDerivedStateFromProps() por 1er CASO: prevState.call es null: ', prevState.call)
    //         else
    //             console.log('Ingresa a logica getDerivedStateFromProps() por 2do CASO: nextProps.calls contiene a prevState.call: ', nextProps.calls.hasOwnProperty(prevState.call.getId()))
    //
    //
    //         // nextProps.call nunca se actualiza el calling State - "PJSIP_INV_STATE_INCOMING"
    //         const prevCall = prevState.call ? prevState.call : nextProps.call
    //         let call = nextProps.calls[prevCall.getId()]
    //
    //         console.log('Si existe call en localState prevCall es localState sino es nextLocalState es: ', prevCall)
    //         console.log('call es sacado de nextProps.calls usando prevCall.getId() es: ', call)
    //
    //         if (!call) {
    //             console.log('No existe call sacado desde nextProps.calls')
    //             call = prevCall
    //             console.log('call es exactamente igual a prevCall')
    //         }
    //
    //         const calls = Object.keys(nextProps.calls).map((key) => nextProps.calls[key])
    //         console.log('calls mapped es: ', calls)
    //
    //         const init = !prevState.call && nextProps.call
    //         console.log('Init es true si no existe call en localState y si call existe en nextProps es: ', init)
    //
    //         // Handle incoming call
    //         let incomingCall = prevState.incomingCall
    //         console.log('\nHandle incoming call')
    //         console.log('this.state.incomingCall es: ', prevState.incomingCall)
    //         console.log('incomingCall es: ', incomingCall)
    //
    //         console.log('!incomingCall es: ', !incomingCall)
    //         console.log('calls.length > 1 es: ', calls.length > 1)
    //         if (!incomingCall && calls.length > 1) {
    //             console.log('DENTRO DE if (!incomingCall && calls.length > 1)')
    //
    //             for (const cll of calls) {
    //                 console.log('for (const cll of calls)')
    //                 if (cll.getId() === call.getId()) {
    //                     console.log('cll.getId() === call.getId() es: ', cll.getId() === call.getId())
    //                     console.log('continue???')
    //                     continue
    //                 }
    //
    //                 console.log('cll.getState() es: ', cll.getState())
    //                 if (cll.getState() === PJSIP_INV_STATE_INCOMING) {
    //                     console.log('cll.getState() === PJSIP_INV_STATE_INCOMING es: ', cll.getState() === PJSIP_INV_STATE_INCOMING)
    //                     incomingCall = cll
    //                     console.log('incomingCall es: ', incomingCall)
    //                      break
    //                 }
    //             }
    //
    //         } else if (incomingCall) {
    //             console.log('DENTRO DE else if (incomingCall)')
    //             console.log('incomingCall es: ', incomingCall)
    //             console.log('calls.length es: ', calls.length)
    //
    //             let exist = false
    //
    //             for (const call of calls) {
    //                 console.log('for (const call of calls)')
    //
    //                 console.log('call.getId() === incomingCall.getId() es: ', call.getId() === incomingCall.getId())
    //                 if (call.getId() === incomingCall.getId()) {
    //                     exist = true
    //                     console.log('exist es: ', exist);
    //                     console.log('break????')
    //                     break
    //                 }
    //             }
    //
    //             console.log('Fuera de for()')
    //             console.log('exist es: ', exist)
    //
    //             if (exist) {
    //                 incomingCall = null
    //                 console.log('incomingCall es: ', incomingCall)
    //                 console.log('incomingCall nulo?? porque o para que?')
    //                 console.log('Para que el modal incomingCall desaparezca una vez que se ha aceptado la llamadda')
    //                 console.log('Y para poder seguir buscando posibles incoming calls')
    //             }
    //         }
    //
    //         if (init) {
    //             console.log('DENTRO DE init ??? ')
    //             console.log('Por que y como paso? revisar logs')
    //
    //             console.log('Aqui es donde se usa setState() que hace que todo se vuelva a renderizar')
    //             console.log('Totalmente confirmado que se hace un reset al this.state localState de CallScreen component')
    //
    //             console.log('Seteados setState a call e incomingCall')
    //             console.log('call es: ', call)
    //             console.log('incomingCall es: ', incomingCall)
    //
    //             this.setState({
    //                 call,
    //                 incomingCall,
    //                 ...CallAnimation.calculateInitialDimensions(
    //                     { ...this.state, totalCalls: Object.keys(nextProps.calls).length },
    //                     call
    //                 )
    //             })
    //
    //         } else {
    //             console.log('No se realiza un reset al this.state localState')
    //             console.log('Se actualiza la interfaz dependiendo del estado de calling state')
    //             console.log('-----Probablemente aqui es donde se rerenderiza los parallelCalls-----')
    //             console.log('Se hace un setState a call e incomingCall')
    //             console.log('call es: ', call)
    //             console.log('incomingCall es: ', incomingCall)
    //
    //             return { call, incomingCall }
    //
    //             // CallAnimation.animateCallState( { ...this.state, totalCalls: calls.length }, call)
    //             // this.setState( { call, incomingCall } )
    //         }
    //
    //         // if (call.getState() === "PJSIP_INV_STATE_DISCONNECTED") {
    //         //     console.log('Se termina la llamada por medio de la variable call: ', call.getState())
    //         //     this.props.onCallEnd && this.props.onCallEnd(call)
    //         // }
    //
    //     }
    //
    //     // Return null to indicate no change to state.
    //     return null;
    //
    // }

    constructor(props) {
        super(props)
        console.log('\nCallScreen - constructor() executed!')
        console.log('ANTES this.state es: ', this.state)
        console.log('this.props es: ', this.props)

        const { height: screenHeight, width: screenWidth } = Dimensions.get('window')
        let call = this.props.call

        // When user makes call
        if (call instanceof Promise) {
            console.log('call es instanceof Promise')
            call
                .then(
                    call => this.onInitializationResponse(call),

                    error => this.onInitializationError(error)
                )

            call = null
            console.log('call ahora es null')
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
            console.log('existe call - recibiendo llamada: es: ', call.getState())
            this.state = {
                ...this.state,
                ...CallAnimation.calculateInitialDimensions(
                    { ...this.state, totalCalls: Object.keys(props.calls).length },
                    call
                )
            }
        }

        console.log('DESPUES this.state es: ', this.state)

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

    // componentDidUpdate(prevProps, prevState) {
    //     console.log('componentDidUpdate(prevProps, prevState)')
    //
    //     console.log('prevProps es: ', prevProps)
    //     console.log('prevState es: ', prevState)
    //     console.log('this.props es: ', this.props)
    //
    //     console.log('this.props.calls.hasOwnProperty(prevState.call.getId()) es: ', this.props.calls.hasOwnProperty(prevState.call.getId()))
    //     console.log('prevState.call.getId() es: ', prevState.call.getId())
    //     console.log('prevState.call.getStatus() es: ', prevState.call.getStateText())
    //     //console.log('this.props.calls[prevState.call.getId()].getStatus() es: ', this.props.calls[prevState.call.getId()].getStateText())
    //
    //     const { call, incomingCall } = prevState
    //
    //     if ( this.props.calls.hasOwnProperty(prevState.call.getId()) && prevState.call.getStateText() !== this.props.calls[prevState.call.getId()].getStateText() ) {
    //
    //         CallAnimation.animateCallState( { ...this.state, totalCalls: prevProps.calls.length }, call)
    //
    //         this.setState( { call, incomingCall } )
    //     }
    //
    //     if (call.getState() === "PJSIP_INV_STATE_DISCONNECTED") {
    //         console.log('Se termina la llamada por medio de la variable call: ', call.getState())
    //         this.props.onCallEnd && this.props.onCallEnd(call)
    //     }
    // }

    componentWillReceiveProps(nextProps) {
        console.log('\ncomponentWillReceiveProps(nextProps) executed')

        console.log('nextProps es: ', nextProps)
        console.log('this.state.call es: ', this.state.call)
        console.log('nextProps.call es: ', nextProps.call)
        console.log('nextProps.calls es: ', nextProps.calls)
        console.log('!(nextProps.call instanceof Promise) es: ', !(nextProps.call instanceof Promise))

        console.log('1er caso if(): Que no existe call en el localState y que exista call en el nextLocalState es: ', !this.state.call && nextProps.call)
        console.log('Y que call en el nextLocalState no sea una instancia de Promise es decir que yo no haga la llamada es: ', !(nextProps.call instanceof Promise))

        console.log('2do caso if(): Que exista call en el localState y que calls de nextLocalState contenga a call de localState es: ', (this.state.call && nextProps.calls.hasOwnProperty(this.state.call.getId())) )

        console.log('1ER CASO ES: ', ( !this.state.call && nextProps.call && !(nextProps.call instanceof Promise) ))
        console.log('2DO CASO ES: ', ( this.state.call && nextProps.calls.hasOwnProperty(this.state.call.getId()) ))

        if( ( !this.state.call && nextProps.call && !(nextProps.call instanceof Promise) ) || ( this.state.call && nextProps.calls.hasOwnProperty(this.state.call.getId()) ) )
            console.log('INGRESA A if() para logica componentWillReceiveProps()')
        else {
            console.log('NOOOO INGRESA A if() - componentWillReceiveProps()')
        }

        // Remember latest state of current call, to be able display call information after removal from state
        // todo condicion para cerrar active call actual
        if ( ( this.state.call.getState() === 'PJSIP_INV_STATE_DISCONNECTED' && nextProps.call && this.state.call.getId() !== nextProps.call.getId() && !(nextProps.call instanceof Promise) ) ||
            ( this.state.call && nextProps.calls.hasOwnProperty(this.state.call.getId()) ) ) {

            if( ( !this.state.call && nextProps.call && !(nextProps.call instanceof Promise) ) )
                console.log('Ingresa a logica componentWillReceiveProps() por 1er CASO: this.state.call es null: ', this.state.call)
            else
                console.log('Ingresa a logica componentWillReceiveProps() por 2do CASO: nextProps.calls contiene a this.state.call: ', nextProps.calls.hasOwnProperty(this.state.call.getId()))

            // nextProps.call nunca se actualiza el calling State - "PJSIP_INV_STATE_INCOMING"
            // const prevCall = this.state.call ? this.state.call : nextProps.call
            // todo condicion si incomingCall exists y hacer que call = nextProps.call
            const isIncomingCall = !(nextProps.call instanceof Promise) && this.state.call.getId() !== nextProps.call.getId()

            // const prevCall = this.state.call && !this.state.resetCall ? this.state.call : nextProps.call
            const prevCall = this.state.call && !isIncomingCall ? this.state.call : nextProps.call
            let call = nextProps.calls[prevCall.getId()]

            console.log('Si existe call en localState prevCall es localState sino es nextLocalState es: ', prevCall)
            console.log('call es sacado de nextProps.calls usando prevCall.getId() es: ', call)

            if (!call) {
                console.log('No existe call sacado desde nextProps.calls')
                call = prevCall
                console.log('call es exactamente igual a prevCall')
            }

            const calls = Object.keys(nextProps.calls).map((key) => nextProps.calls[key])
            console.log('calls mapped es: ', calls)

            // const init = (!this.state.call || this.state.resetCall) && nextProps.call
            const init = (!this.state.call || isIncomingCall) && nextProps.call
            console.log('Init es true si no existe call en localState y si call existe en nextProps es: ', init)

            // Handle incoming call
            let incomingCall = this.state.incomingCall
            console.log('\nHandle incoming call')
            console.log('this.state.incomingCall es: ', this.state.incomingCall)
            console.log('incomingCall es: ', incomingCall)

            console.log('!incomingCall es: ', !incomingCall)
            console.log('calls.length > 1 es: ', calls.length > 1)
            if (!incomingCall && calls.length > 1) {
                console.log('DENTRO DE if (!incomingCall && calls.length > 1)')

                for (const cll of calls) {
                    console.log('for (const cll of calls)')
                    if (cll.getId() === call.getId()) {
                        console.log('cll.getId() === call.getId() es: ', cll.getId() === call.getId())
                        console.log('continue???')
                        continue
                    }

                    console.log('cll.getState() es: ', cll.getState())
                    if (cll.getState() === PJSIP_INV_STATE_INCOMING) {
                        console.log('cll.getState() === PJSIP_INV_STATE_INCOMING es: ', cll.getState() === PJSIP_INV_STATE_INCOMING)
                        incomingCall = cll
                        console.log('incomingCall es: ', incomingCall)
                        break
                    }
                }

            } else if (incomingCall) {
                console.log('DENTRO DE else if (incomingCall)')
                console.log('incomingCall es: ', incomingCall)
                console.log('calls.length es: ', calls.length)

                let exist = false

                for (const call of calls) {
                    console.log('for (const call of calls)')

                    console.log('call.getId() === incomingCall.getId() es: ', call.getId() === incomingCall.getId())
                    if (call.getId() === incomingCall.getId()) {
                        exist = true
                        console.log('exist es: ', exist);
                        console.log('break????')
                        break
                    }
                }

                console.log('Fuera de for()')
                console.log('exist es: ', exist)

                if (!exist) {
                    incomingCall = null
                    console.log('incomingCall es: ', incomingCall)
                    console.log('incomingCall nulo?? porque o para que?')
                    console.log('Para que el modal incomingCall desaparezca una vez que se ha aceptado la llamadda')
                    console.log('Y para poder seguir buscando posibles incoming calls')
                }
            }

            if (init) {
                console.log('DENTRO DE init ??? ')
                console.log('Por que y como paso? revisar logs')

                console.log('Aqui es donde se usa setState() que hace que todo se vuelva a renderizar')
                console.log('Totalmente confirmado que se hace un reset al this.state localState de CallScreen component')

                console.log('Seteados setState a call e incomingCall')
                console.log('call es: ', call)
                console.log('incomingCall es: ', incomingCall)

                this.setState({
                    call,
                    incomingCall,
                    ...CallAnimation.calculateInitialDimensions(
                        { ...this.state, totalCalls: Object.keys(nextProps.calls).length },
                        call
                    )
                })

            } else {
                console.log('No se realiza un reset al this.state localState')
                console.log('Se actualiza la interfaz dependiendo del estado de calling state')
                console.log('-----Probablemente aqui es donde se rerenderiza los parallelCalls-----')
                console.log('Se hace un setState a call e incomingCall')
                console.log('call es: ', call)
                console.log('incomingCall es: ', incomingCall)

                CallAnimation.animateCallState( { ...this.state, totalCalls: calls.length }, call)
                this.setState( { call, incomingCall } )
            }

            if (call.getState() === "PJSIP_INV_STATE_DISCONNECTED") {
                console.log('Se termina la llamada por medio de la variable call: ', call.getState())
                this.props.onCallEnd && this.props.onCallEnd(call)
            }
        }
    }

    onInitializationResponse(call) {

        console.log('\nEjecutando resolve promise call.then() con call es: ', call)

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

        console.log('ANTES DE this.setState(state)')
        this.setState(state)
        console.log('DESPUES DE this.setState(state)')
    }

    onInitializationError(reason) {
        console.log('\nEjecutando resolve promise call.then() error con reason es: ', reason)

        console.log('ANTES DE this.setState({ error: reason })')
        this.setState( { error: reason } )
        console.log('DESPUES DE this.setState({ error: reason })')
        this.props.onCallEnd && this.props.onCallEnd(this.state.call)
    }

    onCallAnswer() {
        console.log('\nonCallAnswer() executed')
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
        console.log('\nonIncomingCallAnswer() executed!')
        this.setState( { incomingCall: null } )
        console.log('this.state.incomingCall es: ', this.state.incomingCall)
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
            if (this.props.calls.hasOwnProperty(id) && id != activeCall.getId()) { // TODO: Check why type of ID is different => id becomes into string
                const call = this.props.calls[id]

                result.push((
                    <CallParallelInfo
                        key={`parallel-${call.getId()}`}
                        call={call}
                        onPress={this.props.onCallSelect}
                        style={{marginTop: i === 0 ? 0 : parallelTop}}
                    />
                ))
            }

            i++
        }

        console.log('renderSimultaniousCalls() executed!')
        console.log('const activeCall = this.state.call')
        console.log('activeCall es: ', activeCall)
        console.log('result es: ', result)

        return (
            <View style={ { position: 'absolute', top: parallelTop, width: this.state.screenWidth } }>
                {result}
            </View>
        )
    }

    renderError() {
        console.log('render() executed!')

        return (
            <LinearGradient colors={['#2a5743', '#14456f']} style={sc.mainContainer}>
                <View style={scs.errorContainer}>
                    <Text style={scs.errorText}>{this.state.error}</Text>
                </View>
            </LinearGradient>
        )
    }

    renderCallWait() {
        console.log('renderCallWait() executed! - NO EXISTE CALL ES NULL: ', this.state.call)
        return (
            <LinearGradient colors={['#2a5743', '#14456f']} style={sc.mainContainer}>
                <View style={scs.initContainer}>
                    <Text style={scs.initText}>Please wait while call initialized</Text>
                </View>
            </LinearGradient>
        )
    }

    render() {
        console.log('\nCallScreen render() executed!')
        console.log('this.state es: ', this.state)
        console.log('this.props es: ', this.props)
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

        console.log('Rendering components')

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

        // call param has current calling state disconnected
        onCallEnd: (call, routeName='CallScreen') => {
            setTimeout( () => {

                dispatch( async (dispatch, getState) => {
                    const calls = getState().pjsip.calls
                    const route = { call, name: routeName}  //getState().navigate.current

                    console.log('\nCallScreen - onCallEnd() executed!')
                    console.log('calls es: ', calls)
                    console.log('route es: ', route)

                    //dispatch Return to previous screen once call end.
                    const doDirectRoute = () => dispatch(goBack())

                    const doRoute = (call) => {
                        console.log('doRoute(call) executed!')

                        console.log('calls.hasOwnProperty(call.getId()) es: ', calls.hasOwnProperty(call.getId()))
                        if (calls.hasOwnProperty(call.getId())) {
                            console.log('calls.hasOwnProperty(call.getId()) es: ', calls.hasOwnProperty(call.getId()))
                            console.log('retornando ???')
                            return
                        }

                        // Open active call once current call ends.
                        for (const id in calls) {
                            console.log('for (const id in calls)')
                            if (calls.hasOwnProperty(id)) {
                                console.log('calls.hasOwnProperty(id) es: ', calls.hasOwnProperty(id));

                                // todo implementar condicion para que si aun hay active calls no se haga un pop de CallScreen sino que haga un reset en el this.state del component

                                return dispatch(goAndReplace( { name: 'CallScreen', call: calls[id] } ))
                            }
                        }

                        console.log('No hay llamadas activas: Return to previous screen once call end.')
                        console.log('return dispatch(goBack())')
                        // Return to previous screen once call end.
                        return dispatch(goBack())
                    }

                    console.log('route.name !== \'CallScreen\' es: ', route.name !== 'CallScreen')
                    if (route.name !== 'CallScreen') {
                        return
                    }

                    console.log('route.call instanceof Promise es: ', route.call instanceof Promise)

                    if (route.call instanceof Promise) {
                        route.call.then(doRoute, doDirectRoute)

                    } else {
                        doRoute(route.call)
                    }
                })

            }, 1500)
        },

        onCallAdd: (call, destination) => dispatch(makeCall(destination)),

        onCallSelect: async (call) => dispatch(goAndReplace( { name: 'CallScreen', call } )),

        onIncomingCallAnswer: async (call) => {
            dispatch(await answerCall(call))
            dispatch(await goAndReplace( { name: 'CallScreen', call } ))
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

