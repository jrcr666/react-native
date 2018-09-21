import React, { Component } from 'react';
import {ScrollView, Dimensions, Platform, StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class PlaceDetail extends Component {

	state = {
		viewMode: Dimensions.get('window').height > 500 ? 'portrait': 'landscape',
		isSignup: false
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
		const imageContainer = this.state.viewMode + 'ImageContainer';
		const detailsContainer = this.state.viewMode + 'DetailsContainer';

		return (
			<ScrollView>
				<View style={styles[container]}>
					<View style={styles[imageContainer]}>
						<Image 
							style={styles.placeImage} 
							source={this.props.placeSelected.image ? this.props.placeSelected.image : null}/>
					</View>
					<View style={styles[detailsContainer]}>
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
	landscapeImageContainer:{
		width: '45%'
	},
	portraitImageContainer:{
		width: '100%'
	},
	landscapeDetailsContainer:{
		width: '45%'
	},
	portraitDetailsContainer:{
		width: '100%'
	}
});

const mapDispatchToProps = disatch => ({
	onPlaceDelete: key => disatch(actions.deletePlace(key))
})

export default connect(null, mapDispatchToProps)(PlaceDetail);