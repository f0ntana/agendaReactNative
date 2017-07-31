import Realm from 'realm'

import Schedule from './schedule'
import Crop from './crop'
import Cultivar from './cultivar'
import Place from './place'

export default new Realm ({ 
	schema: [
		Schedule,
		Crop,
		Cultivar,
		Place
	] 
})
