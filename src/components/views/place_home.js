import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native'
import { StackNavigator } from 'react-navigation';
import { List, ListItem, Icon, Card } from 'react-native-elements'
import realm from '../../models/schemas'

class PlaceHome extends Component {
	constructor(props) {
		super(props)
		this.state = {
			list: [],
			newlist: [],
			text: ''
		}
	}

	componentDidMount(){
		let list = realm.objects('Place').sorted('name')
		this.setState({list: list})
		this.setState({newlist: list})
	}

	filterList(text) {
		this.setState({ text: text })
		let newlist = this.state.list.filter( (item) => {
			if (item.name.toLowerCase().indexOf(text.toLowerCase()) != -1 || item.client_name.toLowerCase().indexOf(text.toLowerCase()) != -1) {
			 	return item
			}
		})
		this.setState({ newlist: newlist })
	}

	renderPlaceDetail (item) {
		const { navigate } = this.props.navigation;
		navigate('Place_Detail', item);
	}

	renderRow (data) {
		return (
			<ListItem
				key={data.id}
				title={ `${data.name}` }
				subtitle={
		          	<View>
		            	<Text style={{ fontSize: 12, marginLeft: 10 }}>{data.client_name}</Text>
		            	<Text style={{ fontSize: 12, marginLeft: 10 }}>{`${data.city} - ${data.state}`}</Text>
		          	</View>
		        }
				onPress={() => this.renderPlaceDetail(data)}
			/>
		)
	}

	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<List containerStyle={{marginBottom: 20, marginTop: 0}}>
					<ListItem
						title="Pesquisar"
						subtitle={
				          	<View>
				            	<TextInput
							        style={{ height: 40, marginLeft: 5, marginRight: 5, alignItems: 'stretch', color: '#fff'}}
							        onChangeText={(text) => this.filterList(text)}
							        value={this.state.text}
							        placeholder="Cliente ou Fazenda"
							        placeholderTextColor="#fff"
							    />
				          	</View>
				        }
				        style={{ backgroundColor: '#088A08' }}
				        titleStyle={{ color: '#fff', fontSize: 16}}
				        hideChevron={true}
					/>
					<FlatList
					  	data={this.state.newlist}
					  	renderItem={({item}) => this.renderRow(item) }
					  	keyExtractor={(item, index) => item.id}
					/>
				</List>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	viewTitle: {
		alignItems: 'center',
	},
	title: {
		justifyContent: 'center',
		alignItems: 'stretch'
	},
	textTitle: {
		fontSize: 18
	}
})

export default PlaceHome
