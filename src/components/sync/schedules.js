import realm from '../../models/schemas'
import moment from 'moment'

export default saveSchedules = (items) => {
    let promise = new Promise( (resolve, reject) => {
        console.log('Sincronizando Agenda')
        let all = realm.objects('Schedule')
        realm.delete(all)
        items.map(item => {
            let schedule = realm.create('Schedule', {
                id: item.id,
                place_id: item.place_id,
                name: item.name,
                date: moment(item.date).toDate(),
                startTravelDate: item.startTravelDate ? moment(item.startTravelDate).toDate() : null,
                endTravelDate: item.endTravelDate ? moment(item.endTravelDate).toDate() : null,
                description: item.description,
                resume: item.resume || '',
                owner_present: item.owner_present ? true : false,
                finished: item.finished ? true : false,
                start_travel: item.start_travel ? true : false,
                startLat: item.startLat ? String(item.startLat) : '',
                startLong: item.startLong ? String(item.startLong) : '',
                endLat: item.endLat ? String(item.endLat) : '',
                endLong: item.endLong ? String(item.endLong) : '',
                new: false
            })
        })
        resolve()
    })
    return promise
}
