import Realm from 'realm'

import Schedule from './schedule'
import Crop from './crop'
import Cultivar from './cultivar'
import Place from './place'
import Production from './production'
import SeedBrand from './seedBrand'
import Question from './question'
import Answer from './answer'
import AnswerPlace from './answerPlace'
import LastSync from './lastSync'


const schemas = new Realm({
	schema: [
		Schedule,
		Crop,
		Cultivar,
		Place,
        Production,
        SeedBrand,
        Question,
        Answer,
        AnswerPlace,
        LastSync
	]
})

export default schemas
