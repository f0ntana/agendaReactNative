import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Carregamentos from '../views/carregamentos';

const CarregamentosView = ({ navigation }) => (
    <Carregamentos navigation={navigation} />
);

const Carregamento = StackNavigator({
    CarregamentosView: {
        screen: CarregamentosView,
        path: '/',
        navigationOptions: ({ navigation }) => ({
            title: 'Carregamentos',
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
    }
});

CarregamentosView.navigationOptions = {
    drawerLabel: 'Carregamentos',
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: '#00a65a'
    },
    drawerIcon: ({ tintColor }) => (
        <Icon
            name="truck"
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

export default Carregamento;
