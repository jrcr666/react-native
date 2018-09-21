import React from 'react';
import { Text, View, Button} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';


const placeInput = props => (
	<DefaultInput 
		placeholder="Nombre del lugar"
		onChangeText={props.onChangeText}
		value={props.placeName}/>
);

export default placeInput;