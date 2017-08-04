import Realm from 'realm'

import Schedule from './schedule'
import Crop from './crop'
import Cultivar from './cultivar'
import Place from './place'

const schemas = new Realm ({ 
	schema: [
		Schedule,
		Crop,
		Cultivar,
		Place
	] 
})

export default schemas
