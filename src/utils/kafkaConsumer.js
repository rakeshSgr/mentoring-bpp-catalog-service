'use strict'
const { Kafka } = require('kafkajs')
const kafka = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: process.env.KAFKA_BROKERS.split(' '),
	connectionTimeout: 60000,
	retry: {
		initialRetryTime: 1000,
		retries: 8,
	},
})
const consumer = kafka.consumer({ groupId: process.env.KAFKA_CLIENT_ID })
const { kafkaProducers } = require('@utils/kafkaProducer')
const { sessionToESTransformer } = require('@helpers/sessionToESTransformer')
const crypto = require('crypto')

consumer.on('consumer.connect', () => console.log('Kafka Consumer Connected'))
consumer.on('consumer.disconnect', () => console.log('Kafka Consumer Disconnected'))
//consumer.on('consumer.network.request', (request) => console.log('Kafka Consumer Request: ', request))

exports.initialize = async () => {
	try {
		await consumer.connect()
		await consumer.subscribe({ topics: [process.env.KAFKA_SESSION_TOPIC] })
		await consumer.run({
			eachMessage: async ({ topic, /*partition,*/ message }) => {
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
