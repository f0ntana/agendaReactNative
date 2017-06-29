import React, { Component } from 'react'
import { View, Text , StyleSheet, Dimensions } from 'react-native'
import { Card, Badge } from 'react-native-elements'

import { API } from '../../utils/api';

var width = Dimensions.get('window').width - 20

export default class AgendaDetail extends Component {
    
    static navigationOptions = {
        title: 'Detalhe Agenda',
    }
    
    constructor(props) {
        super(props)
        this.state = {
            params: this.props.navigation.state.params
        }
    }


    changeFinished(scheduleId) {
        API.changeFinished(scheduleId)
        .then(response => response.json())
        .then(response => {
            this.setState({ params: response.data})
        })
    }

    changeOwnerPresent(scheduleId) {
        API.changeOwnerPresent(scheduleId)
        .then(response => response.json())
        .then(response => {
            this.setState({ params: response.data })
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <Card title={ this.state.params.name }>
                    <Text style={styles.description}>{ this.state.params.description }</Text>
                    <View style={ styles.items }>
                        <Text style={ styles.item }>Concluída:</Text>
                        <Text style={ styles.item }>Dono presente:</Text>
                    </View>
                    <View style={ styles.items }>
                        <Badge containerStyle={ this.state.params.finished ? styles.badgeTrue : styles.badge } onPress={() => this.changeFinished(this.state.params.id)}>
                            <Text style={ styles.itemBadge }>{ this.state.params.finished ? 'Sim' : 'Não' }</Text>
                        </Badge>
                        <Badge containerStyle={ this.state.params.owner_present ? styles.badgeTrue : styles.badge } onPress={() => this.changeOwnerPresent(this.state.params.id)}>
                            <Text style={ styles.itemBadge }>{ this.state.params.owner_present ? 'Sim' : 'Não' }</Text>
                        </Badge>
                    </View>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    description: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    items: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: 'gray',
    },
    badgeTrue: {
        backgroundColor: 'green',
    },
    itemBadge: {
        paddingHorizontal: 12,
        color: 'white'
    }
})