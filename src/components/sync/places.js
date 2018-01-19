import realm from '../../models/schemas'

export default savePlaces = (items, smart) => {
    let promise = new Promise( (resolve, reject) => {

        if(!smart) {
            let places = realm.objects('Place')
            realm.delete(places)
        }

        items.map(item => {
            let place = realm.objects('Place').filtered(`id = ${item.id}`)[0]
            if (place) {
                realm.delete(place)
            }
            place = realm.create('Place', {
                id: item.id,
                client_id: item.client.id,
                client_name: item.client.name || " ",
                client_email: item.client.email || " ",
                client_phone: item.client.registration ? (item.client.registration.phone || " ") : " ",
                client_contact: item.client.registration ? (item.client.registration.contact || " ") : " ",
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
