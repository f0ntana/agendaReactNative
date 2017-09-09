import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import AgendaHome from '../views/agenda_home';
import AgendaDetails from '../views/agenda_detail';
import AgendaProductionView from '../views/agenda_production';
import AgendaQuestionsView from '../views/agenda_questions';

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
            title: 'AGENDA',
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
            title: 'AGENDA DETALHE',
        },
    },
    Agenda_Production: {
        screen: AgendaProductionView,
        path: '/agenda_production',
        navigationOptions: {
            title: 'DETALHE',
        },
    },
    Agenda_Questions: {
        screen: AgendaQuestionsView,
        path: '/agenda_questions',
        navigationOptions: {
            title: 'QUESTIONÁRIO',
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

export default Agenda
