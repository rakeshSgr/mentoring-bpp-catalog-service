'use strict'

exports.sessionTemplate = {
	categories: [
		'{{categories}}',
		{
			id: '{{value}}',
			descriptor: {
				name: '{{label}}',
				code: '{{value}}',
			},
		},
	],
	provider: {
		descriptor: {
			name: '{{provider.name}}',
			code: '{{provider.code}}',
			short_desc: '{{provider.description}}',
		},
	},
	session: {
		id: '{{_id}}',
		category_ids: '=> categoryIdExtractor(categories)', //Look for category_ids plural
		descriptor: {
			name: '{{title}}',
			code: '{{title}}', //This needs modification
			short_desc: '{{description}}',
			long_desc: '{{description}}',
			images: '{{image}}',
		},
		fulfillment_ids: ['1'],
		price: {
			value: '0',
		},
		tags: [{ recommended_for: ['{{recommendedFor}}', '{{label}}'] }],
	},
	fulfillments: [
		{
			id: 1,
			type: 'ONLINE',
			language: ['{{medium}}', '{{label}}'],
			tags: [{ status: 'Live' }, { timeZone: '{{timeZone}}' }],
			agent: {
				name: '{{mentor.name}}',
				image: '{{mentor.image}}',
				gender: '{{mentor.gender}}',
				start: { time: { timestamp: '{{startDateUtc}}' } },
				end: { time: { timestamp: '{{endDateUtc}}' } },
			},
		},
	],
}
