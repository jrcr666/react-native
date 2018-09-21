import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import PlaceList from '../../components/PlaceList/PlaceList';

class FindPlaceScreen extends Component {
	constructor(props){
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
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

	itemSelectedHandler = placeSelected => {

		this.props.navigator.push({
			screen: 'awesome-places.PlaceDetailScreen',
			title: placeSelected.name,
			passProps: {
				placeSelected
			}
		})
	}

	render(){
		return (
			<View>
				<Text>En la pantalla de buscar lugar</Text>
				<PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler}/>
			</View>
		)
	}
}

const mapStateToProps = state => ({
	places: state.places.places
})

export default connect(mapStateToProps)(FindPlaceScreen);