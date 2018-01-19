export default class Answer {}
Answer.schema = {
    name: 'Answer',
    properties: {
        id: 'int',
        question_id : 'int',
        description: 'string'
    }
}
