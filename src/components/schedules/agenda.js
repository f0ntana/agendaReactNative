import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import { API } from '../../utils/api';

import { Agenda, LocaleConfig } from 'react-native-calendars';

const NOW = Date.now();

LocaleConfig.locales['pt_BR'] = {
  monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'April', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.','Fev.','Mar','Abr','Mai','Jun','Jul.','Ago','Set.','Out.','Nov.','Dez.'],
  dayNames: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom.','Seg.','Ter.','Qua.','Qui.','Sex.','Sab.']
};

LocaleConfig.defaultLocale = 'pt_BR';

export default class AgendaScreen extends Component {
  static navigationOptions = {
    title: 'Agenda',
  }

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

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.refreshComponent();
    });
  }

  componentWillUnmount() {
    // remover o listener?!
    // this.props.navigation.removeListener('focus', this._fetchData);
  }

  _fetchData = () => {
    API.getSchedulesUser()
    .then(response => response.json())
    .then(response => {
      
      const newItems = {};
      
      Object.keys(response).forEach(key => {
        newItems[key] = response[key];
      });
      
      this.setState({
        items: newItems
      });
    })
  };

  render() {
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
    API.getSchedulesUser()
    .then(response => response.json())
    .then(response => {
      
      const newItems = {};
      
      Object.keys(response).forEach(key => {
        newItems[key] = response[key];
      });
      
      this.setState({
        items: newItems
      });

    })
  }


  renderAgendaDetail(item) {
    const { navigate } = this.props.navigation;
    navigate(
      'AgendaDetail', item, {
        onGoBack: () => console.log('Will go back from nextComponent'),
      }
    );
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

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
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