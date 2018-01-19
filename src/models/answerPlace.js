export default class AnswerPlace {}
AnswerPlace.schema = {
    name: 'AnswerPlace',
    primaryKey: 'id',
    properties: {
        id: 'int',
        place_id : 'int',
        crop_id : 'int',
        answer_id : 'int'
    }
}
