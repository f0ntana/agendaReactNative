import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Platform, TouchableHighlight, Linking } from 'react-native'
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
		let now = moment(NOW).format('YYYY-MM-DD')
		let scheduleItems = realm.objects('Schedule')

		var grouped = _.groupBy(scheduleItems, function(item) {
			let date = moment(item.date).format('YYYY-MM-DD')
			return date
		})

		if (scheduleItems.length == 0 || !grouped[now] ) {
			grouped[now] = []
		}
		this.setState({
			items: grouped
		})
	}

	changeColor(agenda){
		let oldItems = this.state.items;
		this.setState({ items : {} })
		let items = oldItems[moment(agenda.date).format('YYYY-MM-DD')].map(item => {
			if(item.id == agenda.id){
				item.start_travel = true;
			}
			return item
		})
		oldItems[moment(agenda.date).format('YYYY-MM-DD')] = items
		this.setState({ items : oldItems })
	}

	changeFinished(agenda){
		let oldItems = this.state.items;
		this.setState({ items : {} })
		let items = oldItems[moment(agenda.date).format('YYYY-MM-DD')].map(item => {
			if(item.id == agenda.id){
				item.finished = true;
			}
			return item
		})
		oldItems[moment(agenda.date).format('YYYY-MM-DD')] = items
		this.setState({ items : oldItems })
	}

	renderAgendaDetail(item) {
		Linking.openURL('whatsapp://app')
  		.catch(err => console.error('An error occurred', err));
		// const { navigate } = this.props.navigation
		// item.changeColor = this.changeColor.bind(this)
		// item.changeFinished = this.changeFinished.bind(this)
		// navigate('Agenda_Detail', item);
	}

	renderItem(item) {
		return (
			<View style={styles.item}>
				<TouchableHighlight onPress={() => this.renderAgendaDetail(item)}>
					<View style={{ flex:1, flexDirection: 'row' }}>
						<View style={{ flex: 0.8 }}>
							<Text style={styles.itemText}>
								{item.name}
							</Text>
							<Text style={styles.itemTextDescription}>
								{item.description}
							</Text>
						</View>
						{item.start_travel && !item.finished &&
							<View style={{ flex: 0.2 }}>
								<Icon
									name='car'
									type='font-awesome'
									color='green'
								/>
							</View>
						}
						{item.start_travel && item.finished &&
							<View style={{ flex: 0.2 }}>
								<Icon
									name='check-circle-o'
									type='font-awesome'
									color='black'
								/>
							</View>
						}
					</View>
				</TouchableHighlight>
			</View>
		);
	}

	renderEmptyDate() {
		return (
			<View style={styles.emptyDate}>
				<Card>
					<Text>Você não possui visitas</Text>
				</Card>
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
		flex:1
	}
});

export default AgendaHome
