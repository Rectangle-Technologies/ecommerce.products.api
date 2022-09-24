const { validateContactQuery, createContactQuery } = require("../controllers/contact.query.new");
const { pendingContactQueries } = require("../controllers/contact.query.pending");
const { setStatusCompleted } = require("../controllers/contact.query.setCompleted");
const authenticate = require("../middleware/auth");

const router = require("express").Router();

// URL /contact/query/new
// DESC create new contact query from user
router.post("/query/new", authenticate, validateContactQuery, createContactQuery);

// URL /contact/query/pending
// DESC get pending queries from database
router.get("/query/pending", pendingContactQueries);

// URL /contact/query/completed/:uid
// DESC updated the query to completed
router.post("/query/completed/:uid", authenticate, setStatusCompleted)

module.exports = router;