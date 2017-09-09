import realm from '../../models/schemas'

export default saveSeedBrands =  (items) => {
    let promise = new Promise( (resolve, reject) => {
        console.log('Sincronizando Marcas de Sements')
        let all = realm.objects('SeedBrand')
        realm.delete(all)
        items.map(item => {
            let crop = realm.create('SeedBrand', {
                id: item.id,
                name: item.name,
                description: item.description || " "
            })
        })
        resolve()
    })
    return promise
}
