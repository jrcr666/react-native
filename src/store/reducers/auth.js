import * as actionTypes from '../actions/actionTypes';

initialState = {
    authData: null,

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                authData: action.authData
            }
        default:
            return state;
    }
}

export default reducer;