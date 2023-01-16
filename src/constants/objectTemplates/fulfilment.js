'use strict'

exports.fulfillmentTemplate = {
	fulfillments: [
		{
			id: 1,
			type: 'ONLINE',
			language: ['{{medium}}', '{{label}}'],
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
		},
	],
}
