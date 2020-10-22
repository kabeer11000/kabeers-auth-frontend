export const AddToAccounts = async (res) => {
    if (!res) return new Error('No Accounts');
    if (null === localStorage.getItem("accounts")) localStorage.setItem("accounts", JSON.stringify([res]));
    else {
        const accounts = JSON.parse(localStorage.getItem("accounts"));
        if (!accounts.find(user => user.user_id === res.user_id)) {
            accounts.push(res);
            localStorage.setItem("accounts", JSON.stringify(accounts));
        }
    }
};
export const getSavedAccounts = async () => localStorage.getItem("accounts") === null ? new Error("No Accounts") : JSON.parse(localStorage.getItem("accounts"));
