export default class Schedule {}
Schedule.schema = {
	name: 'Schedule',
	properties: {
		id: 'int',
		place_id: 'int',
		name: 'string',
		date: 'date',
		description: 'string',
		owner_present: 'bool',
		finished: 'bool',
	}
}
