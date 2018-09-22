import React from 'react';
import { Text, View, Button} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';


const placeInput = props => (
	<DefaultInput 
		placeholder="Nombre del lugar"
		value={props.placeName} {...props}/>
);

export default placeInput;