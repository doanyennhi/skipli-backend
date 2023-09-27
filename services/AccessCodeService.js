const {db} = require("../config/firebase.config");
const client = require("../config/twilio.config")
const { collection, doc, getDoc, setDoc } = require("firebase/firestore")

/** Services to handle access code-related tasks **/
const AccessCodeService = {
    createNewAccessCode: async (phoneNumber) => {
        // get phone number document
        const phoneRef = collection(db, "phone_num");
        const phoneSnap = await getDoc(doc(phoneRef, phoneNumber));
            if (phoneSnap.exists()) {
                // create 6-digit access code
                let accessCode = ""
                for (let i = 0; i < 6; i++) {
                    accessCode += Math.floor(Math.random() * 10);
                }
                // save access code to database
                await setDoc(doc(phoneRef, phoneNumber), {
                    access_code: accessCode
                })

                // send code to user's sms
                client.messages
                    .create({
                        body: `Your access code is: ${accessCode}`,
                        from: "+18503894927",
                        to: phoneNumber
                    })
                    .then(message => console.log(message))

                return accessCode
            } else {
                return null
            }
    },
    validateAccessCode: async (accessCode, phoneNumber) => {
        // TODO: validate code against accessCode
        const phoneRef = collection(db, "phone_num");
        const phoneSnap = await getDoc(doc(phoneRef, phoneNumber));

        if (phoneSnap.exists()) {
            console.log(phoneSnap)
            return true
        } else {
            return false
        }
    }
};

module.exports = AccessCodeService