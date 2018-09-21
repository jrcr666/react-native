import React from 'react';
import {StyleSheet, Text, FlatList} from 'react-native';
import ListItem from '../ListItem/ListItem';

const listContainer = (props) => {

	return (
		<FlatList
			style={styles.listContainer} 
			data={props.places}
			renderItem={(info) => (
				<ListItem
					placeImg={info.item.image }
					onItemPressed={() => props.onItemSelected(info.item)}
					placeName={info.item.name}/>
					)}
				/>
	)
};

const styles = StyleSheet.create({
	listContainer: {
		width: '100%'
	}
});

export default listContainer;