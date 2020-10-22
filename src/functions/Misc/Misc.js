import {endPoints} from "../../api/endPoints";

export const getQueryParam = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
export const parseQuery = (queryString) => {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
};
export const MainElement = document.getElementById('DataContainer');
export const getFormData = n => {
    let e = [];
    for (let o in n) n.hasOwnProperty(o) && e.push(encodeURIComponent(o) + "=" + encodeURIComponent(n[o]));
    return e.join("&")
};

export const UpdateQueryStringParam = (uri, key, value) => {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        return uri + separator + key + "=" + value;
    }
};

export const makeBody = d => Object.keys(d).reduce(function (a, k) {
    a.push(k + '=' + encodeURIComponent(d[k]));
    return a
}, []).join('&');

//"homepage": "/auth/authorize",
function serialize(obj) {
    let str = '?' + Object.keys(obj).reduce(function (a, k) {
        a.push(k + '=' + encodeURIComponent(obj[k]));
        return a;
    }, []).join('&');
    return str;
}

export const cookies = {
    getCookie(e) {
        for (let t = e + "=", o = decodeURIComponent(document.cookie).split(";"), n = 0; n < o.length; n++) {
            for (var r = o[n]; " " === r.charAt(0);) r = r.substring(1);
            if (0 === r.indexOf(t)) return r.substring(t.length, r.length);
        }
        return "";
    }, setCookie(e, t, o) {
        const n = new Date;
        n.setTime(n.getTime() + 24 * o * 60 * 60 * 1e3);
        const r = "expires=" + n.toUTCString();
        document.cookie = e + "=" + t + ";" + r + ";path=/";
    }
};
export const generateRandomHash = (l = 20) => btoa(+new Date).substr(-l, l);
export const getServerSideState = async () => (await fetch(endPoints.ServerSavedState("get"), {method: "POST"})).json();
export const setServerSideState = async (state) => (await fetch(endPoints.ServerSavedState("save"), {
    method: "POST", body: getFormData({
        state: JSON.stringify(state),
    })
})).json();
