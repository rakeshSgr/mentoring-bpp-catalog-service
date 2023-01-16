'use strict'
const transform = require('json-to-json-transformer').transform
const sessionTemplate = require('@constants/objectTemplates/session')
const fulfilmentTemplate = require('@constants/objectTemplates/fulfilment')
const providerTemplate = require('@constants/objectTemplates/provider')
const agentTemplate = require('@constants/objectTemplates/agent')

const objectTransformer = (templateObject) => (inputObject) => transform(templateObject, inputObject)

exports.objectTransformers = {
	session: objectTransformer(sessionTemplate),
	agent: objectTransformer(agentTemplate),
	provider: objectTransformer(providerTemplate),
	fulfilment: objectTransformer(fulfilmentTemplate),
}
