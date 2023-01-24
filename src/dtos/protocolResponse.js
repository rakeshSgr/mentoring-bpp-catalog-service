'use strict'

const rfdc = require('rfdc')()

exports.protocolResponseDTO = async (protocolObjects) => {
	const catalog = {}
	catalog.providers = []
	const addedCategories = new Set()
	protocolObjects.map((protocolObject) => {
		const fulfillment = protocolObject.fulfillment
		fulfillment.agent = protocolObject.agent
		delete fulfillment.agentId
		const session = protocolObject.session
		const categories = rfdc(session.categories)
		delete session.categories
		delete session.providerId
		const selectedProvider = catalog.providers.find((provider) => provider.id === protocolObject.provider.id)
		if (!selectedProvider) {
			catalog.providers.push({
				categories,
				...protocolObject.provider,
				items: [{ ...session }],
				fulfillments: [{ ...fulfillment }],
			})
			categories.map((category) => {
				addedCategories.add(category.id)
			})
		} else {
			categories.map((category) => {
				if (!addedCategories.has(category.id)) {
					selectedProvider.categories.push(category)
				}
			})
			selectedProvider.items.push(session)
			selectedProvider.fulfillments.push(fulfillment)
		}
	})
	return catalog
}
