'use strict'
const transform = require('json-to-json-transformer').transform
const { sessionTemplate, sessionHandlers } = require('@constants/objectTemplates/session')
const { fulfillmentTemplate, fulfillmentHandlers } = require('@constants/objectTemplates/fulfillment')
const { providerTemplate } = require('@constants/objectTemplates/provider')
const { agentTemplate } = require('@constants/objectTemplates/agent')

const objectTransformer = (templateObject, handlers) => (inputObject) =>
	transform(templateObject, inputObject, handlers)

exports.objectTransformers = {
	session: objectTransformer(sessionTemplate, sessionHandlers),
	agent: objectTransformer(agentTemplate),
	provider: objectTransformer(providerTemplate),
	fulfillment: objectTransformer(fulfillmentTemplate, fulfillmentHandlers),
}
