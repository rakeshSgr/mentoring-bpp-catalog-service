'use strict'
const { client } = require('@configs/elasticsearch')

const search = async (query) => {
	return await client.search({
		index: process.env.ELASTIC_SESSION_INDEX,
		query,
	})
}

exports.findById = async (id) => {
	return await client.get({ index: process.env.ELASTIC_SESSION_INDEX, id })
}

exports.findByName = async (sessionName) => {
	try {
		const result = await search({
			match: {
				'descriptor.name': sessionName,
			},
		})
		return result
	} catch (err) {
		console.log(err)
	}
}
