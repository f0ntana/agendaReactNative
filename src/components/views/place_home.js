import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation';
import { List, ListItem, Icon } from 'react-native-elements'
import realm from '../../models/schemas'

class PlaceHome extends Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [],
		}
	}

	componentDidMount(){
		let list = realm.objects('Place')
		this.setState({list: list})
	}

	renderPlaceDetail(item) {
		const { navigate } = this.props.navigation;
		navigate('Place_Detail', item);
	}

	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.title}>
					<Text style={styles.textTitle}>Listagem das fazendas</Text>
				</View>
				<List containerStyle={{marginBottom: 20}}>
				{
					this.state.list.map((l, i) => (
						<ListItem
							key={i}
							title={l.name}
							onPress={() => this.renderPlaceDetail(l)}
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
	},
	title: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	textTitle: {
		marginTop: 15,
		fontSize: 18
	}
})

export default PlaceHome
