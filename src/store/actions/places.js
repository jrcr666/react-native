import * as actionTypes from '../actions/actionTypes';

export const addPlace = (placeName, location) => {
    return {
        type: actionTypes.ADD_PLACE,
        placeName,
        location
    }
}

export const deletePlace = (key) => ({ type: actionTypes.DELETE_PLACE, key });