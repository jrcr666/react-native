import * as actionTypes from '../actions/actionTypes';

initialState = {
    token: null,
    expiryDate: null,
    refreshToken: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                expiryDate: action.expiryDate,
                refreshToken: action.refreshToken
            }
            break;

        case actionTypes.AUTH_REMOVE_TOKEN:
            return {
                ...state,
                token: null,
                expiryDate: null,
                refreshToken: null
            }
            break;
        default:
            return state;
    }
}

export default reducer;