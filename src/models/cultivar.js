export default class Cultivar {}
Cultivar.schema = {
	name: 'Cultivar',
	properties: {
		id: 'int',
		name: 'string',
		cycle: 'string',
		transgenic: 'bool',
	}
}