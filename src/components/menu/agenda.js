import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import AgendaHome from '../views/agenda_home';
import AgendaDetails from '../views/agenda_detail';
import AgendaProductionView from '../views/agenda_production';
import AgendaQuestionsView from '../views/agenda_questions';

const Agenda = StackNavigator({
    Agenda: {
        screen: AgendaHome,
        navigationOptions: ({ navigation }) => ({
            title: 'AGENDA',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#00a65a'
            },
            headerLeft: (
                <Icon
                    name="menu"
                    size={30}
                    type="entypo"
                    style={{ paddingLeft: 10 }}
                    onPress={() => navigation.navigate('DrawerOpen')}
                    color="#fff"
                />
            )
        })
    },
    Agenda_Detail: {
        screen: AgendaDetails,
        path: '/agenda_detail',
        navigationOptions: {
            title: 'AGENDA DETALHE',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#00a65a'
            }
        }
    },
    Agenda_Production: {
        screen: AgendaProductionView,
        path: '/agenda_production',
        navigationOptions: {
            title: 'DETALHE',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#00a65a'
            }
        }
    },
    Agenda_Questions: {
        screen: AgendaQuestionsView,
        path: '/agenda_questions',
        navigationOptions: {
            title: 'QUESTIONÁRIO',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#00a65a'
            }
        }
    }
});

AgendaHome.navigationOptions = {
    drawerLabel: 'Agenda',
    drawerIcon: ({ tintColor }) => (
        <Icon
            name="calendar"
            size={30}
            style={{
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            type="material-community"
            color={tintColor}
        />
    )
};

export default Agenda;
