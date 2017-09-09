import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import Accordion from 'react-native-collapsible/Accordion';
import _ from 'lodash'
import realm from '../../models/schemas'

export default class ListProductions extends Component {

    constructor(props) {
        super(props)
        let productions = this.props.data

        let titles = _.uniqBy(productions, 'crop_id')
        let sections = []
        titles.forEach( (l, i) => {
            let filter = _.filter(productions, function(o) { return o.crop_id == l.crop_id })
            sections.push({ title: l.crop_id, content: filter })
        })

        this.state = {
            sections: sections
        }
    }

    _onPressButton(l) {
        this.props.onPress(l)
    }

    _renderHeader(section) {
        return (
            <View>
                <ListItem
                    title={ realm.objects('Crop').filtered(`id = ${section.title}`)[0].name }
                />
            </View>
        )
    }

    _renderContent(section) {
       return (
            <List style={{ backgroundColor: 'darkgray'}}>
                {
                    section.content.map((item, index) => {
                        return (
                            <TouchableOpacity key={`c${index}`} onPress={() => this._onPressButton(item)} style={{flex: 1}}>
                                <ListItem
                                    titleStyle={{ color :'white' }}
                                    title={realm.objects('Cultivar').filtered(`id = ${item.cultivar_id}`)[0].name}
                                />
                            </TouchableOpacity>
                        )
                    })
                }
            </List>
        )
    }

    render() {
        return (
            <View style={{ backgroundColor: '#fff' }}>
                <List>
                    <Accordion
                        sections={this.state.sections}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent.bind(this)}
                    />
                </List>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
        marginBottom: -1,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'gray',
        flexDirection: 'row'
    },
    content: {
        marginBottom: -1,
        marginLeft: 5,
        color: 'gray',
        padding: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'gray'
    },
    button: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#2980b9',
        borderRadius: 20
    }
})
