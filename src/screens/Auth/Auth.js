import React, { Component } from 'react';
import {Dimensions, StyleSheet, View, Button, ImageBackground } from 'react-native';
import starMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {

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

	changeIdentificationTypeHandler = () => {
		this.setState( prevState => ({ isSignup: !prevState.isSignup }));
	}

	loginHandler = () => {
		starMainTabs();
	}

	render(){
		const passwordContainer = this.state.viewMode + 'PasswordContainer';
		const passwordWrapper = this.state.viewMode + 'PasswordWrapper';
		let headingText = null;
		if (Dimensions.get('window').height > 500) {
			headingText = (
				<MainText>
					<HeadingText>Por favor, identifícate</HeadingText>
				</MainText>)
		}

		return (
			<ImageBackground style={styles.backgroundImage} source={backgroundImage}>
				<View style={styles.container}>
					{headingText}
						<ButtonWithBackground color="#29aaf4" onPress={this.changeIdentificationTypeHandler}>
								{`Cambiar a ${this.state.isSignup ? 'Login' : 'Registrar'}`}
						</ButtonWithBackground>
						<View style={styles.inputContainer}>
							<DefaultInput style={styles.input} placeholder="Em@ail" />
							<View style={styles[passwordContainer]}>
								<View style={styles[passwordWrapper]}>
									<DefaultInput style={styles.input} placeholder="Password" />
								</View>
								<View style={styles[passwordWrapper]}>
									<DefaultInput style={styles.input} placeholder="Confirm Password" />
								</View>
							</View>
						</View>
						<ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
							Login
						</ButtonWithBackground>
				</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	backgroundImage:{
		width: '100%',
		flex: 1
	},
	inputContainer: {
		width: '80%'
	},
	input: {
		backgroundColor: '#eee',
		borderColor: '#bbb'
	},
	landscapePasswordContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	landscapePasswordWrapper: {
		width: '45%'
	},
	portraitPasswordContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start'
	},
	portraitPasswordWrapper: {
		width: '100%'
	}

});

export default AuthScreen;
