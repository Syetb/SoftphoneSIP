import { Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'
import {goTo} from "./navigate";

export const ACCOUNT_CREATED = 'pjsip/ACCOUNT_CREATED'
export const ACCOUNT_DELETED = 'pjsip/ACCOUNT_DELETED'

/**
 * Creates new account based on provided configuration.
 *
 * @param {Object} configuration
 * @returns {Function}
 */
export function createAccount(configuration) {
    return async function (dispatch, getState) {

        const { endpoint } = getState().pjsip
        const contactUriParams = Platform.select({
            ios: ';app-id=com.softphoneSIP.mobile.app',
            android: ';im-type=sip',
        })

        const account = await endpoint.createAccount({
            ...configuration,
            transport: configuration.transport ? configuration.transport : "UDP",
            contactUriParams
        })

        dispatch( { type: ACCOUNT_CREATED, payload: { account } } )

        return await Navigation.popTo('SettingsScreenId')
    }
}

/**
 * Replaces existing account with new configuration (e.g. remove and recreate account)
 *
 * @param {Account} account
 * @param {Object} configuration
 * @returns {Function}
 */
export function replaceAccount(account, configuration) {
    // There is no change account method. But this functionality is easy to implement by calling delete and create account methods.
    return async function (dispatch) {

        dispatch(deleteAccount(account))
        dispatch(createAccount(configuration))
    }
}

/**
 * Action to delete account.
 *
 * @param {Account} account
 * @returns {Function}
 */
export function deleteAccount(account) {
    return async function (dispatch, getState) {
        const endpoint = getState().pjsip.endpoint
        await endpoint.deleteAccount(account)

        dispatch( { type: ACCOUNT_DELETED, payload: { account } } )

        return await Navigation.popTo('SettingsScreenId')
    }
}

/**
 * Initiate new outgoing call.
 *
 * @param {String} destination
 * @param {Account} account
 * @returns {Function}
 */
export function makeCall(destination, account = null) {
    return async function (dispatch, getState) {
        const { accounts } = getState().pjsip

        // Use "default" account if none provided
        if (account == null) {
            for (const id in accounts) {
                if (accounts.hasOwnProperty(id)) {
                    account = accounts[id]
                    break
                }
            }
        }

        if (!account) {
            dispatch(goTo({
                name: 'CallScreen',
                call: Promise.reject("Al menos debes configurar una cuenta SIP para hacer llamadas")
            }))

            return
        }

        const endpoint = getState().pjsip.endpoint

        // TODO: Do not deactivateAudioSession if iOS version is not compatible with CallKit
        if (Platform.OS === 'ios') {
            endpoint.deactivateAudioSession()
        }

        const call = endpoint.makeCall(account, destination)

        dispatch(goTo( { name: 'CallScreen', call } ))
    }
}

export function hangupCall(call) {
    return async function (dispatch, getState) {
        const endpoint = getState().pjsip.endpoint
        await  endpoint.hangupCall(call)
    }
}

export function declineCall(call) {
    return async function (dispatch, getState) {
        const endpoint = getState().pjsip.endpoint
        await endpoint.declineCall(call)
    }
}

export function answerCall(call) {
    return async function (dispatch, getState) {
        const endpoint = getState().pjsip.endpoint
        await endpoint.answerCall(call)
    }
}
