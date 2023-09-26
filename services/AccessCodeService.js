import {db} from "../config/firebase.config";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const AccessCodeService = {
    createNewAccessCode: async (phoneNumber) => {
        const phoneRef = collection(db, "phone_num");
        const phoneSnap = await getDoc(doc(phoneRef, phoneNumber));
            if (phoneSnap.exists()) {
                let accessCode = ""
                for (let i = 0; i < 6; i++) {
                    accessCode += Math.floor(Math.random() * 10);
                }
                await setDoc(doc(phoneRef, phoneNumber), {
                    access_code: accessCode
                })
                return accessCode
            } else {
                return null
            }
    },
    validateAccessCode: () => {

    }
};

module.exports = AccessCodeService