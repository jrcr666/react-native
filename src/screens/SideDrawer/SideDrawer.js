import React, { Component } from 'react';
import {Platform, View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class SideDrawer extends Component {

	render(){
		return (
			<View style={[
					styles.container, 
					{width: Dimensions.get('window').width * 0.8}
				]}>
				<TouchableOpacity onPress={this.props.onLogout}>
					<View style={styles.drawerItem}>
						<Icon 
							style={styles.drawerItemIcon}
							name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
							size={30} color="#aaa"/>
						<Text> Sign Out</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = new StyleSheet.create({
	container: {
		paddingTop: 50,
		backgroundColor: 'white',
		flex: 1
	},
	drawerItem: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#eee'
	},
	drawerItemIcon: {
		marginRight: 10,
		padding: 10
	}
})

const mapDispatchToProps = disatch => ({
	onLogout: () => disatch(actions.authLogout())
})

export default connect(null, mapDispatchToProps)(SideDrawer);