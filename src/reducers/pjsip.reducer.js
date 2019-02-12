import { INIT, CHANGED_APP_STATE} from '../actions/app'
import { ACCOUNT_CHANGED, CONNECTIVITY_CHANGED, CALL_RECEIVED, CALL_CHANGED, CALL_TERMINATED, CALL_SCREEN_LOCKED } from '../actions/handlers'
import { ACCOUNT_CREATED, ACCOUNT_DELETED } from '../actions/pjsip'

export const CALL_INITIATED = 'pjsip/CALL_INITIATED'
export const ACCOUNT_REGISTRATION_CHANGED = 'pjsip/ACCOUNT_REGISTRATION_CHANGED'

const initialState = {
    endpoint: null,
    endpointSettings: null,
    connectivity: true,
    isScreenLocked: false,

    appState: 'active',

    accounts: {},
    calls: {},

    account: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT:
            return {
                ...state,
                ...action.payload
            }

        case CALL_INITIATED:
        case CALL_RECEIVED:
        case CALL_CHANGED:
            const call = action.call

            return {
                ...state,
                calls: {
                    ...state.calls,
                    [call.getId()]: call
                }
            }

        case CALL_TERMINATED:
            const calls = {...state.calls}
            delete calls[action.call.getId()]

            return {
                ...state,
                calls
            }

        case CALL_SCREEN_LOCKED:
            return {
                ...state,
                isScreenLocked: action.lock
            }

        case CONNECTIVITY_CHANGED:
            return {
                ...state,
                connectivity: action.payload
            }

        case CHANGED_APP_STATE:
            return {
                ...state,
                ...action.payload
            }

        case ACCOUNT_CREATED:
        case ACCOUNT_CHANGED:
        case ACCOUNT_REGISTRATION_CHANGED: {
            const account = action.payload.account

            return {
                ...state,
                accounts: {
                    ...state.accounts,
                    [account.getId()]: account
                },
                account: account
            }
        }
        case ACCOUNT_DELETED: {
            const account = action.payload.account
            const accounts = {...state.accounts}

            delete accounts[account.getId()]

            return {
                ...state,
                accounts,
                account: {}
            }
        }
        default:
            return state
    }
}

export default reducer
