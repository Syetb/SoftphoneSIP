import { goTo } from "./navigate";

export const ACCOUNT_CHANGED = 'pjsip/ACCOUNT_CHANGED'
export const CONNECTIVITY_CHANGED = 'pjsip/CONNECTIVITY_CHANGED'

export const CALL_RECEIVED = 'pjsip/CALL_RECEIVED'
export const CALL_CHANGED = 'pjsip/CALL_CHANGED'
export const CALL_TERMINATED = 'pjsip/CALL_TERMINATED'
export const CALL_SCREEN_LOCKED = 'pjsip/CALL_SCREEN_LOCKED'

/**
 * Handle account change event.
 *
 * @param {Account} account
 */
export function onAccountChanged(account) {
    return { type: ACCOUNT_CHANGED, payload: { account } }
}

/**
 * Handle connectivity change event.
 *
 * @param online
 */
export function onConnectivityChanged(online) {
    return async function (dispatch, getState) {
        dispatch( { type: CONNECTIVITY_CHANGED, payload: online } )
    }
}

/**
 * Handles incoming call event.
 *
 * @param {Call} call
 * @returns {Function}
 */
export function onCallReceived(call) {
    return async function (dispatch, getState) {
        const state = getState()

        if (state.navigate.current.name !== 'CallScreen' && state.pjsip.appState === 'active') {
            dispatch(goTo({ name: 'CallScreen', call }))
        }

        dispatch( { type: CALL_RECEIVED, call } )
    }
}

/**
 * Handles call change event.
 *
 * @param {Call} call
 * @returns {Function}
 */
export function onCallChanged(call) {
    return async function (dispatch, getState) {
        dispatch( { type: CALL_CHANGED, call } )
    }
}

/**
 * Handles call terminated event.
 *
 * @param {Call} call
 * @returns {Function}
 */
export function onCallTerminated(call) {
    return async function (dispatch, getState) {
        dispatch( { type: CALL_CHANGED, call } )
        dispatch( { type: CALL_TERMINATED, call } )
    }
}

/**
 * Handles screen lock event.
 * Android only
 *
 * @param bool lock
 * @returns {Function}
 */
export function onCallScreenLocked(lock) {
    return async function (dispatch, getState) {
        dispatch ( { type: CALL_SCREEN_LOCKED, lock } )
    }
}
