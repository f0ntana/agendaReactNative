import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import AgendaHome from '../views/agenda_home';
import AgendaDetails from '../views/agenda_detail';

const AgendaView = ({ navigation }) => (
  <AgendaHome navigation={navigation} />
);

const AgendaDetailsView = ({ navigation }) => (
  <AgendaDetails navigation={navigation} />
);

const Agenda = StackNavigator({
  Agenda: {
    screen: AgendaView,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      title: 'Agenda',
      headerLeft: (
        <Icon
          name="menu"
          size={30}
          type="entypo"
          style={{ paddingLeft: 10 }}
          onPress={() => navigation.navigate('DrawerOpen')}
        />
      ),
    }),
  },
  Agenda_Detail: {
    screen: AgendaDetailsView,
    path: '/agenda_detail',
    navigationOptions: {
      title: 'Agenda Detalhe',
    },
  },
})

AgendaView.navigationOptions = {
  drawerLabel: 'Agenda',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="calendar"
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

export default Agenda;