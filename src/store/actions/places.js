import * as actionTypes from '../actions/actionTypes';
import * as uiActions from './index';

export const addPlace = (placeName, location, image) =>
    dispatch => {
        dispatch(uiActions.uiStartLoading())
        fetch('https://us-central1-rn-course-1537651935516.cloudfunctions.net/storeImage', {
                method: 'POST',
                body: JSON.stringify({
                    image: image.base64
                })
            })
            .then(response => response.json())
            .catch(error => {
                console.log('error', error);
                alert('Algo fue mal, por favor, prueba de nuevo!')
                dispatch(uiActions.uiStopLoading())
            })
            .then(imageCreated => {
                const placeData = {
                    name: placeName,
                    location,
                    image: imageCreated.imageUrl
                };

                fetch('https://rn-course-1537651935516.firebaseio.com/places.json', {
                        method: 'POST',
                        body: JSON.stringify(placeData)
                    })
                    .then(response => response.json())
                    .catch(error => {
                        console.log('error', error);
                        alert('Algo fue mal, por favor, prueba de nuevo!')
                        dispatch(uiActions.uiStopLoading())
                    })
                    .then(place => {
                        console.log('place', place.name);
                        dispatch(uiActions.uiStopLoading())
                    })
            });
    }

export const getPlaces = () => {
    return dispatch => {
        fetch('https://rn-course-1537651935516.firebaseio.com/places.json')
            .then(response => response.json())
            .catch(error => {
                console.log('error', error);
                alert('Algo fue mal, por favor, prueba de nuevo!')
                dispatch(uiActions.uiStopLoading())
            })
            .then(places => {
                const places_ = [];
                for (let key in places) {
                    places_.push({
                        ...places[key],
                        image: {
                            uri: places[key].image
                        },
                        key
                    })
                }
                dispatch(setPlaces(places_));
            })
    }
}

const setPlaces = places => ({
    type: actionTypes.SET_PLACES,
    places
})

const removePlace = (key) => ({
	type: actionTypes.REMOVE_PLACE,
	key

})


export const deletePlace = (key) => {
    return dispatch => {
        fetch('https://rn-course-1537651935516.firebaseio.com/places/' + key + '.json/', {
                method: 'DELETE'
            })
            .then(response => response.json())
            .catch(error => {
                console.log('error', error);
                alert('Algo fue mal, por favor, prueba de nuevo!')
            })
            .then(json => {
                dispatch(removePlace(key))
            })
    }
}







