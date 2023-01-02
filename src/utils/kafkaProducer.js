'use strict'
const { Kafka } = require('kafkajs')
const kafka = new Kafka({ clientId: process.env.KAFKA_CLIENT_ID, brokers: process.env.KAFKA_BROKERS.split(',') })
const producer = kafka.producer()

producer.on('producer.connect', () => console.log('Kafka Producer Connected'))
producer.on('producer.disconnect', () => console.log('Kafka Producer Disconnected'))
//producer.on('producer.network.request', (request) => console.log('Producer Request: ', request))

const produce = (topic) => async (data) => {
	try {
		console.log('PRODUCER TOPIC: ', topic)
		console.log('PRODUCER DATA: ', data)
		//data.topic = topic
		//await producer.connect() //Add this back if producer ever gets garbage collected. Unlikely
		await producer.send({
			topic,
			messages: [
				{
					value: JSON.stringify(data),
				},
			],
		})
		console.log(`${topic.toUpperCase()} Enqueued`)
	} catch (err) {
		console.error(err)
	}
}

exports.kafkaProducers = {
	session: produce(process.env.KAFKA_SESSION_TOPIC_ELASTIC),
}

exports.initialize = () =>
	producer.connect().catch((error) => console.log('Kafka Producer Initialization Error: ', error))
