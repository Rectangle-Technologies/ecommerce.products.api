const { addDairiesFeedback, addClientDairiesImage } = require("../controllers/dairies.addFeedback");
const ImageUploader = require("../controllers/image.uploader");

const router = require("express").Router();

// URL /diaries/addFeedback
router.post("/addFeedback", addDairiesFeedback);

// URL /diaries/addImage/uid
router.post("/addImage/:uid", ImageUploader.single("feedbackImage"), addClientDairiesImage);

module.exports = router;