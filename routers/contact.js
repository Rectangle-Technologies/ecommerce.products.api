const { validateContactQuery, createContactQuery } = require("../controllers/contact.query.new");
const { pendingContactQueries } = require("../controllers/contact.query.pending");

const router = require("express").Router();

// URL /contact/query/new
// DESC create new contact query from user
router.post("/query/new", validateContactQuery, createContactQuery);

// URL /contact/query/pending
// DESC get pending queries from database
router.get("/query/pending", pendingContactQueries);

module.exports = router;