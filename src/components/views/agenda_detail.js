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
console.log('cultivars', cultivars.length)
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
        this.state = {
            params: this.props.navigation.state.params,
            initialvalue: {
                // crop_id: this.props.navigation.state.params.place.plot.production.crop_id,
                // cultivar_id: this.props.navigation.state.params.place.plot.production.cultivar_id,
                // productivity: this.props.navigation.state.params.place.plot.production.productivity,
                // population: this.props.navigation.state.params.place.plot.production.population,
                // spacing: this.props.navigation.state.params.place.plot.production.spacing,
                // fertility: this.props.navigation.state.params.place.plot.production.fertility,
                // argil: this.props.navigation.state.params.place.plot.production.argil,
                // mo: this.props.navigation.state.params.place.plot.production.mo,
                // p: this.props.navigation.state.params.place.plot.production.p,
                // k: this.props.navigation.state.params.place.plot.production.k,
                // v: this.props.navigation.state.params.place.plot.production.v,
                // depth_gathering: this.props.navigation.state.params.place.plot.production.depth_gathering,
                // desiccation: this.props.navigation.state.params.place.plot.production.desiccation ? true : false,
                // owner_present: this.props.navigation.state.params.owner_present ? true : false,
                // harvest_date: new Date(moment(this.props.navigation.state.params.place.plot.production.harvest_date).valueOf()),
                // planting_date: new Date(moment(this.props.navigation.state.params.place.plot.production.planting_date).valueOf()),
            }
        }
    }

    saveChanges() {
        var value = this.refs.form.getValue()
        if (value) { 
          console.log(value)
        }
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
                	<View style={styles.infos}>
                		<Text style={styles.infosText}>
	                    	<Text style={{ fontWeight: 'bold' }}>Cliente: </Text>
	                    </Text>
                		<Text style={styles.infosText}>
	                    	<Text style={{ fontWeight: 'bold' }}>Fazenda: </Text>
	                    </Text>
                		<Text style={styles.infosText}>
                			<Text style={{ fontWeight: 'bold' }}>Endereço: </Text>
                		</Text>
                		<Text style={styles.infosText}>
                			<Text style={{ fontWeight: 'bold' }}>Intinerário: </Text>
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
