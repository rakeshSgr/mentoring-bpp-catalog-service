'use strict'
const sessionQueries = require('@database/indexing/session/queries')
const { getprotocolObjectsFromSessions } = require('@helpers/sessionsToProtocolObjects')
const { getFulfillmentAndAgentObjects } = require('@helpers/fulfillmentAndAgentObjects')
const { protocolResponseDTO } = require('@dtos/protocolResponse')
const { fulfillmentObjectDTO } = require('@dtos/fulfillmentObject')

exports.search = async (requestBody) => {
	const sessionName = requestBody.intent.item.descriptor.name
	const sessionDocs = await sessionQueries.findByName(sessionName)
	if (!sessionDocs.hits.total.value) return null
	const sessions = sessionDocs.hits.hits
	const protocolObjects = await getprotocolObjectsFromSessions(sessions)
	return await protocolResponseDTO(protocolObjects)
}

exports.getFulfillment = async (fulfillmentId) => {
	const { fulfillment, agent } = await getFulfillmentAndAgentObjects(fulfillmentId)
	console.log('fulfillment: ', fulfillment)
	console.log('agent: ', agent)
	return await fulfillmentObjectDTO(fulfillment, agent)
}
