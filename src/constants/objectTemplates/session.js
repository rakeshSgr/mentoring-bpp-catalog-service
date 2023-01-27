'use strict'

const categoryIdExtractor = (categories) => categories.map((category) => category.value.replace(' ', '-'))

exports.sessionHandlers = {
	categoryIdExtractor,
}

exports.sessionTemplate = {
	id: '{{_id}}',
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
	category_ids: '=> categoryIdExtractor(categories)', //Look for category_ids plural
	providerId: '{{organization._id}}',
	agentId: '{{mentor._id}}',
	descriptor: {
		name: '{{title}}',
		code: '{{title}}', //This needs modification
		short_desc: '{{description}}',
		long_desc: '{{description}}',
		images: '{{image}}',
	},
	fulfillment_ids: ['{{fulfillmentId}}'],
	price: {
		value: '0',
	},
	quantity: {
		allocated: {
			count: 10,
		},
		available: {
			count: 5,
		},
	},
	tags: [
		{
			display: true,
			code: 'recommended_for',
			name: 'recommended_for',
			list: ['{{recommendedFor}}', { code: '{{value}}', name: '{{label}}' }],
		},
	],
}
