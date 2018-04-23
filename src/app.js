import React from 'react';
import { View, Image, Dimensions, Text } from 'react-native';
import { DrawerNavigator, DrawerItems, StackNavigator } from 'react-navigation';

import Login from './components/views/login_view.js';
import Logout from './components/login/logout';
import Fazenda from './components/places/places';
import Agenda from './components/menu/agenda';
import Sync from './components/sync/sync';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
    <View style={{ flex: 1 }}>
        <View
            style={{
                marginTop: 40,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Image
                source={require('./images/petrovina.png')}
                style={{ width: SCREEN_WIDTH * 0.57 }}
                resizeMode="contain"
            />
        </View>
        <DrawerItems {...props} />
    </View>
);

const MainDrawerNavigator = DrawerNavigator(
    {
        Agenda: { screen: Agenda },
        Fazenda: { screen: Fazenda },
        Sync: { screen: Sync },
        Logout: { screen: Logout }
    },
    {
        initialRouteName: 'Agenda',
        contentOptions: {
            activeTintColor: '#00a65a',
            activeBackgroundColor: 'transparent',
            inactiveTintColor: 'gray',
            inactiveBackgroundColor: 'transparent',
            labelStyle: {
                fontSize: 15,
                marginLeft: 0
            }
        },
        drawerWidth: SCREEN_WIDTH * 0.8,
        contentComponent: CustomDrawerContentComponent
    }
);

const AppStackNavigator = StackNavigator(
    {
        Login: { screen: Login },
        MainDrawerNavigator: {
            screen: MainDrawerNavigator,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        headerMode: 'screen'
    }
);

export default AppStackNavigator;
