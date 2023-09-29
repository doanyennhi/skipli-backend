const AccessCodeService = require("../services/AccessCodeService");

/** Controllers to handle access code-related tasks **/
const AccessCodeController = {
    createNewAccessCode: async (req, res) => {
        const accessCode = await AccessCodeService.createNewAccessCode(req.body["phone_num"])
        if (accessCode == null) {
            return res.status(404).json("The phone number doesn't exist.")
        } else {
            return res.status(200).json(accessCode)
        }
    },
    validateAccessCode: async (req, res) => {
        // check if code entered matches the code sent via sms
        const isValid = await AccessCodeService.validateAccessCode(req.body["access_code"], req.body["phone_num"])

        if (isValid.success) {
            return res.status(200).json(isValid)
        } else {
            return res.status(404).json(isValid)
        }
    }
};

module.exports = AccessCodeController