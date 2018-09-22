import React, { Component } from 'react';
import {Dimensions, StyleSheet, View, Button, 
	ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import starMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

import backgroundImage from '../../assets/background.jpg';
import * as actions from '../../store/actions/index';
import validate from '../../utility/validation';

class AuthScreen extends Component {

	state = {
		viewMode: Dimensions.get('window').height > 500 ? 'portrait': 'landscape',
		authMode: 'login',
		controls: {
			email: {
				value: '',
				valid: false,
				validation: {
					isEmail: true
					},
				touched: false
				},
			password:{
				value: '',
				valid: false,
				validation: {
					minLength: 6	
					},
				touched: false
				},
			confirmPassword:{
				value: '',
				valid: false,
				validation: {
					equalTo: 'password'	
				},
			touched: false
			}
		}
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

	switchAuthModelHandler = () => {
		this.setState( prevState => ({ authMode: prevState.authMode === 'login' ? 'signup': 'login'}));
	}

	loginHandler = () => {
		const {controls} = this.state;
		this.props.onLogin({
			email: controls.email.value,
			password: controls.password.value
		})

		starMainTabs();
	}

	updateInputState = (key, value) => {
		this.setState(prevState => {
			const validations = prevState.controls[key].validation;
			return {
				controls: {
					...prevState.controls,
					[key]: {
						...prevState.controls[key],
						touched: true,
						value,
						valid: validate(
							value,
							validations,
							validations.equalTo && prevState.controls[validations.equalTo].value
							)
					},
					...(key === 'password' ? {
						confirmPassword: {
							...prevState.controls.confirmPassword,
							valid: validate(
								prevState.controls.confirmPassword.value,
								prevState.controls.confirmPassword.validation, 
								value
							)
						}
					}: {})
				}
			}
		});
	}

	render(){
		const passwordContainer = this.state.viewMode + 'PasswordContainer';
		let passwordWrapper = this.state.viewMode + 'PasswordWrapper';
		let headingText = null;

		passwordWrapper = this.state.authMode === 'login' ? 'portraitPasswordWrapper' : passwordWrapper;

		if (Dimensions.get('window').height > 500) {
			headingText = (
				<MainText>
					<HeadingText>Por favor, identifícate</HeadingText>
				</MainText>)
		}

		return (
			<ImageBackground style={styles.backgroundImage} source={backgroundImage}>
				<KeyboardAvoidingView style={styles.container} behavior="padding">
					{headingText}
						<ButtonWithBackground
							color="#29aaf4" 
							onPress={this.switchAuthModelHandler}>
								Cambiar a {this.state.authMode === 'login' ? 'Sign Up' : 'Login'}
						</ButtonWithBackground>
						<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
							<View style={styles.inputContainer}>
								<DefaultInput 
									style={styles.input}
									placeholder="Em@ail" 
									value={this.state.controls.email.value}
									onChangeText={(value) => this.updateInputState('email', value)}
									valid={this.state.controls.email.valid}
									touched={this.state.controls.email.touched}
									autoCapitalize="none"
									autoCorrect={false}
									keyboardType="email-address"
									/>
								<View style={styles[passwordContainer]}>
									<View style={styles[passwordWrapper]}>
										<DefaultInput
											style={styles.input}
											placeholder="Password"
											value={this.state.controls.password.value}
											onChangeText={(value) => this.updateInputState('password', value)}
											valid={this.state.controls.password.valid}
											touched={this.state.controls.password.touched}
											secureTextEntry
											/>
									</View>
									{this.state.authMode === 'signup' && <View style={styles[passwordWrapper]}>
										<DefaultInput
											style={styles.input}
											placeholder="Confirm Password"
											value={this.state.controls.confirmPassword.value}
											onChangeText={(value) => this.updateInputState('confirmPassword', value)}
											valid={this.state.controls.confirmPassword.valid}
											touched={this.state.controls.confirmPassword.touched}
											secureTextEntry
											/>
									</View>}
								</View>
							</View>
						</TouchableWithoutFeedback>
						<ButtonWithBackground
							disabled={
								!this.state.controls.email.valid ||
								!this.state.controls.password.valid ||
								(!this.state.controls.confirmPassword.valid && this.state.authMode === 'signup')
							}
							color="#29aaf4"
							onPress={this.loginHandler}>
							{this.state.authMode}
						</ButtonWithBackground>
				</KeyboardAvoidingView>
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

mapDispatchToProps = disatch => ({
	onLogin: (authData) => disatch(actions.tryAuth(authData))
})

export default connect(null, mapDispatchToProps)(AuthScreen);
