import React, { Component } from 'react'
import { View, Text, StyleSheet, NetInfo } from 'react-native'
import { List, ListItem, Icon } from 'react-native-elements'

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

Places.navigationOptions = {
  drawerLabel: 'Fazendas',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="leaf"
      size={30}
      style={{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      type="material-community"
      color={tintColor}
    />
  )
}

const styles = StyleSheet.create({
  	container: {
  		flex: 1
  	}
})

