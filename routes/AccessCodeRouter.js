const router = require("express").Router();
const AccessCodeController = require("../controllers/AccessCodeController");

/** Routing for access code features **/
router.post("/access-code/create", AccessCodeController.createNewAccessCode);
router.post("/access-code/validate", AccessCodeController.validateAccessCode);

module.exports = router;