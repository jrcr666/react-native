import React, { Component } from 'react';
import { Text, View, Button, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';


class PickLocation extends Component {

  render(){
    return (
        <View style={styles.container}>
          <View style={styles.placeholder}>
            <Text>MAP</Text>
          </View>
          <View style={styles.button}>
            <Button title="¡Localízame!" onPress={() => alert('Localización')} />
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
  placeholder: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  button: {
    margin: 8
  }
})

export default PickLocation;