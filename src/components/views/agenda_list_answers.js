import React, { Component } from 'react'
import { View, Button } from 'react-native'
import { CheckBox } from 'react-native-elements'
import _ from 'lodash'
import realm from '../../models/schemas'

export default class ListAnswers extends Component {
    constructor(props) {
        super(props)

        let answersPlace = realm.objects('AnswerPlace').filtered(`place_id = ${this.props.place}`).filtered(`crop_id = ${this.props.crop}`)

        let arrAnswersPlace = answersPlace.reduce((acc,item) => {
            return acc.concat(item.answer_id)
        }, [])

        let data = this.props.answers
        data = _.values(data)

        let organized = {}
        let answersCheck = data.filter( item => {
            return item.question_id == this.props.question
        }).map((a, b) => {
            organized[a.id] = arrAnswersPlace.includes(a.id) ? true : false
            return a
        })

        this.state = {
            questionId: this.props.question,
            answers: this.props.answers,
            answersCheck : answersCheck,
            organized: organized
        }
    }

    componentDidMount() {
        this.props.onCheck(this.state.organized)
    }

    clickChecked (id) {
        this.setState(previousState => {
            let alter = this.state.organized
            alter[id] = !previousState.organized[id]
            this.props.onCheck(alter)
            return { organized: alter }
        })
    }

    render() {
        return (
            <View>
                { this.state.answersCheck
                    .map( (a, b) => {
                        return (
                            <CheckBox
                                key={`checked${b}`}
                                center
                                title={a.description}
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checked={ this.state.organized[a.id] }
                                onPress={ () => this.clickChecked(a.id) }
                            />
                        )
                    })
                }
            </View>
        )
    }
}
