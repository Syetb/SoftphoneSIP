import { Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'

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
