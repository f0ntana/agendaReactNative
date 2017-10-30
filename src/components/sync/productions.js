import moment from 'moment'
import realm from '../../models/schemas'

export default saveProductions =  (items) => {
    let promise = new Promise( (resolve, reject) => {
        items.map( item => {
            let production = realm.objects('Production').filtered(`id = ${item.id}`)[0]
            if (production) {
                realm.delete(all)
            }
            production = realm.create('Production', {
                id: item.id,
                place_id: item.place_id,
                cultivar_id: item.cultivar_id,
                crop_id: item.crop_id,
                seed_brand_id: item.seed_brand_id || 0,
                volume: item.volume || 0,
                productivity: item.productivity || 0,
                planting_date: item.planting_date ? moment(item.planting_date).toDate() : moment().toDate(),
                harvest_date: item.harvest_date ? moment(item.harvest_date).toDate() : moment().toDate(),
                area: item.area || 0,
                population: item.population || 0,
                spacing: item.spacing || 0,
                fertility: item.fertility || 0,
                argil: item.argil || 0,
                mo: item.mo || 0,
                p: item.p || 0,
                k: item.k || 0,
                v: item.v || 0,
                depth_gathering: item.depth_gathering || 0,
                desiccation: item.desiccation ? true : false,
                type: item.type || 0,
                finished: item.finished ? true : false,
                new: false,
                needSync: false
            })
        })
        resolve()
    })
    return promise
}
