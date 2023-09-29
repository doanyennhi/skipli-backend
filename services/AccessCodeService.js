const {db} = require("../config/firebase.config");
const client = require("../config/twilio.config")
const { collection, doc, getDoc, setDoc } = require("firebase/firestore")

/** Services to handle access code-related tasks **/
const AccessCodeService = {
    createNewAccessCode: async (phoneNumber) => {
        // get phone number collection
        const phoneRef = collection(db, "phone_num");

        // create 6-digit access code
        let accessCode = ""
        for (let i = 0; i < 6; i++) {
            accessCode += Math.floor(Math.random() * 10);
        }
        // save access code with phone number to database
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
    },
    // check if entered code matches access code
    validateAccessCode: async (accessCode, phoneNumber) => {
        // get phone number document
        const phoneRef = collection(db, "phone_num");
        const phoneSnap = await getDoc(doc(phoneRef, phoneNumber));

        if (phoneSnap.exists()) {
            let trueCode = phoneSnap.data().access_code
            // reset access code in database to empty if code matches
            if (accessCode === trueCode) {
                await setDoc(doc(phoneRef, phoneNumber), {
                    access_code: ""
                })
            }
            return {success: accessCode === trueCode};
        } else {
            return {success: false};
        }
    }
};

module.exports = AccessCodeService