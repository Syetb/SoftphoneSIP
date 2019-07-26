import { Platform, Alert, AsyncStorage } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { goBack, goTo } from "./navigate";

export const ACCOUNT_CREATED = 'pjsip/ACCOUNT_CREATED'
export const ACCOUNT_DELETED = 'pjsip/ACCOUNT_DELETED'

export const isiOS = Platform.OS === 'ios'

const _storeData = async (configure) => {
    try {
        await AsyncStorage.setItem('configuration', JSON.stringify(configure));

    } catch (error) {
        // Error saving data
        Alert.alert('Advertencia', 'Error al crear la cuenta!\n' + error)
    }
}

const _removeData = async () => {
    try {
        await AsyncStorage.removeItem('configuration');
        Alert.alert('Aviso', 'Eliminado exitosamente!');
    } catch (error) {
        // Error saving data
        Alert.alert('Advertencia', 'Error al eliminar la cuenta!\n' + error)
    }
}

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

        await _storeData(configuration);

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

        await _removeData();

        dispatch( { type: ACCOUNT_DELETED, payload: { account } } )

        return await Navigation.popTo('SettingsScreenId')
    }
}

/**
 * Destroy current Endpoint instance  -  EventEmitter memory leak
 * @returns {Function}
 */
export function destroy() {
    return async function (dispatch, getState) {
        // Remove accounts
        const { endpoint, accounts } = getState().pjsip

        for (const id in accounts) {
            if (accounts.hasOwnProperty(id)) {
                await endpoint.deleteAccount(accounts[id])
                dispatch( { type: ACCOUNT_DELETED, payload: { account: accounts[id] } } )
            }
        }

        endpoint.removeAllListeners()
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
        // if ( isiOS ) {
        //     endpoint.deactivateAudioSession()
        // }

        const call = endpoint.makeCall(account, destination)

        dispatch(goTo( { name: 'CallScreen', call } ))
    }
}

export function hangupCall(call) {
    return async function (dispatch, getState) {
        const endpoint = getState().pjsip.endpoint

        try {
            await  endpoint.hangupCall(call)
        } catch (e) {
            Alert.alert('Advertencia', 'Error al colgar la llamada!' + e)
            return dispatch(goBack())
        }
    }
}

export function declineCall(call) {
    return async function (dispatch, getState) {
        const endpoint = getState().pjsip.endpoint

        try {
            await endpoint.declineCall(call)
        } catch (e) {
            Alert.alert('Advertencia', 'Error al declineCall la llamada!' + e)
            return dispatch(goBack())
        }
    }
}

export function answerCall(call) {
    return async function (dispatch, getState) {
        const endpoint = getState().pjsip.endpoint

        // console.log('answerCall(call) executed!')

        try {
            await endpoint.answerCall(call)
        } catch (e) {
            Alert.alert('Advertencia', 'Error al responder la llamada! es: ' + e)
            return dispatch(goBack())
        }
    }
}

export function muteCall(call) {
    return async function (dispatch, getState) {
        const endpoint = getState().pjsip.endpoint
        await endpoint.muteCall(call)
    }
}

export function unmuteCall(call) {
    return async function (dispatch, getState) {
        const endpoint = getState().pjsip.endpoint
        await endpoint.unMuteCall(call)
    }
}

export function holdCall(call) {
    return async function (dispatch, getState) {
        const endpoint = getState().pjsip.endpoint
        await endpoint.holdCall(call)
    }
}

export function unholdCall(call) {
    return async function (dispatch, getState) {
        const endpoint = getState().pjsip.endpoint
        await endpoint.unholdCall(call)
    }
}

export function useSpeaker(call) {
    return async function (dispatch, getState) {
        const endpoint = getState().pjsip.endpoint
        await endpoint.useSpeaker(call)
    }
}

export function useEarpiece(call) {
    return async function (dispatch, getState) {
        const endpoint = getState().pjsip.endpoint
        await endpoint.useEarpiece(call)
    }
}

export function dtmfCall(call, key) {
    return async function (dispatch, getState) {
        const endpoint = getState().pjsip.endpoint
        await endpoint.dtmfCall(call, key)
    }
}

export function redirectCall(call, destination) {
    return async function (dispatch, getState) {
        const {endpoint, accounts} = getState().pjsip
        await endpoint.redirectCall(accounts[call.getAccountId()], call, destination)
    }
}

export function xferCall(call, destination) {
    return async function (dispatch, getState) {
        const {endpoint, accounts} = getState().pjsip
        await endpoint.xferCall(accounts[call.getAccountId()], call, destination)
    }
}

export function xferReplacesCall(call, destinationCall) {
    return async function (dispatch, getState) {
        const endpoint = getState().pjsip.endpoint
        await endpoint.xferReplacesCall(call, destinationCall)
    }
}
