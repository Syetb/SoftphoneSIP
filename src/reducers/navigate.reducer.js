import { NAVIGATE_BACK, NAVIGATE_TO, NAVIGATE_REPLACE } from "../actions/navigate";

const initialState = {
    ref: null,

    init: { name: 'launch' },
    current: {},
    previous: {},
    history: [],
    sideMenu: false
}

export default function navigation(state = initialState, action) {
    switch (action.type) {
        case NAVIGATE_TO:
            console.log('\naction.type es: ', action.type)
            console.log('previous state es: ', state)
            console.log('next state es: ', action.route)

            return {
                ...state,
                current: action.route,
                previous: state.current,
                history: state.history.concat(state.current),
                sideMenu: false
            }

        case NAVIGATE_BACK: {
            console.log('\naction.type es: ', action.type)
            console.log('previous state es: ', state)

            const { history } = state
            const newHistory = [].concat(history)
            newHistory.pop()

            console.log(
                'next state es: ',
                {
                    current: state.previous,
                    previous: newHistory.length > 0 ? newHistory[newHistory.length - 1] : {},
                    history: newHistory,
                    drawer: false
                }
            )

            return {
                ...state,
                current: state.previous,
                previous: newHistory.length > 0 ? newHistory[newHistory.length - 1] : {},
                history: newHistory,
                sideMenu: false
            }
        }
        case NAVIGATE_REPLACE: {
            console.log('\naction.type es: ', action.type)
            console.log('previous state es: ', state)

            const newHistory = [].concat(state.history)
            newHistory[state.history.length - 1] = action.route

            console.log(
                'next state es: ',
                {
                    current: action.route,
                    history: newHistory,
                    sideMenu: false
                }
            )

            return {
                ...state,
                current: action.route,
                history: newHistory,
                sideMenu: false
            }
        }

        default:
            return state
    }
}
