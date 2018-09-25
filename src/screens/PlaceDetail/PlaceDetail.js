import React, { Component } from 'react';
import {ScrollView, Dimensions, Platform, StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import MapView from 'react-native-maps';

class PlaceDetail extends Component {

	state = {
		viewMode: Dimensions.get('window').height > 500 ? 'portrait': 'landscape',

	    focusedLocation: {
	        latitudeDelta: 0.0122,
	        longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
	    },
	}

	constructor(props){
		super(props);
		Dimensions.addEventListener('change', this.updateStyles);
	}

	componentWillUnmount() {
		Dimensions.removeEventListener('change', this.updateStyles);
	}

	updateStyles = (dims) => {
		this.setState({
			viewMode: dims.window.height > 500 ? 'portrait': 'landscape'
		})
	}
	placeDeletedHandler = () => {
		this.props.onPlaceDelete(this.props.placeSelected.key);
		this.props.navigator.pop();
	}

	render(){
		const container = this.state.viewMode + 'Container';
		const subContainer = this.state.viewMode + 'SubContainer';
		const location = {
	    	...this.state.focusedLocation,
	    	...this.props.placeSelected.location
	    }

		return (
			<ScrollView>
				<View style={styles[container]}>
					<View style={styles[subContainer]}>
						<Image 
							style={styles.placeImage} 
							source={this.props.placeSelected.image ? this.props.placeSelected.image : null}/>
							
					</View>
					<View style={styles[subContainer]}>
			      		<MapView
						initialRegion={location}
						style={styles.map}>
							<MapView.Marker coordinate={location}/>
						</MapView>
	      			</View>
					<View style={styles[subContainer]}>
						<Text style={styles.placeName}>{this.props.placeSelected.name}</Text>
						<TouchableOpacity onPress={this.placeDeletedHandler}>
							<View style={styles.deleteButton}>
								<Icon size={30} name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} color="red"/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	landscapeContainer: {
		margin: 22,
		flexDirection: 'row'
	},
	portraitContainer: {
		margin: 22,
		flexDirection: 'column'
	},
	placeImage: {
		width: '100%',
		height: 200
	},
	placeName: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 28

	},
	deleteButton: {
		alignItems: 'center'
	},
	landscapeSubContainer:{
		width: '30%'
	},
	portraitSubContainer:{
		width: '100%'
	},
	map:{
		width: '100%',
		height: 250
	}
});

const mapDispatchToProps = disatch => ({
	onPlaceDelete: key => disatch(actions.deletePlace(key))
})

export default connect(null, mapDispatchToProps)(PlaceDetail);