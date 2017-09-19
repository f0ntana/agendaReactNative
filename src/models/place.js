export default class Place {}
Place.schema = {
  	name: 'Place',
	properties: {
		id: 'int',
		client_id: 'int',
		client_name: 'string',
        name: 'string',
        address: 'string',
        itinerary: 'string',
        city: 'string',
        state: 'string',
        document: 'string',
        inscription: 'string',
        area: 'double',
        own_area: 'double',
        leased_area: 'double'
	}
}

