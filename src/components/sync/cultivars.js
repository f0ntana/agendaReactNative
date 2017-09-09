import realm from '../../models/schemas'

export default saveCultivars = (items) => {
    let promise = new Promise( (resolve, reject) => {
        console.log('Sincronizando Cultivars')
        let all = realm.objects('Cultivar')
        realm.delete(all)
        items.map(item => {
            let cultivar = realm.create('Cultivar', {
                id: item.id,
                name: item.name,
                cycle: item.cycle ? item.cycle : '0',
                transgenic: item.transgenic ? true : false
            })
        })
        resolve()
    })
    return promise
}
