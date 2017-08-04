import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Platform, Dimensions, Text} from 'react-native';
import { Card, Badge, Button } from 'react-native-elements'
import moment from 'moment'
import _ from 'lodash'
import t from 'tcomb-form-native'

import realm from '../../models/schemas'

var width = Dimensions.get('window').width - 20
var Form = t.form.Form
let myFormatFunction = (format,date) =>{
    return moment(date).format(format)
}

var PlantingDate = {
    label: 'Data Plantio',
    mode:'date',
    config: {
        format: (date) => myFormatFunction("DD/MM/YYYY", date)
    }
}

var HarvestDate = {
    label: 'Data Colheita',
    mode:'date',
    config: {
        format: (date) => myFormatFunction("DD/MM/YYYY", date)
    }
}

let crops = realm.objects('Crop')
let objCrop = crops.reduce((acc,row) => {
    acc[row.id] = row.name
    return acc
}, {})
var Crop = t.enums(objCrop, "Crop")

let cultivars = realm.objects('Cultivar')
let objCultivar = cultivars.reduce((acc,row) => {
    acc[row.id] = row.name
    return acc
}, {})
var Cultivar = t.enums(objCultivar, "Cultivar")

var Infos = t.struct({
    crop_id: Crop,
    cultivar_id: Cultivar,
    productivity: t.Number,
    planting_date: t.Date,
    harvest_date: t.Date,
    population: t.Number,
    spacing: t.Number,
    fertility: t.Number,
    argil: t.Number,
    mo: t.Number,
    p: t.Number,
    k: t.Number,
    v: t.Number,
    depth_gathering: t.Number,
    desiccation: t.Boolean,
    owner_present: t.Boolean,
})

let formOptions = {
    fields: {
        crop_id: { label: 'Safra' },
        cultivar_id: { label: 'Cultivar' },
        productivity: { label: 'Produtividade' },
        population: { label: 'População' },
        spacing: { label: 'Espaçamento' },
        fertility: { label: 'Fertilidade' },
        argil: { label: 'Argila' },
        mo: { label: 'MO' },
        p: { label: 'P' },
        k: { label: 'K' },
        v: { label: 'V' },
        depth_gathering: { label: 'Profundidade Coleta' },
        desiccation: { label: 'Dessecada' },
        owner_present: { label: 'Proprietátio Presente' },
        harvest_date: HarvestDate,
        planting_date: PlantingDate,
    }
}

export default class AgendaDetail extends Component {
	constructor(props) {
        super(props)

        setTimeout(1000)
        var place = realm.objects('Place').filtered(`id = ${this.props.navigation.state.params.place_id}`)[0]
        this.state = {
            schedule: this.props.navigation.state.params,
            params: place,
            latitude: null,
            longitude: null,
            error: null,
            initialvalue: {
                crop_id: place.crop_id,
                cultivar_id: place.cultivar_id,
                productivity: place.productivity,
                population: place.population,
                spacing: place.spacing,
                fertility: place.fertility,
                argil: place.argil,
                mo: place.mo,
                p: place.p,
                k: place.k,
                v: place.v,
                depth_gathering: place.depth_gathering,
                desiccation: place.desiccation,
                owner_present: this.props.navigation.state.params.owner_present,
                harvest_date: new Date(moment(place.harvest_date).valueOf()),
                planting_date: new Date(moment(place.planting_date).valueOf()),
            }
        }
        console.log(this.state.params)
    }

    saveChanges() {
        var value = this.refs.form.getValue()
        if (value) {
            console.log(value)
            realm.write(() => {
                let schedule = realm.objects('Schedule').filtered(`id = ${this.state.schedule.id}`)[0]
                schedule.owner_present = value.owner_present

                let place = realm.objects('Place').filtered(`id = ${this.props.navigation.state.params.place_id}`)[0]
                place.crop_id = parseInt(value.crop_id)
                place.cultivar_id = parseInt(value.cultivar_id)
                place.productivity = value.productivity
                place.population = value.population
                place.spacing = value.spacing
                place.fertility = value.fertility.toString()
                place.argil = value.argil
                place.mo = value.mo
                place.p = value.p
                place.k = value.k
                place.v = value.v
                place.depth_gathering = value.depth_gathering
                place.desiccation = value.desiccation
                place.harvest_date = value.harvest_date
                place.planting_date = value.planting_date
            })
            alert('Salvo com sucesso')
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                })
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        )
    }

  	render() {
    	const { navigation } = this.props;

    	return (
            <ScrollView style={styles.container}>
                <Card title={ this.state.params.name }>
                	<View style={styles.title}>
                        <Text style={styles.titleText}>
                            DESCRIÇÃO VISITA
                        </Text>
                    </View>
                    <View style={styles.title}>
                		<Text>Latitude: {this.state.latitude}</Text>
                        <Text>Longitude: {this.state.longitude}</Text>
                        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                	</View>
                	<View style={styles.infos}>
                		<Text style={styles.infosText}>
	                    	<Text style={{ fontWeight: 'bold' }}>Cliente: </Text> {this.state.params.client_name}
	                    </Text>
                		<Text style={styles.infosText}>
	                    	<Text style={{ fontWeight: 'bold' }}>Fazenda: </Text> {this.state.params.name}
	                    </Text>
                		<Text style={styles.infosText}>
                			<Text style={{ fontWeight: 'bold' }}>Endereço: </Text> {this.state.params.address}
                		</Text>
                		<Text style={styles.infosText}>
                			<Text style={{ fontWeight: 'bold' }}>Intinerário: </Text> {this.state.params.itinerary}
                		</Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Cidade/UF: </Text> {this.state.params.city} - {this.state.params.state}
                        </Text>
                	</View>
                	<View style={styles.infos}>
                        <Form
                            ref="form"
                            type={Infos}
                            value={this.state.initialvalue}
                            options={formOptions}
                        />
                        <Button
                            raised
                            icon={{name: 'check', size: 32}}
                            buttonStyle={{backgroundColor: 'gray', borderRadius: 10}}
                            textStyle={{textAlign: 'center'}}
                            title={`Salvar alterações`}
                            onPress={this.saveChanges.bind(this)}
                        />
                	</View>
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
    }
})
