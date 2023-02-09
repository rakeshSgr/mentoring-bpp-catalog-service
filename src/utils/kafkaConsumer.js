'use strict'
const { consumer } = require('@configs/kafka')

const { kafkaProducers } = require('@utils/kafkaProducer')
const { sessionToESTransformer } = require('@helpers/sessionToESTransformer')
const crypto = require('crypto')

exports.initialize = async () => {
	try {
		await consumer.connect()
		await consumer.subscribe({ topics: [process.env.KAFKA_SESSION_TOPIC] })
		await consumer.run({
			eachMessage: async ({ topic, message }) => {
				console.log('CONSUMER KEY: ', message.key)
				const value = JSON.parse(message.value)
				console.log('CONSUMER VALUE: ', value)
				console.log('CONSUMER TOPIC: ', topic)
				if (topic === process.env.KAFKA_SESSION_TOPIC) {
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
				}
			},
		})
	} catch (err) {
		console.log(err)
	}
}
