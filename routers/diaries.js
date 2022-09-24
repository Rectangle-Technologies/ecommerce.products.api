const { addDairiesFeedback, addClientDairiesImage } = require("../controllers/dairies.addFeedback");
const { getLatest } = require("../controllers/dairies.getLatest");
const { deleteFeedback } = require("../controllers/diaries.deleteFeedback");
const { ImageUploader } = require("../controllers/image.uploader");
const authenticate = require("../middleware/auth");

const router = require("express").Router();

// URL /diaries/addFeedback
router.post("/addFeedback", authenticate, addDairiesFeedback);

// URL /diaries/addImage/uid
router.post("/addImage/:uid", authenticate, ImageUploader.single("feedbackImage"), addClientDairiesImage);

// URL /diaries/latest
router.get("/latest", getLatest);

// URL /diaries/:uid
router.delete("/:uid", authenticate, deleteFeedback);

module.exports = router;