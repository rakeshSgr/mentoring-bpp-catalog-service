'use strict'
const router = require('express').Router()
const catalog = require('@controllers/')
/* const { authVerifier } = require('@middlewares/authVerifier')

router.use(authVerifier) */
router.post('/search', catalog.search)

module.exports = router
