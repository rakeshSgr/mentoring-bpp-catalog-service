'use strict'

const languageExtractor = (medium) => medium.map((language) => language.label)

exports.fulfillmentHandlers = {
	languageExtractor,
}

exports.fulfillmentTemplate = {
	id: '{{fulfillmentId}}',
	type: 'ONLINE',
	language: '=> languageExtractor(medium)',
	agentId: '{{mentor._id}}',
	tags: [
		{
			display: false,
			code: 'status',
			name: 'status',
			list: [{ code: 'live', name: 'Live' }],
		},
		{
			display: false,
			code: 'timeZone',
			name: 'timeZone',
			list: [{ code: '{{timeZone}}', name: '{{timeZone}}' }],
		},
	],
	time: {
		label: 'Session Timing',
		range: {
			start: '{{startDateUtc}}',
			end: '{{endDateUtc}}',
		},
	},
}
