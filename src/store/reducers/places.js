import * as actionTypes from '../actions/actionTypes';

initialState = {
    places: [],

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({
                    key: action.place.key,
                    name: action.place.name,
                    image: {
                        uri: action.place.image
                    },
                    location: action.place.location
                }),
            }
            break;
        case actionTypes.SET_PLACES:
            return {
                ...state,
                places: action.places
            }
            break;

        case actionTypes.REMOVE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => place.key !== action.key)
            }
            break;
        default:
            return state;
    }
}

export default reducer;