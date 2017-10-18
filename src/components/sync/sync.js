import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation'
import {Grid, Col, Icon} from 'react-native-elements';

import _ from 'lodash'
import { API } from '../../utils/api'
import realm from '../../models/schemas'

import saveCrops from './crops'
import saveCultivars from './cultivars'
import saveSchedules from './schedules'
import savePlaces from './places'
import saveProductions from './productions'
import saveSeedBrands from './seedBrands'
import saveQuestions from './questions'
import saveAnswers from './answers'

class SyncView extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isUpdateProductions: false,
			isUpdateSchedules: false,
			isUpdateAnswersPlace: false,
			isSchedulesInSync: false,
			isCropsInSync: false,
			isCultivarsInSync: false,
			isPlacesInSync: false,
			isProductionsInSync: false,
			isSeedBrandsInSync: false,
			isQuestionsInSync: false,
			isAnswersInSync: false
		}
	}

	async componentDidMount() {

		//ENVIAR ATUALIZAÇÕES DA AGENDA PARA O SERVIDOR
		let schedules = realm.objects('Schedule')
		let itemsSchedules = schedules.reduce( (acc, x) => {
			acc[x.id] = x
			return acc
		}, {})
		await API.updateSyncSchedules(itemsSchedules)
		.then(response => response.json())
		.then(response => {
			console.log(response)
			this.setState({ isUpdateSchedules: true })
		})


		//ENVIAR ATUALIZAÇÕES DAS PRODUÇÕES PARA O SERVIDOR
		let productions = realm.objects('Production')
		let itemsProductions = productions.reduce( (acc, x) => {
			acc[x.id] = x
			return acc
		}, {})
		await API.updateSyncProductions(itemsProductions)
		.then(response => response.json())
		.then(response => {
			this.setState({ isUpdateProductions: true })
		})

		//ENVIAR ATUALIZAÇÕES DAS RESPOSTAS DAS PRODUÇÕES PARA O SERVIDOR
		let answersPlace = realm.objects('AnswerPlace')
		if(answersPlace.length > 0 ) {
			let itemsAnswersPlace = _.reduce(answersPlace, (obj,param)  => {
				obj[param.id] = param
				return obj
			}, {});

			console.log('itemsAnswersPlace', itemsAnswersPlace)
			await API.updateSyncAnswersPlace(itemsAnswersPlace)
			.then(response => response.json())
			.then(response => {
				if(response.schedules == true){
					realm.write(() => {
						let all = realm.objects('AnswerPlace')
	        			realm.delete(all)
	        		})
				}
				this.setState({ isUpdateAnswersPlace: true })
			})
		} else {
			this.setState({ isUpdateAnswersPlace: true })
		}

		await API.getSync()
		.then(response => response.json())
		.then(response => {
			console.log(response)
			realm.write(() => {
				saveCrops(response.crops).then( () => {
		            this.setState({ isCropsInSync: true })
		        })

		        saveCultivars(response.cultivars).then( () => {
		            this.setState({ isCultivarsInSync: true })
		        })

		        saveSeedBrands(response.seedBrands).then( () => {
		            this.setState({ isSeedBrandsInSync: true })
		        })

		        savePlaces(response.places).then( (resp) => {
		            this.setState({ isPlacesInSync: true })
		        })

				saveSchedules(response.schedules).then( () => {
		            this.setState({ isSchedulesInSync: true })
		        })

		        saveProductions(response.productions).then( () => {
		            this.setState({ isProductionsInSync: true })
		        })

		        saveQuestions(response.questions).then( () => {
		            this.setState({ isQuestionsInSync: true })
		        })

		        saveAnswers(response.answers).then( () => {
		            this.setState({ isAnswersInSync: true })
		        })
			})
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Status Sincronização:</Text>
				<Text>Atualização Agenda: {this.state.isUpdateSchedules ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Atualização Fazendas: {this.state.isUpdateProductions ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Atualização Questionário: {this.state.isUpdateAnswersPlace ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Safras: {this.state.isCropsInSync ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Cultivares: {this.state.isCultivarsInSync ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Marcas de Sementes: {this.state.isSeedBrandsInSync ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Fazendas: {this.state.isPlacesInSync ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Produções: {this.state.isProductionsInSync ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Agenda: {this.state.isSchedulesInSync ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Perguntas: {this.state.isQuestionsInSync ? 'Finalizado' : 'Aguardando'}</Text>
				<Text>Respostas: {this.state.isAnswersInSync ? 'Finalizado' : 'Aguardando'}</Text>
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
		paddingTop: 20,
		alignItems: 'center'
	},
	title: {
		padding: 20,
		fontWeight: '700',
		fontSize: 16
	}
})

export default Sync
