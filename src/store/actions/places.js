import * as actionTypes from '../actions/actionTypes';

export const addPlace = (placeName, location, image) =>
    dispatch => {
    	const placeData = { 
        		name: placeName,
        		location
        	};

        fetch('https://us-central1-rn-course-1537651935516.cloudfunctions.net/storeImage', {
        	method: 'POST',
        	body: JSON.stringify({
        		image: image.base64
        	})
        })
		.catch(error => { console.warn('error', error)})
		.then(response => response.json())
		.then(json => console.log(json))
	}

export const deletePlace = (key) => ({ type: actionTypes.DELETE_PLACE, key });