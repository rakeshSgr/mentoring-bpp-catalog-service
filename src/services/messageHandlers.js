'use strict'
console.log('MESSAGE HANDLERS FILE')
const crypto = require('crypto')
const { sessionToESTransformer } = require('@helpers/sessionToESTransformer')
const { kafkaProducers } = require('@helpers/kafkaProducers')

const sessionCreation = (value) => {
	try {
		value.fulfillmentId = crypto.randomUUID()
		const { agent, fulfillment, session, provider } = sessionToESTransformer(value)
		Promise.all([
			kafkaProducers.session(value._id, session),
			kafkaProducers.fulfillment(value.fulfillmentId, fulfillment),
			kafkaProducers.agent(value.mentor._id, agent),
			kafkaProducers.provider(value.organization._id, provider),
		])
			.then(() => {
				console.log('Session Objects Passed To Producer Successfully')
			})
			.catch(() => {
				console.error('Something went wrong while passing session objects')
			})
	} catch (err) {
		console.log(err)
	}
}

const messageHandlers = { sessionCreation }

module.exports = messageHandlers
