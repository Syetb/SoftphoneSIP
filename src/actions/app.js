import { Platform, AppState } from 'react-native'
import { Endpoint } from 'react-native-pjsip'

import { onAccountChanged, onConnectivityChanged, onCallReceived, onCallChanged, onCallTerminated, onCallScreenLocked } from './handlers'

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
            payload: { endpoint, endpointSettings, connectivity, accounts: accountMap, calls: callsMap }
        })

        if (Platform.OS === 'ios') {
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
    }
}
