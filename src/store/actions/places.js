import * as actionTypes from '../actions/actionTypes';

export const addPlace = (placeName) => {
    return {
        type: actionTypes.ADD_PLACE,
        placeName
    }
}

export const deletePlace = (key) => ({ type: actionTypes.DELETE_PLACE, key });