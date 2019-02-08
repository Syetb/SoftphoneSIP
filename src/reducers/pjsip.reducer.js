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
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT:
            console.log('\naction.type es: ', action.type)
            console.log('previous state es: ', state)
            console.log('next state es: ', action.payload)
            return {
                ...state,
                ...action.payload
            }

        case CALL_INITIATED:
        case CALL_RECEIVED:
        case CALL_CHANGED:
            console.log('\naction.type es: ', action.type)

            const call = action.call

            console.log('previous state es: ', state)
            console.log(
                'next state es: ',
                {
                    ...state,
                    calls: {
                        ...state.calls,
                        [call.getId()]: call
                    }
                }
            )

            return {
                ...state,
                calls: {
                    ...state.calls,
                    [call.getId()]: call
                }
            }

        case CALL_TERMINATED:
            console.log('\naction.type es: ', action.type)

            const calls = {...state.calls}
            delete calls[action.call.getId()]

            console.log('previous state es: ', {...state.calls})
            console.log('next state es: ', calls)

            return {
                ...state,
                calls
            }

        case CALL_SCREEN_LOCKED:
            console.log('\naction.type es: ', action.type)
            console.log('previous state es: ', state)
            console.log('next state es: ', action.lock)

            return {
                ...state,
                isScreenLocked: action.lock
            }

        case CONNECTIVITY_CHANGED:
            console.log('\naction.type es: ', action.type)
            console.log('previous state es: ', state)
            console.log('next state es: ', action.payload)

            return {
                ...state,
                connectivity: action.payload
            }

        case CHANGED_APP_STATE:
            console.log('action.type es: ', action.type)
            console.log('previous state es: ', state)
            console.log('next state es: ', action.payload)

            return {
                ...state,
                ...action.payload
            }

        case ACCOUNT_CREATED:
        case ACCOUNT_CHANGED:
        case ACCOUNT_REGISTRATION_CHANGED: {
            const account = action.payload.account

            const nextState = {
                ...state,
                accounts: {
                    ...state.accounts,
                    [account.getId()]: account
                }
            }

            // console.log('action.type es: ', action.type)
            // console.log('previous state es: ', state)
            // console.log('next state es: ', nextState)
            //
            // console.log('account es: ', account)

            return {
                ...state,
                accounts: {
                    ...state.accounts,
                    [account.getId()]: account
                }
            }
        }
        case ACCOUNT_DELETED: {
            const account = action.payload.account
            const accounts = {...state.accounts}

            delete accounts[account.getId()]

            console.log('action.type es: ', action.type)
            console.log('previous state es: ', state.accounts)
            console.log('next state es: ', accounts)

            return {
                ...state,
                accounts
            }
        }
        default:
            return state
    }
}

export default reducer
