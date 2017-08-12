import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Image, AsyncStorage } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, Button, Card } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { API } from '../../utils/api'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_DIVIDER = SCREEN_WIDTH / 3

export default class LoginHome extends Component {

	constructor(props) {
		super(props)

		let token = AsyncStorage.getItem('_token').then( value => {
			if(value){
				const { navigate } = this.props.navigation;
				navigate('Agenda');	
			}
		})

		this.state = {
			email: '',
			password: ''
		}
	}
	
	doLogin() {
		API.postLogin(this.state)
		.then(response => response.json())
		.then(response => {
			if(response.data){
				try {
					AsyncStorage.setItem('_token', response.data.token);
				} catch (error) {
					alert('erro ao salvar token')
				}
				const { navigate } = this.props.navigation;
				navigate('Agenda');	
			} else {
				alert('Dados inválidos')	
			}
		})
	}

	render() {
		return (
			<KeyboardAwareScrollView ref='scroll'>
				<View style={{ alignItems: 'center' }}>
					<Image
						source={ require('../../images/logo.png') }
						style={{ width: SCREEN_WIDTH * 0.50 }}
						resizeMode="contain"
					/>
				</View>
				<FormLabel>Email</FormLabel>
				<FormInput 
					ref='forminput' 
					textInputRef='email'
					onChangeText={(val) => { this.setState( {'email': val} )}}
				/>
				<FormLabel>Senha</FormLabel>	
				<FormInput 
					ref='forminput'
					textInputRef='password'
					onChangeText={(val) => { this.setState( {'password': val} )}}
				/>
				<Button 
					icon={{name: 'user', type: 'font-awesome'}} 
					style={{ marginTop: 20}} 
					title='Entrar'
					onPress={() => this.doLogin()} 
				/>
			</KeyboardAwareScrollView>
		)
	}	
}