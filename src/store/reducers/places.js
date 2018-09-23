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
                    key: (Math.random() * 1000).toString() + (Math.random() * 1000).toString(),
                    name: action.placeName,
                    image: { uri: 'https://www.nordicvisitor.com/images/jokulsarlon-glacier-lagoon-icelanddepositphotos.jpg' },
                    location: action.location
                }),
            }
        case actionTypes.DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => place.key !== action.key)
            }
        default:
            return state;
    }
}

export default reducer;