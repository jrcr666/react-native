import * as actionTypes from '../actions/actionTypes';
import * as uiActions from './ui';
import * as authActions from './auth';

export const startAddPlace = () => ({
    type: actionTypes.START_ADD_PLACE    
})

export const addPlace = (placeName, location, image) =>
    dispatch => {
        let authToken;
        dispatch(uiActions.uiStartLoading())
        dispatch(authActions.authGetToken())
            .then(token => {
                authToken = token;
                return fetch('https://us-central1-rn-course-1537651935516.cloudfunctions.net/storeImage', {
                    method: 'POST',
                    body: JSON.stringify({
                        image: image.base64
                    }),
                    headers: {
                        'Authorization': 'Bearer ' + authToken
                    }
                });
            })
            .catch(() => {
                alert('No hay un token válido');
                dispatch(uiActions.uiStopLoading());
            })
            .then(response => {
            	if (!response) return;
                return response.json();
            })
            .then(imageCreated => {
            	if (imageCreated.error) throw new Error('Hubo un problema al subir la imagen');
                const placeData = {
                    name: placeName,
                    location,
                    image: imageCreated.imageUrl,
                    imagePath: imageCreated.imagePath
                };

                fetch('https://rn-course-1537651935516.firebaseio.com/places.json?auth=' + authToken, {
                        method: 'POST',
                        body: JSON.stringify(placeData)
                    })
                    .then(response => response.json())
                    .then(place => {
                        console.log('place', place.name);
                        dispatch(setPlace({
                            ...placeData,
                            key: place.name
                        }));
                        dispatch(uiActions.uiStopLoading())
                    })
                    .catch(error => {
                        console.log('error', error);
                        alert('Algo fue mal, por favor, prueba de nuevo!')
                        dispatch(uiActions.uiStopLoading())
                    });
            })
            .catch(error => {
                console.log('error', error);
                alert('Algo fue mal, por favor, prueba de nuevo!')
                dispatch(uiActions.uiStopLoading())
            });
    }

export const getPlaces = () => {
    return dispatch => {
        dispatch(authActions.authGetToken())
            .then(token =>
                fetch('https://rn-course-1537651935516.firebaseio.com/places.json?auth=' + token)
            )
            .catch(() => alert('No hay un token válido'))
            .then(response => response.json())
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
            .catch(error => {
                console.log('error', error);
                alert('Algo fue mal, por favor, prueba de nuevo!')
                dispatch(uiActions.uiStopLoading())
            });
    }
}

const setPlace = place => ({
    type: actionTypes.ADD_PLACE,
    place
})

const setPlaces = places => ({
    type: actionTypes.SET_PLACES,
    places
})

const removePlace = (key) => ({
    type: actionTypes.REMOVE_PLACE,
    key

})


export const deletePlace = (key) =>
    (dispatch) =>
    dispatch(authActions.authGetToken())
    .then(token =>
        fetch('https://rn-course-1537651935516.firebaseio.com/places/' + key + '.json?auth=' + token, {
            method: 'DELETE'
        }))
    .catch(() => alert('No hay un token válido'))
    .then(response => response.json())
    .catch(error => {
        console.log('error', error);
        alert('Algo fue mal, por favor, prueba de nuevo!')
    })
    .then(json => {
        dispatch(removePlace(key))
    })