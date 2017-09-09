import realm from '../../models/schemas'

export default saveQuestions = (items) => {
    let promise = new Promise( (resolve, reject) => {
        let all = realm.objects('Question')
        realm.delete(all)
        items.map(item => {
            let cultivar = realm.create('Question', {
                id: item.id,
                description: item.description
            })
        })
        resolve()
    })
    return promise
}
