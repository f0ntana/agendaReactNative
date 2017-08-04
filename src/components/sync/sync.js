import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import moment from 'moment'

import { API } from '../../utils/api'
import realm from '../../models/schemas'

function saveSchedules(items) {
	let promise = new Promise( (resolve, reject) => {
		console.log('Sincronizando Agenda')
		let all = realm.objects('Schedule')
		realm.delete(all)
		items.map(item => {
			let schedule = realm.create('Schedule', {
				id: item.id,
				place_id: item.place_id,
				name: item.name,
				date: moment(item.date).toDate(),
				description: item.description,
				owner_present: item.owner_present ? true : false,
				finished: item.finished ? true : false,
			})
		})
		resolve()
	})
	return promise
}

function saveCrops(items) {
	let promise = new Promise( (resolve, reject) => {
		console.log('Sincronizando Safras')
		let all = realm.objects('Crop')
		realm.delete(all)
		items.map(item => {
			let crop = realm.create('Crop', {
				id: item.id,
				name: item.name
			})
		})
		resolve()
	})
	return promise
}

function saveCultivars(items) {
    let promise = new Promise( (resolve, reject) => {
        console.log('Sincronizando Cultivars')
        let all = realm.objects('Cultivar')
        realm.delete(all)
        items.map(item => {
            let cultivar = realm.create('Cultivar', {
                id: item.id,
                name: item.name,
                cycle: item.cycle ? item.cycle : '0',
                transgenic: item.transgenic ? true : false
            })
        })
        resolve()
    })

    return promise
}

function savePlaces(items) {
	let promise = new Promise( (resolve, reject) => {
		console.log('Sincronizando Fazendas')
		let all = realm.objects('Place')
		realm.delete(all)
		items.map(item => {
			let place = realm.create('Place', {
				id: item.id,
		  		client_id: item.client.id,
		  		client_name: item.client.name,
		  		crop_id: item.plot.production.crop_id,
			    cultivar_id: item.plot.production.cultivar_id,
			    name: item.name,
			    address: item.address,
			    itinerary: item.itinerary,
			    city: item.city.name,
			    state: item.city.state.slug,
			    productivity: item.plot.production.productivity,
			    planting_date: moment(item.plot.production.planting_date).toDate(),
			    harvest_date: moment(item.plot.production.harvest_date).toDate(),
			    population: item.plot.production.population,
			    spacing: item.plot.production.spacing,
			    fertility: item.plot.production.fertility,
			    argil: item.plot.production.argil,
			    mo: item.plot.production.mo,
			    p: item.plot.production.p,
			    k: item.plot.production.k,
			    v: item.plot.production.v,
			    depth_gathering: item.plot.production.depth_gathering,
			    desiccation: item.plot.production.desiccation ? true : false
			})
		})
		resolve()
	})
	return promise
}


class SyncView extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isUpdateSchedules: false,
			isSchedulesInSync: false,
			isCropsInSync: false,
			isCultivarsInSync: false,
			isPlacesInSync: false
		}
	}

	async componentDidMount() {
		console.log('Start Update')
		let places = realm.objects('Place')
		let items = places.reduce( (acc, x) => {
			acc[x.id] = x
			return acc
		}, {})
		await API.updateSync(items)
		.then(response => response.json())
		.then(response => {
			console.log('response', response)
			// if(response.success){
				this.setState({ isUpdateSchedules: true })	
			// }
		})

		console.log('Start Get')
		await API.getSync()
		.then(response => response.json())
		.then(response => {
			console.log(response)
			realm.write(() => {
				saveSchedules(response.schedules).then( () => {
		            this.setState({ isSchedulesInSync: true })
		        })
				saveCrops(response.crops).then( () => {
		            this.setState({ isCropsInSync: true })
		        })
				saveCultivars(response.cultivars).then( () => {
		            this.setState({ isCultivarsInSync: true })
		        })
				savePlaces(response.places).then( () => {
		            this.setState({ isPlacesInSync: true })
		        })
			})
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Sincronização:</Text>
				<Text>Update: {this.state.isUpdateSchedules ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Agenda: {this.state.isSchedulesInSync ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Safras: {this.state.isCropsInSync ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Cultivars: {this.state.isCultivarsInSync ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Fazendas: {this.state.isPlacesInSync ? 'Finalizado' : 'Aguardando'}</Text>
			</View>
		)
	} 
}

const Sync = StackNavigator({
  	SyncView: {
	    screen: SyncView,
	    path: '/',
	    navigationOptions: ({ navigation }) => ({
		    title: 'SINCRONIZAÇÃO',
		    headerLeft: (
		        <Icon
		          	name="menu"
		          	size={30}
		          	type="entypo"
		          	style={{ paddingLeft: 10 }}
		          	onPress={() => navigation.navigate('DrawerOpen')}
		        />
		    )
	    }),
  	}
})

Sync.navigationOptions = {
  	drawerLabel: 'Sincronizar',
  	drawerIcon: ({ tintColor }) => (
	    <Icon
	      	name="refresh"
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
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default Sync