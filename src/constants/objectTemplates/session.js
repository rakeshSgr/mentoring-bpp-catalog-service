'use strict'

const tempIdGenerator = () => Math.random().toString(36).slice(2)
const categoryIdExtractor = (categories) => categories.map((category) => category.value)

exports.fieldhandlers = {
	tempIdGenerator,
	categoryIdExtractor,
}

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
		quantity: {
			allocated: {
				count: '10',
			},
			available: {
				count: '5',
			},
		},
		tags: [{ recommended_for: ['{{recommendedFor}}', '{{label}}'] }],
	},
}
