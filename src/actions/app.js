import { Platform, AppState } from 'react-native'
import { Endpoint } from 'react-native-pjsip'
import RNCallKit  from 'react-native-callkit'
import uuid from 'uuid'

import { onAccountChanged, onConnectivityChanged, onCallReceived, onCallChanged, onCallTerminated, onCallScreenLocked } from './handlers'
import {ACCOUNT_CREATED, answerCall, declineCall, hangupCall} from "./pjsip";

export const INIT = 'pjsip/INIT'
export const CHANGED_APP_STATE = 'pjsip/CHANGED_APP_STATE'

/**
 * Initialize PjSIP functionality.
 * First of all you have to initialize module to be able to work with it.
 */
export function init() {
    return async function (dispatch, getState) {
        // Retrieving PjSip service state
        // It is possible that Endpoint instance already have registered accounts and active calls.
        // (because Javascript state is not persistent when User close application, e.g. application goes to background state)
        // It works in background because in Android where is a service PjSip service, that you included in AndroidManifest.xml.

        const endpoint = new Endpoint()
        const state = await endpoint.start({
            service: {
                ua: Platform.select({ios: "RnSIP iOS", android: "RnSIP Android"})
            },
            network: {
                useWifi: true,
                useOtherNetworks: true
            }
        })

        const { accounts, calls, settings: endpointSettings, connectivity } = state

        // Subscribe to endpoint events
        endpoint.on("registration_changed", (account) => {
            dispatch(onAccountChanged(account))
        })
        endpoint.on("connectivity_changed", (available) => {
            dispatch(onConnectivityChanged(available))
        })
        endpoint.on("call_received", (call) => {
            dispatch(onCallReceived(call))
        })
        endpoint.on("call_changed", (call) => {
            dispatch(onCallChanged(call))
        })
        endpoint.on("call_terminated", (call) => {
            dispatch(onCallTerminated(call))
        })
        endpoint.on("call_screen_locked", (call) => {
            dispatch(onCallScreenLocked(call))
        })

        const accountMap = accounts.reduce( (acc, cur) => {
            acc[cur.getId()] = cur
            return acc
        }, {})
        const callsMap = calls.reduce((acc, cur) => {
            acc[cur.getId()] = cur
            return acc
        }, {})

        dispatch({
            type: INIT,
            payload: { endpoint, endpointSettings, connectivity, accounts: accountMap, calls: callsMap, account: accounts[0] }
        })

        if (Platform.OS === 'ios') {
            // CallKit
            dispatch(initCallKitIntegration())

            // Register / unregister when app in background or foreground
            AppState.addEventListener('change', async (nextAppState) => {

                if (nextAppState === 'background' || nextAppState === 'active') {
                    const accounts = getState().pjsip.accounts

                    for (const id in accounts) {
                        if (accounts.hasOwnProperty(id)) {
                            try {
                                await endpoint.registerAccount(accounts[id], nextAppState === 'active')
                            } catch (e) {
                                // console.warn('error es: ' , e)
                                console.log('error es: ' , e)
                            }
                        }
                    }

                    dispatch( { type: CHANGED_APP_STATE, payload: { appState: nextAppState } } )
                }
            })
        }

        // Cuenta SIP por defecto para pruebas
        if (accounts.length === 0) {
            const defaultAccount = {
                'name': 'Jhonatan',
                'username': 'jhona',
                'domain': '192.168.0.133',
                'password': 'pwd_100',
                'proxy': '',
                'transport':'UDP',
                'regServer': '',
                'regTimeout': ''
            }

            if( Platform.OS === 'ios') {
                const account = await endpoint.createAccount({
                    ...defaultAccount,
                    contactUriParams: ';app-id=com.softphoneSIP.mobile.app'
                })
                dispatch( { type: ACCOUNT_CREATED, payload: { account } } )

            } else {
                defaultAccount.name = 'Betsy'
                defaultAccount.username = 'betsy'
                defaultAccount.password = 'pwd_102'

                const account = await endpoint.createAccount({
                    ...defaultAccount,
                    contactUriParams: ';im-type=sip'
                })
                dispatch( { type: ACCOUNT_CREATED, payload: { account } } )
            }
        }
    }
}

