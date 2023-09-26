const AccessCodeService = require("../services/AccessCodeService");

const AccessCodeController = {
    createNewAccessCode: async (phoneNum, req, res) => {
        const accessCode = AccessCodeService.createNewAccessCode(phoneNum)
        if (!accessCode) {
            return res.status(404).json("The phone number doesn't exist.")
        } else {
            return res.status(200).json(accessCode)
        }
    },
    validateAccessCode: () => {

    }
};

module.exports = AccessCodeController