import Realm from 'realm'

import Schedule from './schedule'
import Crop from './crop'
import Cultivar from './cultivar'
import Place from './place'
import Production from './production'
import SeedBrand from './seedBrand'
import Question from './question'
import Answer from './answer'
import AnswerProduction from './answerProduction'


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
        AnswerProduction
	]
})

export default schemas