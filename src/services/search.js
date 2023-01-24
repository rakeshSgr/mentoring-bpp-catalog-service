'use strict'
const sessionQueries = require('@database/indexing/session/queries')
const { getprotocolObjectsFromSessions } = require('@helpers/sessionsToProtocolObjects')
const { protocolResponseDTO } = require('@dtos/protocolResponse')

exports.search = async (requestBody) => {
	const sessionName = requestBody.intent.item.descriptor.name
	const sessionDocs = await sessionQueries.findByName(sessionName)
	if (!sessionDocs.hits.total.value) return null
	const sessions = sessionDocs.hits.hits
	const protocolObjects = await getprotocolObjectsFromSessions(sessions)
	return await protocolResponseDTO(protocolObjects)
}
