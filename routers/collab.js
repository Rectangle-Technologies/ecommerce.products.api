const { validateCollabQuery, createCollabQuery } = require("../controllers/collaborate.query.new");
const { pendingCollabQueries } = require("../controllers/collaborate.query.pending");
const { setStatusCompleted } = require("../controllers/collaborate.query.setCompleted");

const router = require("express").Router();

// URL /contact/query/new
// DESC create new contact query from user
router.post("/query/new", validateCollabQuery, createCollabQuery);

// URL /contact/query/pending
// DESC get pending queries from database
router.get("/query/pending", pendingCollabQueries);

// URL /contact/query/completed/:uid
// DESC updated the query to completed
router.post("/query/completed/:uid", setStatusCompleted)

module.exports = router;