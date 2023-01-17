'use strict'
const { objectTransformers } = require('@utils/objectTransformer')

exports.sessionToESTransformer = (sessionObject) => {
	const agent = objectTransformers.agent(sessionObject)
	const fulfillment = objectTransformers.fulfillment(sessionObject)
	const session = objectTransformers.session(sessionObject)
	const provider = objectTransformers.provider(sessionObject)
	return { agent, fulfillment, session, provider }
}
