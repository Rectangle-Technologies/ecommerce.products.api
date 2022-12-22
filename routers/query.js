const router = require('express').Router()
const authenticate = require("../middleware/auth");
const queryController = require('../controllers/query.fetch')

// URL: /query/fetch
router.get('/fetch', authenticate, queryController.fetchTotalQueries)

module.exports = router