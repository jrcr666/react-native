import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';


class PickLocation extends Component {

  state = {
    focusedLocation: {
        latitude: 38.0143112,
        longitude: -3.3749966,
        latitudeDelta: 0.0122,
        longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
    },
    locationChosen: false
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    })
    this.setState(prevState => ({
      focusedLocation: {
        ...prevState.focusedLocation,
        latitude: coords.latitude,
        longitude: coords.longitude
      },
      locationChosen: true
    }))
  }

  getLocationHandler  = () => {
    navigator.geolocation.getCurrentPosition(({coords}) => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: coords.latitude,
            longitude: coords.longitude
          }
        }
      };
      this.pickLocationHandler(coordsEvent);
    },
    err => {
      console.warn(err);
      alert('No ha funcionado la localización automática')
    });
  }

  render(){
    let marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation}/>
    }

    return (
        <View style={styles.container}>
          <MapView
            ref={ref => this.map = ref}
            onPress={this.pickLocationHandler}
            initialRegion={this.state.focusedLocation}
            style={styles.map}>
              {marker}
            </MapView>
          <View style={styles.button}>
            <Button title="¡Localízame!" onPress={this.getLocationHandler} />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: 250
  },
  button: {
    margin: 8
  }
})

export default PickLocation;