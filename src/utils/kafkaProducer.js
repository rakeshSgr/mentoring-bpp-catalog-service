'use strict'
const { Kafka } = require('kafkajs')
const kafka = new Kafka({
	clientId: process.env.KAFKA_CLIENT_ID,
	brokers: process.env.KAFKA_BROKERS.split(','),
	connectionTimeout: 60000,
	retry: {
		initialRetryTime: 1000,
		retries: 8,
	},
})
const producer = kafka.producer()

producer.on('producer.connect', () => console.log('Kafka Producer Connected'))
producer.on('producer.disconnect', () => console.log('Kafka Producer Disconnected'))
//producer.on('producer.network.request', (request) => console.log('Producer Request: ', request))

const produce = (topic) => async (key, value) => {
	try {
		console.log('PRODUCER KEY: ', key)
		console.log('PRODUCER TOPIC: ', topic)
		console.log('PRODUCER DATA: ', JSON.stringify(value, null, 4))
		const res = await producer.send({
			topic,
			messages: [
				{
					key: key,
					value: JSON.stringify(value),
				},
			],
		})
		console.log(`${topic.toUpperCase()} Enqueued`)
		return res
	} catch (err) {
		console.error(err)
	}
}

exports.kafkaProducers = {
	session: produce(process.env.KAFKA_SESSION_ELASTIC_TOPIC),
	provider: produce(process.env.KAFKA_PROVIDER_ELASTIC_TOPIC),
	fulfillment: produce(process.env.KAFKA_FULFILLMENT_ELASTIC_TOPIC),
	agent: produce(process.env.KAFKA_AGENT_ELASTIC_TOPIC),
}

exports.initialize = () =>
	producer.connect().catch((error) => console.log('Kafka Producer Initialization Error: ', error))
