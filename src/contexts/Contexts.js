import React from "react";
import {GetAuthSessionInfo} from "../functions/Login/Login";

export const AccountVerificationContext = React.createContext(false);
export const AccountVerificationProvider = ({children}) => {
    const [account, setAccount] = React.useState(null);
    return (
        <AccountVerificationContext.Provider value={[account, setAccount]}>
            {children}
        </AccountVerificationContext.Provider>
    );
};
export const AuthSessionDataContext = React.createContext(null);
export const AuthSessionDataProvider = ({children}) => {
    const [session, setSession] = React.useState(null);
    React.useEffect(() => {
        GetAuthSessionInfo().then(s => setSession(s)).catch(e => new Error("Failed to Establish Kabeer Auth Session"))
    }, []);
    return (
        <AuthSessionDataContext.Provider value={[session, setSession]}>
            {children}
        </AuthSessionDataContext.Provider>
    );
};
/*** Internal App ***/
export const ReloginDialogContext = React.createContext({
    account: {},
    invalidPassword: false,
    open: false,
    loading: false
});
export const ReloginDialogProvider = ({children}) => {
    const [dialog, setDialog] = React.useState({
        account: {},
        invalidPassword: false,
        open: false,
        loading: false
    });
    return (
        <ReloginDialogContext.Provider value={[dialog, setDialog]}>
            {children}
        </ReloginDialogContext.Provider>
    );
}
