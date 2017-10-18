import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Text} from 'react-native'
import { Card, Badge, Button, List, ListItem } from 'react-native-elements'
import moment from 'moment'
import t from 'tcomb-form-native'
import realm from '../../models/schemas'
import _ from 'lodash'

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

let seedBrands = realm.objects('SeedBrand')
let objSeedBrand = seedBrands.reduce((acc,row) => {
    acc[row.id] = row.name
    return acc
}, {})
var SeedBrand = t.enums(objSeedBrand, "SeedBrand")

var Infos = t.struct({
    crop_id: Crop,
    cultivar_id: Cultivar,
    seed_brand_id: SeedBrand,
    volume: t.Number,
    area: t.Number,
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
})

let formOptions = {
    fields: {
        crop_id: { label: 'Safra' },
        cultivar_id: { label: 'Cultivar' },
        seed_brand_id: { label: 'Marca Semente' },
        volume: { label: 'Volume Saco 40Kg' },
        area: { label: 'Área' },
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
        harvest_date: HarvestDate,
        planting_date: PlantingDate,
    }
}

export default class AgendaProduction extends Component {
    constructor (props) {
        super(props)
        let production = {}
        let newProduction = false
        if(this.props.navigation.state.params && this.props.navigation.state.params.id){
            production = realm.objects('Production').filtered(`id = ${this.props.navigation.state.params.id}`)[0]
        }
        if(this.props.navigation.state.params && this.props.navigation.state.params.new){
            newProduction = true
        }

        let place = realm.objects('Place').filtered(`id = ${this.props.navigation.state.params.place_id}`)[0]

        this.state = {
            newProduction: newProduction,
            production: production,
            place: place,
            initialvalue: {
                crop_id: production.crop_id,
                cultivar_id: production.cultivar_id,
                seed_brand_id: production.seed_brand_id,
                volume: production.volume,
                area: production.area,
                productivity: production.productivity,
                population: production.population,
                spacing: production.spacing,
                fertility: production.fertility,
                argil: production.argil,
                mo: production.mo,
                p: production.p,
                k: production.k,
                v: production.v,
                depth_gathering: production.depth_gathering,
                desiccation: production.desiccation,
                harvest_date: new Date(moment(production.harvest_date).valueOf()),
                planting_date: new Date(moment(production.planting_date).valueOf()),
            }
        }
    }

    saveChanges() {
        var value = this.refs.form.getValue()
        if (value) {
            realm.write(() => {

                let data = {
                    place_id: parseInt(this.state.place.id),
                    crop_id: parseInt(value.crop_id),
                    cultivar_id: parseInt(value.cultivar_id),
                    seed_brand_id: parseInt(value.seed_brand_id),
                    volume: value.volume || 0,
                    area: value.area|| 0,
                    productivity: value.productivity|| 0,
                    population: value.population || 0,
                    spacing: value.spacing || 0,
                    fertility: value.fertility || 0,
                    argil: value.argil || 0,
                    mo: value.mo || 0,
                    p: value.p || 0,
                    k: value.k || 0,
                    v: value.v || 0,
                    depth_gathering: value.depth_gathering || 0,
                    desiccation: value.desiccation || false,
                    harvest_date: value.harvest_date || moment().toDate(),
                    planting_date: value.planting_date || moment().toDate(),
                    type: this.state.production.type || 0,
                    finished: this.state.production.finished || false,
                    new: this.state.production.new || false,
                }

                if (this.state.newProduction == false) {
                    let production = realm.objects('Production').filtered(`id = ${this.props.navigation.state.params.id}`)[0]
                    production = _.merge(production, data)
                } else {
                    data.id = new Date().valueOf()
                    data.new = true
                    let productions = realm.create('Production', data)
                }
            })
            alert('Salvo com sucesso')
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Card title="Informações">
                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                            DESCRIÇÃO
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
