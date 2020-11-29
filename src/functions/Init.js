import {cookies} from "./Misc/Misc";
import {v4} from "uuid";

export const Device = {
    getId: () => {
        if (!cookies.getCookie("__kn.auth.device-id__")) cookies.setCookie("__kn.auth.device-id__", v4(), 999);
        return cookies.getCookie("__kn.auth.device-id__");
    },
};
(async () => {
    if (!cookies.getCookie("__kn.auth.device-id__")) cookies.setCookie("__kn.auth.device-id__", v4(), 999)
})();
