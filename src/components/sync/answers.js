import realm from '../../models/schemas'

export default saveAnswers = (items) => {
    let promise = new Promise( (resolve, reject) => {
        let all = realm.objects('Answer')
        realm.delete(all)
        items.map(item => {
            let cultivar = realm.create('Answer', {
                id: item.id,
                question_id: item.question_id,
                description: item.description
            })
        })
        resolve()
    })
    return promise
}
