export default class Schedule {}
Schedule.schema = {
	name: 'Schedule',
	properties: {
		id: 'int',
		place_id: 'int',
		name: 'string',
		date: 'date',
		startTravelDate: { type: 'date', optional: true},
		endTravelDate: { type: 'date', optional: true},
		description: 'string',
		resume: 'string',
		owner_present: 'bool',
		finished: 'bool',
		start_travel: 'bool',
		startLat: 'string',
		startLong: 'string',
		endLat: 'string',
		endLong: 'string',
		new: 'bool'
	}
}
