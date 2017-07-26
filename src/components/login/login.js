import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { FormLabel, FormInput, FormValidationMessage, Button, Card } from 'react-native-elements'

export default class Login extends Component {

	renderAgenda() {
		const { navigate } = this.props.navigation;
		navigate('Tabs');
	}

	render() {
		return (
			<View style={styles.container}>
				<Card containerStyle={{padding: 15}} title="LOGIN">
					<FormLabel>Email</FormLabel>
					<FormInput ref='forminput' textInputRef='email'/>
					<FormLabel>Senha</FormLabel>
					<FormInput/>
					<Button 
						icon={{name: 'user', type: 'font-awesome'}} 
						style={{ marginTop: 20}} 
						title='Entrar'
						onPress={() => this.renderAgenda()} />
				</Card>
			</View>
		)
	}	
}

const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  	},
  	form: {
  		backgroundColor: 'white',
  		margin: 15, 
  		flex: 1,
  	}
})
