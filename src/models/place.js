export default class Place {}
Place.schema = {
	name: 'Place',
  	properties: {
  		id: 'int',
  		client_id: 'int',
  		client_name: 'string',
  		crop_id: 'int',
	    cultivar_id: 'int',
	    name: 'string',
	    address: 'string',
	    itinerary: 'string',
	    city: 'string',
	    state: 'string',
	    productivity: 'double',
	    planting_date: 'date',
	    harvest_date: 'date',
	    population: 'double',
	    spacing: 'double',
	    fertility: 'string',
	    argil: 'double',
	    mo: 'double',
	    p: 'double',
	    k: 'double',
	    v: 'double',
	    depth_gathering: 'double',
	    desiccation: 'bool'
  	}
}

