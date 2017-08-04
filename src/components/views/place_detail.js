import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Platform, Dimensions, Text} from 'react-native';
import { Card, Badge, Button } from 'react-native-elements'
import moment from 'moment'
import realm from '../../models/schemas'

export default class AgendaDetail extends Component {
	constructor(props) {
        super(props)
        this.state = {
            params: this.props.navigation.state.params,
        }
    }

  	render() {
    	const { navigation } = this.props;

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
                			<Text style={{ fontWeight: 'bold' }}>Endereço: </Text>{ this.state.params.address }
                		</Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Intinerário: </Text> { this.state.params.itinerary }
                        </Text>
                		<Text style={styles.infosText}>
                			<Text style={{ fontWeight: 'bold' }}>Cidade/UF: </Text> { this.state.params.city } - { this.state.params.state }
                		</Text>
                	</View>
                </Card>
                <Card title="DETALHES FAZENDA">
                    <View style={styles.infos}>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Safra: </Text> { realm.objects('Crop').filtered(`id = ${this.state.params.crop_id}`)[0].name }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Cultivar: </Text> { realm.objects('Cultivar').filtered(`id = ${this.state.params.cultivar_id}`)[0].name }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Produtividade: </Text> { this.state.params.productivity }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Data de Plantio: </Text> { moment(this.state.params.planting_date).format('DD/MM/YYYY') }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Data de Colheita: </Text> { moment(this.state.params.harvest_date).format('DD/MM/YYYY') }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>População: </Text> { this.state.params.population }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Espaçamento: </Text> { this.state.params.spacing }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Fertilidade: </Text> { this.state.params.fertility }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Argila: </Text> { this.state.params.argil }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>MO: </Text> { this.state.params.mo }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>P: </Text> { this.state.params.p }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>K: </Text> { this.state.params.k }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>V: </Text> { this.state.params.v }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Profundidade coleta: </Text> { this.state.params.depth_gathering }
                        </Text>
                        <Text style={styles.infosText}>
                            <Text style={{ fontWeight: 'bold' }}>Dessecada: </Text> { this.state.params.desiccation ? 'Sim' : 'Não' }
                        </Text>
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
