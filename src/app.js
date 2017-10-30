import React from 'react';
import { View, Image, Dimensions, Text } from 'react-native';
import { DrawerNavigator, DrawerItems, StackNavigator } from 'react-navigation';

import Login from './components/login/login';
import Logout from './components/login/logout';
import Fazenda from './components/places/places';
import Agenda from './components/menu/agenda';
import Sync from './components/sync/sync';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
	<View style={{ flex: 1 }}>
		<View style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}>
			<Image
				source={require('./images/petrovina.png')}
				style={{ width: SCREEN_WIDTH * 0.57 }}
				resizeMode="contain"
			/>
		</View>
		<DrawerItems {...props} />
	</View>
)

const MainRoot = DrawerNavigator(
	{
		Agenda: {
			path: '/agenda',
			screen: Agenda
		},
		Fazenda: {
			path: '/place',
			screen: Fazenda,
		},
		Sync: {
			path: '/sync',
			screen: Sync,
		},
		Logout: {
			path: '/logout',
			screen: Logout,
			navigationOptions: ({navigation}) => ({
				drawerLockMode: 'locked-closed'
		    })
		},
		Login: {
			path: '/login',
			screen: Login,
			navigationOptions: ({navigation}) => ({
				drawerLockMode: 'locked-closed',
		    }),
		}
	},
	{
		initialRouteName: 'Sync',
		contentOptions: {
			activeTintColor: '#338927',
			activeBackgroundColor: 'transparent',
			inactiveTintColor: 'gray',
			inactiveBackgroundColor: 'transparent',
			labelStyle: {
				fontSize: 15,
				marginLeft: 0,
			},
		},
		drawerWidth: SCREEN_WIDTH * 0.8,
		contentComponent: CustomDrawerContentComponent,
	}
)

export default MainRoot
