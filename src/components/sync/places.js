import realm from '../../models/schemas'

export default savePlaces = (items) => {
    let promise = new Promise( (resolve, reject) => {
        items.map(item => {
            let place = realm.objects('Place').filtered(`id = ${item.id}`)[0]
            if (place) {
                realm.delete(all)
            }
            place = realm.create('Place', {
                id: item.id,
                client_id: item.client.id,
                client_name: item.client.name || " ",
                name: item.name || " ",
                address: item.address || " ",
                itinerary: item.itinerary || " ",
                city: item.city.name || " ",
                state: item.city.state || " ",
                document: item.document || "",
                inscription: item.inscription || "",
                area: item.area || 0,
                own_area: item.own_area || 0,
                leased_area: item.leased_area || 0
            })
        })
        resolve()
    })
    return promise
}
