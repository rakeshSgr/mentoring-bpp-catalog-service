'use strict'
const { searchBySessionName, getDocById } = require('@database/indexing/session/query')

exports.search = async (req, res) => {
	try {
		const sessionName = req.body.sessionName
		const sessionDocs = await searchBySessionName(sessionName)
		const sessions = sessionDocs.hits.hits
		const result = await Promise.all(
			sessions.map(async (sessionDoc) => {
				const session = sessionDoc._source
				const providerDoc = await getDocById(process.env.ELASTIC_PROVIDER_INDEX, session.session.providerId)
				const provider = providerDoc._source
				const fulfillmentDoc = await getDocById(
					process.env.ELASTIC_FULFILLMENT_INDEX,
					session.session.fulfillment_ids[0]
				)
				const fulfillment = fulfillmentDoc._source
				const agentDoc = await getDocById(process.env.ELASTIC_AGENT_INDEX, fulfillment.fulfillment.agentId)
				const agent = agentDoc._source
				return {
					session,
					provider,
					fulfillment,
					agent,
				}
			})
		)
		res.status(200).send({ result })
	} catch (err) {
		console.log(err)
	}
}
