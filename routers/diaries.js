const { addDairiesFeedback, addClientDairiesImage } = require("../controllers/dairies.addFeedback");
const { getLatest } = require("../controllers/dairies.getLatest");
const { deleteFeedback } = require("../controllers/diaries.deleteFeedback");
const ImageUploader = require("../controllers/image.uploader");

const router = require("express").Router();

// URL /diaries/addFeedback
router.post("/addFeedback", addDairiesFeedback);

// URL /diaries/addImage/uid
router.post("/addImage/:uid", ImageUploader.single("feedbackImage"), addClientDairiesImage);

// URL /diaries/latest
router.get("/latest", getLatest);

// URL /diaries/:uid
router.delete("/:uid", deleteFeedback);

module.exports = router;