import React, { Component } from 'react'
import { AsyncStorage, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import realm from "../../models/schemas";

class Logout extends Component {

    constructor(props) {
        super(props)
        let token = AsyncStorage.getItem('_token').then(value => {
            if (value) {
                realm.write(() => {
                    realm.deleteAll();
                })
                AsyncStorage.removeItem("_token");
                const { navigate } = this.props.navigation;
                navigate("Login");
            }
        })
    }

    render() {
        return (
            <View></View>
        )
    }
}

Logout.navigationOptions = {
    drawerLabel: 'Sair',
    drawerIcon: ({ tintColor }) => (
        <Icon
            name="close-circle-outline"
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

export default Logout
