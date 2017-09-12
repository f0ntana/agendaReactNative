import React, { Component } from 'react'
import { StyleSheet , View, Text } from 'react-native'
import Svg from "react-native-svg"
import { VictoryBar } from "victory-native"
import _ from 'lodash'
import realm from '../../models/schemas'

export default class Graphic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productions : this.props.data,
            dataGraphic: []
        }
    }

    componentWillMount(){
        let productions = this.state.productions

        if(productions.length > 0){
            let grouped = _.groupBy(productions, 'crop_id')
            let summary = Object.keys(grouped).reduce( (acc, key) => {
                acc[key] = _.sumBy(grouped[key], 'volume');
                return acc;
            }, {});

            let dataGraphic = [1,2,3,4,5,6];

            Object.keys(summary).forEach((production, index) => {
                dataGraphic.push({ x: ((index+1)), y: summary[production], label: (`${realm.objects('Crop').filtered('id = ' + production)[0].name} \n \n ${Math.round(summary[production])} sc`), fill: "green" })
            })

            this.setState({ dataGraphic: dataGraphic })
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={ styles.titleText, { marginTop: 20 } }>Evolução de compra</Text>
                <VictoryBar
                    style={{ data: { fill: "white", opacity: 0.5 } }}
                    data={this.state.dataGraphic}
                />
                <Text style={{textAlign: 'right', fontStyle : 'italic', fontSize: 12 }}>Volume em Sacas 40KG</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
        alignItems: 'center',
    },
    titleText: {
        fontSize: 16
    },
    chart: {
        width: 200,
        height: 200,
    }
})
