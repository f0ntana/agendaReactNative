import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Platform, TouchableHighlight } from 'react-native'
import { Text, Button, Icon, SocialIcon, Card } from 'react-native-elements';
import { Agenda, LocaleConfig } from 'react-native-calendars'
import _ from 'lodash'
import moment from 'moment'
import realm from '../../models/schemas'

const NOW = Date.now();

LocaleConfig.locales['pt_BR'] = {
	monthNames: ['Janeiro', 'Fevereiro', 'Março', 'April', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
	monthNamesShort: ['Jan.','Fev.','Mar','Abr','Mai','Jun','Jul.','Ago','Set.','Out.','Nov.','Dez.'],
	dayNames: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
	dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sab.']
};

LocaleConfig.defaultLocale = 'pt_BR';

class AgendaHome extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items: {}
		};
	}

	refreshComponent() {
		this.setState({
			items: {}
		}, () => {
			this._fetchData()
		})
	}

	_fetchData = () => {
		API.getSchedulesUser()
		.then(response => response.json())
		.then(response => {
			this.setState({
				items: response
			});
		})
	};

	render() {
		const { navigation } = this.props;
		return (
			<Agenda
				items={this.state.items}
				loadItemsForMonth={this.loadItems.bind(this)}
				selected={NOW}
				renderItem={this.renderItem.bind(this)}
				renderEmptyDate={this.renderEmptyDate.bind(this)}
				rowHasChanged={this.rowHasChanged.bind(this)}
			/>
		);
	}

	loadItems(day) {
		let scheduleItems = realm.objects('Schedule')

		var grouped = _.groupBy(scheduleItems, function(item) {
			let date = moment(item.date).format('YYYY-MM-DD')
			return date
		})

		this.setState({
			items: grouped
		})
	}

	renderAgendaDetail(item) {
		const { navigate } = this.props.navigation;
		navigate('Agenda_Detail', item);
	}

	renderItem(item) {
		return (
			<View style={styles.item}>
				<TouchableHighlight onPress={() => this.renderAgendaDetail(item)}>
					<View>
						<Text style={styles.itemText}>
							{item.name}
						</Text>
						<Text style={styles.itemTextDescription}>
							{item.description}
						</Text>
					</View>
				</TouchableHighlight>
			</View>
		);
	}

	renderEmptyDate() {
		return (
			<View style={styles.emptyDate}>
				<Text>Sem atividades</Text>
			</View>
		);
	}

	rowHasChanged(r1, r2) {
		return r1.name !== r2.name;
	}

}

const styles = StyleSheet.create({
	item: {
		backgroundColor: 'white',
		flex: 1,
		borderRadius: 5,
		padding: 10,
		marginRight: 10,
		marginTop: 10
	},
	itemText: {
		color: 'black',
		textAlign: 'justify',
		marginBottom: 10,
		fontSize: 16
	},
	itemTextDescription: {
		color: 'black',
		textAlign: 'justify',
		fontSize: 12
	},
	emptyDate: {
		height: 15,
		flex:1,
		paddingTop: 30
	}
});

export default AgendaHome
