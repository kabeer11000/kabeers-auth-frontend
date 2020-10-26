import {getFormData, getQueryParam} from "../Misc/Misc";
import {endPoints} from "../../api/endPoints";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import React from "react";

export const Login = async (userdata, embedded = false) => {
    const mainElement = document.getElementById('DataContainer');
    const AppData = {
        authCode: mainElement.getAttribute('authCode'),
        clientPublic: mainElement.getAttribute('clientPublic'),
    };
    if (!mainElement) return new Error('Main Element Not Defined');
    const ajax = async (a = {}) => fetch(a.url, {...a}).then(res => res.ok ? res.json() : null);
    const getToken = async () => {
        let t = void 0;
        return await ajax({
            url: endPoints.authToken,
            method: "POST",
            timeout: 0,
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: getFormData({
                client_secret: getQueryParam('client_secret'),
                client_public: AppData.clientPublic,
                auth_code: AppData.authCode
            })
        }).then(function (e) {
            t = e
        }), t
    };
    return ajax({
        url: endPoints.authAllow,
        method: "POST",
        timeout: 0,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: getFormData({
            username: userdata.username,
            password: userdata.password,
            auth_code: AppData.authCode
        })
    })
        .then((res) => {
            if (!res) return;
            if (getQueryParam('response_type') === "code") {
                const e = new URLSearchParams(res.callback);
                if (embedded) return ({
                    callback: res.callback.split(/[?#]/)[0],
                    state: e.get("state"),
                    nonce: e.get("nonce"),
                });
                window.location.href = res.callback;
            }
            if (getQueryParam('response_type') === "token") {
                const e = new URLSearchParams(res.callback);
                return getToken().then(t => {
                    if (!t) return;
                    if (embedded) return ({
                        callback: res.callback.split(/[?#]/)[0],
                        token: JSON.stringify(t),
                        state: e.get("state"),
                        nonce: e.get("nonce"),
                    });
                    window.location.href = `${res.callback.split(/[?#]/)[0]}?token=${encodeURI(JSON.stringify(t))}&nonce=${e.get("nonce")}&state=${e.get("state")}`;
                })
            }
        }).catch(e => {
            return new Error('Error Response');
        });
};
export const ChooserLoginTest = async (account, c = false) => FingerprintJS.load().then(fp => fp.get().then(details => fetch(endPoints.chooserLoginTest(c), {
    credentials: 'include',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 0,
    body: getFormData({
        deviceId: details.visitorId,
        ...c ? {
            user_id: account.user_id,
            session_token: account.session_token
        } : {
            username: account.username,
            password: account.password,
        },
    }),
})));

export const Devices = {
    sendUpdateEmail: async account => fetch(endPoints.UserDevicesSendEmail, {
        method: "POST",
        timeout: 0,
        headers: {'Accept': 'application/json', "Content-Type": "application/x-www-form-urlencoded"},
        body: getFormData({
            username: account.username,
            password: account.password,
        })
    }),
    sendUpdateRequest: async (account, code, id) => await fetch(endPoints.UserDevicesUpdate, {
        method: "POST",
        timeout: 0,
        headers: {'Accept': 'application/json', "Content-Type": "application/x-www-form-urlencoded"},
        body: getFormData({
            username: account.username,
            password: account.password,
            code: code,
            deviceId: id
        })
    })
};
export const CreateAccount = (account) => FingerprintJS.load().then(fp => fp.get().then(details => fetch(endPoints.GetClientInfo).then(i => i.json()).then(info => fetch(endPoints.CreateAccount, {
        method: "POST",
        timeout: 0,
        headers: {'Accept': 'application/json', "Content-Type": "application/x-www-form-urlencoded"},
        body: getFormData({...info, ...account, deviceId: details.visitorId})
    })
        .then(res => res.json())
)))
//
// const sleep = m => new Promise(r => setTimeout(() => r(m[1]), m[0]));
//
// console.log(FingerprintJS.load().then(fp => fp.get().then(details => sleep([200, "FUCK"]))));
