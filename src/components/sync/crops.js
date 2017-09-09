import realm from '../../models/schemas'

export default saveCrops =  (items) => {
    let promise = new Promise( (resolve, reject) => {
        console.log('Sincronizando Safras')
        let all = realm.objects('Crop')
        realm.delete(all)
        items.map(item => {
            let crop = realm.create('Crop', {
                id: item.id,
                name: item.name
            })
        })
        resolve()
    })
    return promise
}
