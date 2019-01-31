import { NAVIGATE_BACK, NAVIGATE_TO } from "../actions/navigate";

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
            return {
                ...state,
                current: action.route,
                previous: state.current,
                history: state.history.concat(state.current),
                sideMenu: false
            }

        case NAVIGATE_BACK: {
            const { history } = state
            const newHistory = [].concat(history)
            newHistory.pop()

            return {
                ...state,
                current: state.previous,
                previous: newHistory.length > 0 ? newHistory[newHistory.length - 1] : {},
                history: newHistory,
                sideMenu: false
            }
        }
        default:
            return state
    }
}
