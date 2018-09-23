import * as actionTypes from '../actions/actionTypes';

export const addPlace = (placeName, location, image) => {
    return {
        type: actionTypes.ADD_PLACE,
        placeName,
        location,
        image
    }
}

export const deletePlace = (key) => ({ type: actionTypes.DELETE_PLACE, key });