const initialState = {
    endpoint: null,
    endpointSettings: null,
    connectivity: true,
    isScreenLocked: false,

    appState: 'active',

    accounts: {},
    calls: {},
}

export default function (state = initialState, action) {

    switch (action.type) {
        case 'FETCH_ACCOUNTS':
            return {
                ...state,
                accounts: action.payload
            }
        default:
            return state;
    }
}
