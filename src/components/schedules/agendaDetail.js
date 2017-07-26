import React, { Component } from 'react'
import { View, Text , StyleSheet, Dimensions } from 'react-native'
import { Card, Badge, Button } from 'react-native-elements'

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
                        <Button
                            buttonStyle={ this.state.params.finished ? styles.badgeTrue : styles.badge } 
                            onPress={() => this.changeFinished(this.state.params.id)}
                            title={ this.state.params.finished ? 'Sim' : 'Não' } >
                        </Button>
                        <Button
                            buttonStyle={ this.state.params.owner_present ? styles.badgeTrue : styles.badge } 
                            onPress={() => this.changeOwnerPresent(this.state.params.id)}
                            title={ this.state.params.owner_present ? 'Sim' : 'Não' } >
                        </Button>
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
        borderRadius: 10,
        backgroundColor: 'gray',
    },
    badgeTrue: {
        borderRadius: 10,
        backgroundColor: 'green',
    },
    itemBadge: {
        paddingHorizontal: 12,
        color: 'white'
    }
})