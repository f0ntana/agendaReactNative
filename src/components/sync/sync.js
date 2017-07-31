import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

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
				date: new Date(item.date),
				description: item.description,
				owner_present: item.owner_present ? true : false,
				finished: item.finished ? true : false,
			})
			console.log(schedule.id)
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
			console.log(crop.id)
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
            console.log(cultivar.id)
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
			    planting_date: new Date(item.plot.production.planting_date),
			    harvest_date: new Date(item.plot.production.harvest_date),
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
			console.log(place.id)
		})
		resolve()
	})
	return promise
}


export default class Sync extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isSchedulesInSync: false,
			isCropsInSync: false,
			isCultivarsInSync: false,
			isPlacesInSync: false
		}
	}

	componentDidMount() {
		console.log('componentDidMount')
		API.getSync()
		.then(response => response.json())
		.then(response => {
			realm.write(() => {
				console.log('Iniciando Agenda')
				saveSchedules(response.schedules).then( () => {
					console.log('Promise Agenda')
		            this.setState({ isSchedulesInSync: true })
		        })
				console.log('Iniciando Safras')
				saveCrops(response.crops).then( () => {
					console.log('Promise Safras')
		            this.setState({ isCropsInSync: true })
		        })
				console.log('Iniciando Cultivars')
				saveCultivars(response.cultivars).then( () => {
					console.log('Promise Cultivars')
		            this.setState({ isCultivarsInSync: true })
		        })
				console.log('Iniciando Fazendas')
				savePlaces(response.places).then( () => {
					console.log('Promise Fazendas')
		            this.setState({ isPlacesInSync: true })
		        })
			})
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Sincronização:</Text>
				<Text>Agenda: {this.state.isSchedulesInSync ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Safras: {this.state.isCropsInSync ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Cultivars: {this.state.isCultivarsInSync ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Fazendas: {this.state.isPlacesInSync ? 'Finalizado' : 'Aguardando'}</Text>
			</View>
		)
	} 
}

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