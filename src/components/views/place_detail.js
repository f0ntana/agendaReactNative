import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Platform, Dimensions, Text, Alert} from 'react-native';
import { Card, Badge, Button } from 'react-native-elements'
import moment from 'moment'
import _ from 'lodash'
import realm from '../../models/schemas'
import Graphic from './graphic'
import ListProductions from './agenda_list_productions'
import ActionButton from 'react-native-action-button'

export default class AgendaDetail extends Component {
	constructor(props) {
        super(props)
        this.state = {
            params: this.props.navigation.state.params,
            productions: {}
        }
    }

    componentWillMount(){
        let productions = realm.objects('Production').filtered('place_id = ' + this.state.params.id)
        this.setState({productions: productions})
    }

    renderProductionDetail (item) {
        const { navigate } = this.props.navigation
        let data = { ...item }
        if(!item){
            data = { new: true, place_id: this.props.navigation.state.params.place_id }
        }
        navigate('Place_Production', data)
    }

    writeSchedule() {
        realm.write(() => {
            let schedules = realm.objects('Schedule').sorted('id', true);
            let highestId = 1
            if(schedules.length > 0 ){
                highestId = (schedules[0].id + 1)
            }

            realm.create('Schedule', {
                id: highestId,
                place_id: this.state.params.id,
                name: 'Visita Exporádica',
                date: moment().subtract(3, 'hours').toDate(),
                description: 'Visita adicionada pelo App',
                resume: '',
                owner_present: false,
                finished: false,
                start_travel: false,
                startLat: '',
                startLong: '',
                endLat: '',
                endLong: '',
                new: true
            })
        })
        alert('Nova visita adicionada!')
    }

    newSchedule () {
        Alert.alert(
          'Adicionar Visita',
          'Deseja adicionar uma visita a está fazenda?',
          [
            {text: 'Cancel', onPress: () => false , style: 'cancel'},
            {text: 'OK', onPress: () => this.writeSchedule()},
          ],
          { cancelable: false }
        )
    }

    wholeProduction() {
        return this.state.productions.map( (production, i) => {
            return (
                <Card key={i} title={`Informações ${realm.objects('Crop').filtered('id = ' + production.crop_id)[0].name}`}>
                    <View>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Safra: </Text> { realm.objects('Crop').filtered('id = ' + production.crop_id)[0].name }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Cultivar: </Text> { realm.objects('Cultivar').filtered('id = ' + production.cultivar_id)[0].name }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Marca Semente: </Text> { realm.objects('SeedBrand').filtered('id = ' + production.seed_brand_id)[0].name }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Volume: </Text> { production.volume } sc 40KG
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Área: </Text> { production.area }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Produtividade: </Text> { production.productivity }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Data de Plantio: </Text> { moment(production.planting_date).format('DD/MM/YYYY') }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Data de Colheita: </Text> { moment(production.harvest_date).format('DD/MM/YYYY') }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>População: </Text> { production.population }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Espaçamento: </Text> { production.spacing }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Fertilidade: </Text> { production.fertility }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Argila: </Text> { production.argil }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>MO: </Text> { production.mo }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>P: </Text> { production.p }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>K: </Text> { production.k }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>V: </Text> { production.v }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Profundidade coleta: </Text> { production.depth_gathering }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Dessecada: </Text> { production.desiccation ? 'Sim' : 'Não' }
                        </Text>
                    </View>
                </Card>
            )
        })
    }

  	render() {
    	return (
            <ScrollView style={styles.container}>
                <Card title="DESCRIÇÃO FAZENDA">
                	<View style={styles.infos}>
                		<Text style={styles.infosText}>
	                    	<Text style={{ fontWeight: 'bold' }}>Cliente: </Text> { this.state.params.client_name }
	                    </Text>
                		<Text style={styles.infosText}>
	                    	<Text style={{ fontWeight: 'bold' }}>Fazenda: </Text>{ this.state.params.name }
	                    </Text>
                         <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Inscrição: </Text> { this.state.params.inscription}
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Contato: </Text> { this.state.params.client_contact}
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Telefone: </Text> { this.state.params.client_phone}
                        </Text>
                		<Text style={styles.infosText}>
                			<Text style={{ fontWeight: 'bold' }}>Endereço: </Text>{ this.state.params.address }
                		</Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Intinerário: </Text> { this.state.params.itinerary }
                        </Text>
                		<Text style={styles.infosText}>
                			<Text style={{ fontWeight: 'bold' }}>Cidade/UF: </Text> { this.state.params.city } - { this.state.params.state }
                		</Text>
                	</View>
                    <Graphic data={ this.state.productions } />
                    <ActionButton
                        buttonColor="rgba(231,76,60,1)"
                        onPress={() => this.newSchedule()}
                    />
                </Card>
                <Card>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>INFORMAÇÕES</Text>
                    </View>
                    <ListProductions data={ this.state.productions } onPress={(item) => this.renderProductionDetail(item)} />
                </Card>
            </ScrollView>
        )
  	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10
    },
    infos: {
		paddingTop: 15,
    },
    infosText: {
    	paddingBottom: 5,
    	fontSize: 13,
    	textAlign: 'justify'
    },
    title: {
    	alignItems: 'center'
    },
    titleText: {
    	fontSize: 16
    },
    boxchart: {
        flex: 1,
        alignItems: 'center',
    },
    chart: {
        width: 200,
        height: 200,
    }
})
