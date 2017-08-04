import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements' 

import LoginHome from '../views/login_view.js'

const LoginView = ({ navigation }) => (
	<LoginHome navigation={navigation} />
);

const Login = StackNavigator({
	Login: {
		screen: LoginView,
		path: '/',
	}
})

Login.navigationOptions = {
	drawerLabel: 'Login',
	drawerIcon: ({ tintColor }) => (
		<Icon
			name="close-circle-outline"
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

export default Login
