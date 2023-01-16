'use strict'

const tempIdGenerator = () => Math.random().toString(36).slice(2)

exports.fieldhandlers = {
	tempIdGenerator,
}

exports.providerTemplate = {
	provider: {
		id: '=> tempIdGenerator()',
		descriptor: {
			name: '{{provider.name}}',
			code: '{{provider.code}}',
			short_desc: '{{provider.description}}',
		},
		rateable: false,
	},
}
