import realm from '../../models/schemas'
import moment from 'moment'

export default saveLastSync =  () => {
    let promise = new Promise( (resolve, reject) => {
        realm.write(() => {
            let all = realm.objects('LastSync')
            realm.delete(all)
            realm.create('LastSync', {
                id: 1,
                date: moment().subtract(3, 'hours').toDate()
            })
        })
        resolve()
    })
    return promise
}
