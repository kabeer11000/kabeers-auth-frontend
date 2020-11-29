import {endPoints} from "../../api/endPoints";
import {getFormData} from "../Misc/Misc";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import {saveCurrentDeviceId} from '@binance/fingerprint'

const mockDeviceId = new Date().getTime()

// When the user logs in, mockDeviceId should be distributed by the backend
saveCurrentDeviceId('email or userId', mockDeviceId)
console.log(mockDeviceId)
export const Change2FA = ({account, auth}) => FingerprintJS.load().then(fp => fp.get().then(details => fetch(endPoints.API.Change2FA, {
    method: "post",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: getFormData({
        username: account.username,
        password: account.password,
        two_factor_auth: auth,
        deviceId: details.visitorId
    })
})));

