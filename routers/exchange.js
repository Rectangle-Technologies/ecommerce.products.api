const { validateExchangeQuery, createExchangeQuery } = require("../controllers/exchange.query.new");
const { pendingExchangeQueries } = require("../controllers/exchange.query.pending");
const { setStatusCompleted } = require("../controllers/exchange.query.setCompleted");

const router = require("express").Router();

// URL /contact/query/new
// DESC create new contact query from user
router.post("/query/new", validateExchangeQuery, createExchangeQuery);

// URL /contact/query/pending
// DESC get pending queries from database
router.get("/query/pending", pendingExchangeQueries);

// URL /contact/query/completed/:uid
// DESC updated the query to completed
router.post("/query/completed/:uid", setStatusCompleted)

module.exports = router;