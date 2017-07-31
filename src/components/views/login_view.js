import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Image } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, Button, Card } from 'react-native-elements'
import { Icon } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_DIVIDER = SCREEN_WIDTH / 3

export default class LoginHome extends Component {
	
	renderAgenda() {
		const { navigate } = this.props.navigation;
		navigate('Agenda');
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{ alignItems: 'center' }}>
					<Image
						source={ require('../../images/logo.png') }
						style={{ width: SCREEN_WIDTH * 0.40 }}
						resizeMode="contain"
					/>
				</View>
				<Card containerStyle={{padding: 15}} title="LOGIN">
					<FormLabel>Email</FormLabel>
					<FormInput ref='forminput' textInputRef='email'/>
					<FormLabel>Senha</FormLabel>
					<FormInput/>
					<Button 
						icon={{name: 'user', type: 'font-awesome'}} 
						style={{ marginTop: 20}} 
						title='Entrar'
						onPress={() => this.renderAgenda()} 
					/>
				</Card>
			</View>
		)
	}	
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	}
})