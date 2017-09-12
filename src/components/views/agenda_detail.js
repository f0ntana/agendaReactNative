import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native'
import { Card, Badge, Button, List, ListItem } from 'react-native-elements'
import moment from 'moment'
import t from 'tcomb-form-native'
import realm from '../../models/schemas'
import Graphic from './graphic'
import _ from 'lodash'
import ActionButton from 'react-native-action-button'
import { Icon } from 'react-native-elements'
import Modal from 'react-native-modal'

import ListProductions from './agenda_list_productions'

export default class AgendaDetail extends Component {
	constructor(props) {
        super(props)
        var place = realm.objects('Place').filtered(`id = ${this.props.navigation.state.params.place_id}`)[0]
        var schedule = realm.objects('Schedule').filtered(`id = ${this.props.navigation.state.params.id}`)[0]
        this.state = {
            schedule: schedule,
            place: place,
            productions: {},
            isModalVisible: false,
            resume: ''
        }
    }

    componentWillMount () {
        let productions = realm.objects('Production').filtered('place_id = ' + this.state.place.id).sorted('crop_id', 'DESC')
        this.setState({ productions: productions })
    }

    _showModal() {
        this.setState({ isModalVisible: true })
    }

    _hideModal(finished) {
        if(!this.state.resume){
            alert('Favor faça um resumo')
            return
        }
        realm.write(() => {
            let schedule = realm.objects('Schedule').filtered(`id = ${this.state.schedule.id}`)[0]
            schedule.resume = this.state.resume
        })

        this.setState({ isModalVisible: false })
    }


    getPosition() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                })

                realm.write(() => {
                    let schedule = realm.objects('Schedule').filtered(`id = ${this.state.schedule.id}`)[0]
                    if (schedule.finished) {
                        return alert('Visita já finalizada')
                    }
                    if (schedule.start_travel) {
                        schedule.endLat = String(this.state.latitude)
                        schedule.endLong = String(this.state.longitude)
                        schedule.finished = true
                        this.setState({ finished: true })
                        return this._showModal()
                    }
                    schedule.startLat = String(this.state.latitude)
                    schedule.startLong = String(this.state.longitude)
                    schedule.start_travel = true
                    this.setState({ start_travel: true  })
                    return alert('Visita iniciada')
                })
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 },
        )
    }

    renderProductionDetail (item) {
        const { navigate } = this.props.navigation
        let data = { ...item }
        if(!item){
            data = { new: true, place_id: this.props.navigation.state.params.place_id }
        }
        navigate('Agenda_Production', data)
    }

  	render() {
    	const { navigation } = this.props

    	return (
            <ScrollView style={styles.container}>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={styles.modalContent}>
                        <Text>Resumo da visita</Text>
                        <TextInput
                            style={{height: 60, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(resume) => this.setState({ resume })}
                            value={this.state.resume}
                          />
                        <View style={{ flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => this._hideModal()} style={ styles.buttonSave }>
                                <Text>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Card title={ this.state.place.name }>
                	<View style={styles.title}>
                        <Text style={styles.titleText}>
                            DESCRIÇÃO VISITA
                        </Text>
                    </View>
                	<View style={styles.infos}>
                		<Text style={styles.infosText}>
	                    	<Text style={{ fontWeight: 'bold' }}>Cliente: </Text> {this.state.place.client_name}
	                    </Text>
                		<Text style={styles.infosText}>
	                    	<Text style={{ fontWeight: 'bold' }}>Fazenda: </Text> {this.state.place.name}
	                    </Text>
                		<Text style={styles.infosText}>
                			<Text style={{ fontWeight: 'bold' }}>Endereço: </Text> {this.state.place.address}
                		</Text>
                		<Text style={styles.infosText}>
                			<Text style={{ fontWeight: 'bold' }}>Intinerário: </Text> {this.state.place.itinerary}
                		</Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Cidade/UF: </Text> {this.state.place.city} - {this.state.place.state}
                        </Text>
                	</View>
                    <Graphic data={ this.state.productions } />
                    <ActionButton
                        buttonColor="rgba(231,76,60,1)"
                        onPress={() => this.renderProductionDetail()}
                    />
                </Card>
                <Button
                    icon={this.state.schedule.finished ? {name: 'ban', type: 'font-awesome'} : {name: 'cached'}}
                    title={ this.state.schedule.finished ? 'Finalizada' : this.state.schedule.start_travel ? 'Finalizar Visita': 'Iniciar Visita'}
                    backgroundColor={this.state.schedule.start_travel ? 'red': 'green'}
                    style={{ marginTop: 5, borderRadius: 4, borderColor: 'rgba(0, 0, 0, 0.1)'}}
                    onPress={ () => this.getPosition() }
                />
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
    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    buttonSave: {
        backgroundColor: 'green',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    buttonCancel: {
        backgroundColor: 'lightgray',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    }
})