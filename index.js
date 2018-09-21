import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';

const RNRedux = () =>(
	<Provider store={store}>
		<App />
	</Provider>
)

AppRegistry.registerComponent('rncourse', () => RNRedux);
