'use strict'
const { client } = require('@config/elasticsearch')

const search = async (query) => {
	return await client.search({
		index: process.env.ELASTIC_SESSION_INDEX,
		query,
	})
}

exports.getDocById = async (index, id) => {
	return await client.get({ index, id })
}

exports.searchBySessionName = async (sessionName) => {
	try {
		const result = await search({
			match: {
				'session.descriptor.name': sessionName,
			},
		})
		//console.log(JSON.stringify(result, null, 4))
		return result
	} catch (err) {
		console.log(err)
	}
}
