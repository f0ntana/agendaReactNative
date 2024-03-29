import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import PlaceHome from '../views/place_home';
import PlaceDetails from '../views/place_detail';
import AgendaProductionView from '../views/agenda_production';

const PlaceView = ({ navigation }) => (
  <PlaceHome navigation={navigation} />
);

const PlaceDetailsView = ({ navigation }) => (
  <PlaceDetails navigation={navigation} />
);

const Place = StackNavigator({
    Place: {
        screen: PlaceView,
        path: '/',
        navigationOptions: ({ navigation }) => ({
            title: 'FAZENDAS',
            headerLeft: (
                <Icon
                    name="menu"
                    size={30}
                    type="entypo"
                    style={{ paddingLeft: 10 }}
                    onPress={() => navigation.navigate('DrawerOpen')}
                    color="#fff"
                />
            ),
        }),
    },
    Place_Detail: {
        screen: PlaceDetailsView,
        path: '/place_detail',
        navigationOptions: {
            title: 'FAZENDA DETALHE',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#00a65a',
            },
        },
    },
    Place_Production: {
        screen: AgendaProductionView,
        path: '/place_production',
        navigationOptions: {
            title: 'FAZENDA INFORMAÇÕES',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#00a65a',
            },
        },
    },
})

PlaceView.navigationOptions = {
  drawerLabel: 'Fazenda',
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#00a65a',
  },
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="leaf"
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

export default Place
