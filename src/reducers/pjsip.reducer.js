const initialState = {
    accounts: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'FETCH_ACCOUNTS':
            return action.payload;
        default:
            return state;
    }
}
