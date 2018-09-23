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

import validate from '../../utility/validation';


class SharePlaceScreen extends Component {

	static navigatorStyle = {
		navBarButtonColor: 'orange'
	}

	constructor(props){
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
	}

	state = {
		controls: {
			placeName: {
			value: '',
			valid: false,
			validation: {
				isRequired: true
				},
			touched: false
			},
		location: {
			value: null,
			valid: false
			}
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

	placeChangedHandler = value => {
		this.setState(prevState => ({
			controls: {
				...prevState.controls,
				placeName: {
					...prevState.controls.placeName,
					value,
					valid: validate(value, prevState.controls.placeName.validation),
					touched: true
				}
			}
		}))
	}

	locationPickedHandler = location => {
		this.setState( prevState =>({
			controls: {
				...prevState.controls,
				location: {
					...prevState.location,
					value: location,
					valid: true
				}
			}
		}));
	}

	placeSubmitHandler = () => {
		const {placeName, location} = this.state.controls;
		this.props.onPlaceAdded(placeName.value, location.value);
		this.setState(prevState => ({
			controls: {
				...prevState.controls,
				placeName: {
					...prevState.controls.placeName,
					value: '',
					valid: false,
					touched: false
				}
			}		
		}))
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
					<PickLocation onLocationPick={this.locationPickedHandler} />
					<PlaceInput
						placeName={this.state.controls.placeName.value}
						onChangeText={(value) => this.placeChangedHandler(value)}
						valid={this.state.controls.placeName.valid}
						touched={this.state.controls.placeName.touched}
						/>
					<View style={styles.button}>
						<Button
							disabled={
								!this.state.controls.placeName.valid ||
								!this.state.controls.location.valid
							}
							title="Compartir!"
							onPress={this.placeSubmitHandler} />
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
	onPlaceAdded: (placeName, location) => disatch(actions.addPlace(placeName, location))
})

export default connect(null, mapDispatchToProps)(SharePlaceScreen);