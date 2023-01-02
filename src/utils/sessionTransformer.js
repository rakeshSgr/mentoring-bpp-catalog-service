'use strict'

exports.sessionToESTransformer = (session) => {
	const categoryId = Math.random().toString(36).slice(2)
	const fulfillmentIds = [Math.random().toString(36).slice(2), Math.random().toString(36).slice(2)]
	return {
		category: {
			id: categoryId,
			description: session.categories[0].label,
			descriptor: {
				name: session.categories[0].label,
				code: session.categories[0].label
					.split(' ')
					.map((word) => word[0])
					.join(''),
			},
		},
		provider: {
			descriptor: {
				name: 'Test Provider',
			},
		},
		session: {
			id: Math.random().toString(36).slice(2),
			category_id: categoryId,
			descriptor: {
				name: session.title,
				code: session.title.replace(/\s+/g, '-').toUpperCase(),
				short_desc: session.description,
				long_desc: session.description,
				images: session.image,
			},
			fulfillment_id: ['1', '2'],
			price: {
				value: '0',
			},
			tags: [
				{
					recommended_for: [
						session.recommendedFor.map((targetAudience) => {
							return targetAudience.label
						}),
					],
				},
			],
		},
		fulfillments: fulfillmentIds.map((id) => {
			return {
				id,
				type: 'ONLINE',
				language: session.medium.map((lang) => {
					return lang.label
				}),
				descriptor: {
					name: 'Full-Time',
				},
				tags: [
					{
						status: 'Live',
					},
					{
						timeZone: session.timeZone,
					},
				],
				agent: {
					name: 'Mr Agent',
					image: 'Agent Image',
					gender: 'M',
					tags: {
						subjects: ['Biology', 'Mathematics'],
						grades: ['XI'],
						boards: ['NCERT'],
						rating: 5,
					},
					start: {
						time: {
							timestamp: session.startDateUtc,
						},
					},
					end: {
						time: {
							timeStamp: session.endDateUtc,
						},
					},
				},
			}
		}),
	}
}
