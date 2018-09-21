import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

class SharePlaceScreen extends Component {

	constructor(props){
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
		this.state = {
			placeName: ''
		}
	}

	onNavigatorEvent = event => {
		if (event.type === 'NavBarButtonPress') {
			if (event.id === 'sideDrawerToggle') {
				this.props.navigator.toggleDrawer({
					side: 'left'
				});
			}
		}
	}



	placeChangedHandler = placeName => {
		this.setState({placeName})
	}

	placeNameChangedHandler = () => {
		if (this.state.placeName.trim()){
			this.setState({placeName: ''})
			this.props.onPlaceAdded(this.state.placeName)
		}
	}

	render(){
		return (
			<ScrollView>
				<View style={styles.container}>
					<MainText>
						<HeadingText>
							¡Comparte un lugar!
						</HeadingText>
					</MainText>
					<PickImage />
					<PickLocation />
					<PlaceInput
						placeName={this.state.placeName}
						onChangeText={this.placeChangedHandler}/>
					<View style={styles.button}>
						<Button
							title="Compartir!"
							onPress={this.placeNameChangedHandler} />
					</View>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	},
	previewImage: {
		width: '100%',
		height: '100%'
	}
})

mapDispatchToProps = disatch => ({
	onPlaceAdded: (placeName) => disatch(actions.addPlace(placeName))
})

export default connect(null, mapDispatchToProps)(SharePlaceScreen);