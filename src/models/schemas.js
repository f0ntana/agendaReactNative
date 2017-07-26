import Realm from 'realm'

const Place = {
	name: 'Place',
  	properties: {
  		name: 'string'
  	}
}

const Client = {
	name: 'Client',
  	properties: {
  		name: 'string'
  	}
}

export const realm = new Realm({
	schema: [
		Place,
		Client
	]
})

