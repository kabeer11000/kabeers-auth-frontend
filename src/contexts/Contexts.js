import React from "react";

export const AccountVerificationContext = React.createContext(false);
export const AccountVerificationProvider = ({children}) => {
    const [account, setAccount] = React.useState(null);
    return (
        <AccountVerificationContext.Provider value={[account, setAccount]}>
            {children}
        </AccountVerificationContext.Provider>
    );
};
