'use strict'
const providerQueries = require('@database/indexing/provider/queries')
const { getFulfillmentAndAgentObjects } = require('@helpers/fulfillmentAndAgentObjects')

exports.getprotocolObjectsFromSessions = async (sessions) => {
	try {
		const result = await Promise.all(
			sessions.map(async (sessionDoc) => {
				const session = sessionDoc._source
				const providerDoc = await providerQueries.findById(session.providerId)
				const provider = providerDoc._source
				const { fulfillment, agent } = await getFulfillmentAndAgentObjects(session.fulfillment_ids[0])
				return {
					session,
					provider,
					fulfillment,
					agent,
				}
			})
		)
		return result
	} catch (err) {
		console.log(err)
		throw err
	}
}
