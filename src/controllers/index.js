'use strict'
const searchService = require('@services/search')

exports.search = async (req, res) => {
	try {
		console.debug(JSON.stringify(req.body, null, '\t'))
		const catalog = await searchService.search(req.body)
		await res.status(200).send({ catalog })
	} catch (err) {
		console.log(err)
	}
}

exports.getFulfillment = async (req, res) => {
	try {
		const fulfillmentId = req.params.fulfillmentId
		console.log('fulfillment ID: ', fulfillmentId)
		const fulfillment = await searchService.getFulfillment(fulfillmentId)
		await res.status(200).send({ fulfillment })
	} catch (err) {
		console.log(err)
	}
}
