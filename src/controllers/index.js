'use strict'
const { searchBySessionName, getprotocolObjectsFromSessions } = require('@database/indexing/session/query')
const { protocolResponse } = require('@dtos/protocolResponse')
exports.search = async (req, res) => {
	try {
		const sessionName = req.body.sessionName
		const sessionDocs = await searchBySessionName(sessionName)
		//Fix the response body
		if (!sessionDocs.hits.total.value) return res.status(404).send({ message: 'No Sessions Found' })
		const sessions = sessionDocs.hits.hits
		const protocolObjects = await getprotocolObjectsFromSessions(sessions)
		const catalog = await protocolResponse(protocolObjects)
		await res.status(200).send({ catalog })
	} catch (err) {
		console.log(err)
	}
}
