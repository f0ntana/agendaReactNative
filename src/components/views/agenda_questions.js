import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, Picker} from 'react-native'
import { Card, CheckBox, Button} from 'react-native-elements'
import realm from '../../models/schemas'
import _ from 'lodash'
import ListAnswers from './agenda_list_answers'

export default class AgendaQuestions extends Component {
    constructor(props) {
        super(props)
        let questions = realm.objects('Question')
        let answers = realm.objects('Answer')
        let crops = realm.objects('Crop').sorted('id', 'DESC')
        this.state = {
            crops : crops,
            questions : questions,
            answers : answers,
            checkedAnswers: {},
            checked: true,
            organized: {},
            cropId: crops[0].id
        }
    }

    setAnswer(questionId, answers) {
        let { checkedAnswers } = this.state;
        checkedAnswers[questionId] = answers
        this.setState({ checkedAnswers })
    }

    saveChanges() {
        let placeId = this.props.navigation.state.params.id
        let checkedAnswers = this.state.checkedAnswers

        let filterChecked = _.flatten(_.values(checkedAnswers).map(function (answers) {
            return Object.keys(answers).filter(function (k) {
                return answers[k]
            })
        }))

        realm.write(() => {
            let retNext = 1
            let lastItem = realm.objects('AnswerPlace').sorted('id', 'DESC')[0]
            if (lastItem) {
                retNext  = Number(lastItem.id) + 1
            }

            filterChecked.map((answerId) => {
                realm.create('AnswerPlace', {
                    id: retNext,
                    place_id: placeId,
                    crop_id: this.state.cropId,
                    answer_id: Number(answerId),
                })
                retNext++
            })
        })

        alert('Questionário Salvo com Sucesso')
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Card>
                    <Text>Selecione a safra:</Text>
                    <Picker
                        selectedValue={this.state.cropId}
                        onValueChange={(cropId) => this.setState({ cropId: cropId })}>
                        { this.state.crops.map((l, i) => <Picker.Item  key={i} label={l.name} value={l.id} />)}
                    </Picker>
                </Card>
                {
                    this.state.questions.map((l, i) => (
                        <Card key={i}>
                            <Text style={styles.question}>{l.description}</Text>
                            <ListAnswers crop={this.state.cropId} place={this.props.navigation.state.params.id} question={ l.id } answers={ this.state.answers } onCheck={(answers) => this.setAnswer(l.id, answers)}/>
                        </Card>
                    ))
                }
                <Button
                    icon={{ name: 'check', size: 32 }}
                    buttonStyle={{ backgroundColor: '#5cb85c', borderRadius: 10, marginTop: 10 }}
                    textStyle={{ textAlign: 'center' }}
                    title="Salvar perguntas"
                    onPress={() => this.saveChanges()}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10
    },
    question: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'justify',
        marginBottom: 10
    }
})
