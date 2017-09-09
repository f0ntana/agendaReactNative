import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text} from 'react-native'
import { Card, CheckBox, Button} from 'react-native-elements'
import realm from '../../models/schemas'
import _ from 'lodash'
import ListAnswers from './agenda_list_answers'

export default class AgendaQuestions extends Component {
    constructor(props) {
        super(props)
        let questions = realm.objects('Question')
        let answers = realm.objects('Answer')
        this.state = {
            questions : questions,
            answers : answers,
            checkedAnswers: {},
            checked: true,
            organized: {}
        }
    }

    setAnswer(questionId, answers) {
        let { checkedAnswers } = this.state;
        checkedAnswers[questionId] = answers
        this.setState({ checkedAnswers })
    }

    saveChanges() {
        let productionId = this.props.navigation.state.params.id
        let checkedAnswers = this.state.checkedAnswers


        let filterChecked = _.flatten(_.values(checkedAnswers).map(function (answers) {
            return Object.keys(answers).filter(function (k) {
                return answers[k]
            })
        }))

        realm.write(() => {
            let retNext = 1
            let lastItem = realm.objects('AnswerProduction').sorted('id', 'DESC')[0]
            if (lastItem) {
                retNext  = Number(lastItem.id) + 1
            }

            let all = realm.objects('AnswerProduction')
            realm.delete(all)

            filterChecked.map((answerId) => {
                realm.create('AnswerProduction', {
                    id: retNext,
                    production_id: productionId,
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
                {
                    this.state.questions.map((l, i) => (
                        <Card key={i}>
                            <Text style={styles.question}>{l.description}</Text>
                            <ListAnswers production={this.props.navigation.state.params.id} question={ l.id } answers={ this.state.answers } onCheck={(answers) => this.setAnswer(l.id, answers)}/>
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
