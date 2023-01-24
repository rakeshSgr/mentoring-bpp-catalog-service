'use strict'
const providerQueries = require('@database/indexing/provider/queries')
const fulfillmentQueries = require('@database/indexing/fulfillment/queries')
const agentQueries = require('@database/indexing/agent/queries')

exports.getprotocolObjectsFromSessions = async (sessions) => {
	try {
		const result = await Promise.all(
			sessions.map(async (sessionDoc) => {
				const session = sessionDoc._source
				const providerDoc = await providerQueries.findById(session.providerId)
				const provider = providerDoc._source
				const fulfillmentDoc = await fulfillmentQueries.findById(session.fulfillment_ids[0])
				const fulfillment = fulfillmentDoc._source
				const agentDoc = await agentQueries.findById(fulfillment.agentId)
				const agent = agentDoc._source
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
