import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Icon , List, ListItem} from 'react-native-elements';

import _ from 'lodash'
import { API } from '../../utils/api'
import realm from '../../models/schemas'
import moment from 'moment'

import saveCrops from './crops'
import saveCultivars from './cultivars'
import saveSchedules from './schedules'
import savePlaces from './places'
import saveProductions from './productions'
import saveSeedBrands from './seedBrands'
import saveQuestions from './questions'
import saveAnswers from './answers'
import saveLastSync from './saveLastSync'

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
			isAnswersInSync: false,
			isLastSyncInSync: false
		}
	}

	async componentDidMount() {

		let lastDateSync = realm.objects('LastSync').filtered('id = 1')[0].date

		if(!lastDateSync) {
			lastDateSync = 0
		}

		if(lastDateSync){
			lastDateSync = moment(lastDateSync).toISOString()
		}

		//ENVIAR ATUALIZAÇÕES DA AGENDA PARA O SERVIDOR
		let schedules = realm.objects('Schedule')
		let itemsSchedules = schedules.reduce( (acc, x) => {
			acc[x.id] = x
			return acc
		}, {})
		await API.updateSyncSchedules(itemsSchedules)
		.then(response => response.json())
		.then(response => {
			this.setState({ isUpdateSchedules: true })
		})


		//ENVIAR ATUALIZAÇÕES DAS PRODUÇÕES PARA O SERVIDOR
		let productions = realm.objects('Production').filtered('needSync = true')
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

		//RECEBER AS SAFRAS
		await API.getSyncCrops()
		.then(response => response.json())
		.then(response => {
			realm.write(() => {
				saveCrops(response.crops).then( () => {
		            this.setState({ isCropsInSync: true })
		        })
			})
		})

		//RECEBER AS CULTURAS
		await API.getSyncCultivars()
		.then(response => response.json())
		.then(response => {
			realm.write(() => {
				saveCultivars(response.cultivars).then( () => {
		            this.setState({ isCultivarsInSync: true })
		        })
			})
		})

		//RECEBER AS MARCAS DE SEMENTES
		await API.getSyncSeedBrands()
		.then(response => response.json())
		.then(response => {
			realm.write(() => {
				saveSeedBrands(response.seedBrands).then( () => {
		            this.setState({ isSeedBrandsInSync: true })
		        })
			})
		})

		//RECEBER FAZENDAS
		await API.getSyncPlaces(lastDateSync)
		.then(response => response.json())
		.then(response => {
			realm.write(() => {
				savePlaces(response.places).then( (resp) => {
		            this.setState({ isPlacesInSync: true })
		        })
			})
		})

		//RECEBER PRODUÇÕES
		await API.getSyncProductions(lastDateSync)
		.then(response => response.json())
		.then(response => {
			realm.write(() => {
				saveProductions(response.productions).then( () => {
		            this.setState({ isProductionsInSync: true })
		        })
			})
		})

		//RECEBER VISITAS
		await API.getSyncSchedules()
		.then(response => response.json())
		.then(response => {
			realm.write(() => {
				saveSchedules(response.schedules).then( () => {
		            this.setState({ isSchedulesInSync: true })
		        })
			})
		})

		//RECEBER VISITAS
		await API.getSyncQuestions()
		.then(response => response.json())
		.then(response => {
			realm.write(() => {
				saveQuestions(response.questions).then( () => {
		            this.setState({ isQuestionsInSync: true })
		        })
			})
		})

		//RECEBER OS RESPOSTAS
		await API.getSyncAnswers()
		.then(response => response.json())
		.then(response => {
			realm.write(() => {
		        saveAnswers(response.answers).then( () => {
		            this.setState({ isAnswersInSync: true })
		        })
			})
		})

		await saveLastSync()
		.then( () => {
			this.setState({ isLastSyncInSync: true })
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<List>
					<ListItem hideChevron={true} title="Atualização Agenda" leftIcon={{ name: this.state.isUpdateSchedules ? 'check' : 'cached' }} />
					<ListItem hideChevron={true} title="Atualização Fazendas" leftIcon={{ name: this.state.isUpdateProductions ? 'check' : 'cached' }} />
					<ListItem hideChevron={true} title="Atualização Questionário" leftIcon={{ name: this.state.isUpdateAnswersPlace ? 'check' : 'cached' }} />
					<ListItem hideChevron={true} title="Safras" leftIcon={{ name: this.state.isCropsInSync ? 'check' : 'cached' }} />
					<ListItem hideChevron={true} title="Cultivares" leftIcon={{ name: this.state.isCultivarsInSync ? 'check' : 'cached' }} />
					<ListItem hideChevron={true} title="Marcas de Sementes" leftIcon={{ name: this.state.isSeedBrandsInSync ? 'check' : 'cached' }} />
					<ListItem hideChevron={true} title="Fazendas" leftIcon={{ name: this.state.isPlacesInSync ? 'check' : 'cached' }} />
					<ListItem hideChevron={true} title="Produções" leftIcon={{ name: this.state.isProductionsInSync ? 'check' : 'cached' }} />
					<ListItem hideChevron={true} title="Agenda" leftIcon={{ name: this.state.isSchedulesInSync ? 'check' : 'cached' }} />
					<ListItem hideChevron={true} title="Perguntas" leftIcon={{ name: this.state.isQuestionsInSync ? 'check' : 'cached' }} />
					<ListItem hideChevron={true} title="Respostas" leftIcon={{ name: this.state.isAnswersInSync ? 'check' : 'cached' }} />
					<ListItem hideChevron={true} title="Recursos" leftIcon={{ name: this.state.isLastSyncInSync ? 'check' : 'cached' }} />
				</List>
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
		flex: 1
	}
})

export default Sync
