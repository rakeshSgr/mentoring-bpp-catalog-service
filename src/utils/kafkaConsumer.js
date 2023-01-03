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
const { sessionToESTransformer } = require('@utils/sessionTransformer')

consumer.on('consumer.connect', () => console.log('Kafka Consumer Connected'))
consumer.on('consumer.disconnect', () => console.log('Kafka Consumer Disconnected'))
//consumer.on('consumer.network.request', (request) => console.log('Kafka Consumer Request: ', request))

exports.initialize = async () => {
	try {
		await consumer.connect()
		await consumer.subscribe({ topics: [process.env.KAFKA_SESSION_TOPIC] })
		await consumer.run({
			eachMessage: async ({ topic, /*partition,*/ message }) => {
				const value = JSON.parse(message.value)
				console.log('CONSUMER MESSAGE: ', value)
				console.log('CONSUMER TOPIC: ', topic)
				if (topic === process.env.KAFKA_SESSION_TOPIC) {
					const elasticSessionObject = await sessionToESTransformer(value)
					await kafkaProducers.session(elasticSessionObject)
				}
			},
		})
	} catch (err) {
		console.log(err)
	}
}
