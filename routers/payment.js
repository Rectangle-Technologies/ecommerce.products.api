const router = require('express').Router()
const paymentController = require('../controllers/payment')

router.post('/createorder', paymentController.createOrder)

router.post('/verify', paymentController.verify)

module.exports = router