import {cookies, getFormData, getQueryParam, MainElement, makeBody} from "../Misc/Misc";
import {endPoints} from "../../api/endPoints";
import React from "react";
import {Device} from "../Init";

const request = async (a = {}) => fetch(a.url, {...a}).then(res => res.ok ? res.json() : null);
export const AuthAllow = async (credentials = {username: "", password: ""}, t = true) => {
    return fetch(t ? endPoints.authAllow : endPoints.GetSessionInfo, {
        credentials: "include",
        method: "POST",
        timeout: 0,
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: getFormData({
            username: credentials.username,
            password: credentials.password,
            id: cookies.getCookie("__kn.auth.session-id") || "7da6c6e6-fe4f-4916-a858-23630da7821c" || MainElement.getAttribute("session_id")
        })
    })
        .then(r => r.json())
        .then(res => t ? (window.location.href = `${res["redirect_uri"]}?${makeBody(res["redirect_params"])}&${makeBody(res["forward_values"])}&response_type=${res["response_type"]}`) : (res));
};
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
            window.location.herf = `${res.redirect_uri}?${makeBody(res.redirect_params)}`;
        }).catch(() => new Error('Error Response'));
};
export const ChooserLoginTest = async (account, c = false) => fetch(endPoints.chooserLoginTest(c), {
    credentials: 'include',
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 0,
    body: getFormData({
        deviceId: Device.getId(),
        ...c ? {
            user_id: account.user_id,
            session_token: account.session_token
        } : {
            username: account.username,
            password: account.password,
        },
    }),
});

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
export const CreateAccount = (account) => fetch(endPoints.GetClientInfo).then(i => i.json()).then(info => fetch(endPoints.CreateAccount, {
        method: "POST",
        timeout: 0,
        headers: {'Accept': 'application/json', "Content-Type": "application/x-www-form-urlencoded"},
        body: getFormData({...info, ...account, deviceId: Device.getId()})
    })
        .then(res => res.json())
);
export const GetAuthSessionInfo = () => fetch(endPoints.GetAuthSessionInfo, {method: "post"});
export const GetSessionAccounts = async (n) => fetch(endPoints.GetActiveSessionAccounts(n), {
    credentials: 'include',
    method: "post",
    headers: {'Accept': 'application/json', "Content-Type": "application/x-www-form-urlencoded"},
    body: getFormData({
        deviceId: Device.getId()
    })
}).then(d => d.json()).then(a => n ? a[0] : a);
//
// const sleep = m => new Promise(r => setTimeout(() => r(m[1]), m[0]));
//
// console.log(FingerprintJS.load().then(fp => fp.get().then(details => sleep([200, "FUCK"]))));
