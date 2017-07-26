import React, { Component } from 'react'
import { View, Text, StyleSheet, NetInfo } from 'react-native'
import { List, ListItem } from 'react-native-elements'

import { realm } from '../../models/schemas'

let list = realm.objects('Place');

NetInfo.isConnected.fetch().then(isConnected => {
	console.log('First, is ' + (isConnected ? 'online' : 'offline'));
});
function handleFirstConnectivityChange(isConnected) {
  	console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
  	NetInfo.isConnected.removeEventListener(
    	'change',
    	handleFirstConnectivityChange
  	);
}
NetInfo.isConnected.addEventListener(
  	'change',
  	handleFirstConnectivityChange
);

export default class Places extends Component {
	static navigationOptions = {
	    tabBarLabel: 'Fazendas',
	}

 	render() {
	   	return (
	     	<View style={styles.container}>
		       	<List containerStyle={{marginBottom: 20}}>
					{
					    list.map((l, i) => (
					      	<ListItem
					        	key={i}
					        	title={l.name}
					      	/>
					    ))
					 }
				</List>
	     	</View>
	   	)
	}
}

const styles = StyleSheet.create({
  	container: {
  		flex: 1
  	}
})

