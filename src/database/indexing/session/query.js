'use strict'
const { client } = require('@config/elasticsearch')

const search = async (query) => {
	return await client.search({
		index: process.env.ELASTIC_SESSION_INDEX,
		query,
	})
}

exports.getDocById = async (index, id) => {
	return await client.get({ index, id })
}

exports.searchBySessionName = async (sessionName) => {
	try {
		const result = await search({
			match: {
				'descriptor.name': sessionName,
			},
		})
		return result
	} catch (err) {
		console.log(err)
	}
}

exports.getprotocolObjectsFromSessions = async (sessions) => {
	try {
		const result = await Promise.all(
			sessions.map(async (sessionDoc) => {
				const session = sessionDoc._source
				const providerDoc = await exports.getDocById(process.env.ELASTIC_PROVIDER_INDEX, session.providerId)
				const provider = providerDoc._source
				const fulfillmentDoc = await exports.getDocById(
					process.env.ELASTIC_FULFILLMENT_INDEX,
					session.fulfillment_ids[0]
				)
				const fulfillment = fulfillmentDoc._source
				const agentDoc = await exports.getDocById(process.env.ELASTIC_AGENT_INDEX, fulfillment.agentId)
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
	}
}
