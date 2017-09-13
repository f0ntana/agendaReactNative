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
	drawerLabel: ' ',
}

export default Login