/**
 * CallKit doesn't support multiple calls (as far as I know),
 * That why activeCall reference exists (apply all actions to it).
 *
 * @returns {Function}
 */
function initCallKitIntegration() {
    return async function (dispatch, getState) {
        let activeCall = null
        let incomingCall = null
        const uuids = {}

        // Initialize RNCallKit
        RNCallKit.setup({appName: 'React Native PjSip'})

        const {endpoint} = getState().pjsip

        endpoint.on("call_received", (call) => {
            if (incomingCall != null) {
                dispatch(declineCall(call)) // Decline call when more that one calls are ringing
            }

            incomingCall = call.getId()

            if (!uuids.hasOwnProperty(call.getCallId())) {
                uuids[call.getCallId()] = uuid.v1()
            }

            RNCallKit.displayIncomingCall(uuids[call.getCallId()], call.getRemoteFormattedNumber())
        })

        endpoint.on("call_changed", (call) => {
            if (call.getId() === incomingCall && call.getState() != 'PJSIP_INV_STATE_INCOMING') {
                incomingCall = null
            } else if (activeCall === null) {
                activeCall = call.getId()


                if (!uuids.hasOwnProperty(call.getCallId())) {
                    uuids[call.getCallId()] = uuid.v1()
                }

                RNCallKit.startCall(uuids[call.getCallId()], call.getRemoteFormattedNumber())
            }
        })

        endpoint.on("call_terminated", async (call) => {
            const {appState} = getState().pjsip

            // Send unregistry when application was in background
            if (appState == 'background' && activeCall == call.getCallId()) {
                const {endpoint, accounts} = getState().pjsip
                for (const id in accounts) {
                    if (accounts.hasOwnProperty(id)) {
                        await endpoint.registerAccount(accounts[id], false)
                    }
                }
            }

            if (activeCall == call.getId()) {
                activeCall = null
            }
            if (incomingCall == call.getId()) {
                incomingCall = null
            }


            if (!uuids.hasOwnProperty(call.getCallId())) {
                uuids[call.getCallId()] = uuid.v1()
            }

            RNCallKit.endCall(uuids[call.getCallId()])

            delete uuids[call.getCallId()]
        })


        // -------------------------
        // -------------------------
        // -------------------------

        // TODO: Other actions like DTMF - Add RNCallKit Events
        RNCallKit.addEventListener('didReceiveStartCallAction', () => {
            const {endpoint} = getState().pjsip
            endpoint.deactivateAudioSession()
        })

        RNCallKit.addEventListener('answerCall', () => {
            console.log("JS RNCallKit", "answerCall", incomingCall)

            const {calls} = getState().pjsip
            let call = null

            if (incomingCall !== null) {
                call = calls[incomingCall]
            }

            if (call) {
                dispatch(answerCall(call))
            }
        })

        RNCallKit.addEventListener('endCall', () => {
            console.log("JS RNCallKit", "endCall", activeCall, incomingCall)

            const {calls} = getState().pjsip
            let call = null

            if (activeCall !== null) {
                call = calls[activeCall]
            } else if (incomingCall !== null) {
                call = calls[incomingCall]
            }

            if (!call) {
                for (const id in calls) {
                    if (calls.hasOwnProperty(id)) {
                        call = calls[id]
                        break
                    }
                }
            }

            if (call) {
                dispatch(hangupCall(call))
            }
        })

        RNCallKit.addEventListener('didActivateAudioSession', () => {
            const {endpoint} = getState().pjsip
            endpoint.activateAudioSession()
        })

        // RNCallKit.addEventListener('didDisplayIncomingCall', (error) => {} )  error

        // RNCallKit.addEventListener('didPerformSetMutedCallAction', (muted) => {} )
    }
}
