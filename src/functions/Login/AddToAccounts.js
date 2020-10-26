import {StorageIndex} from "../StorageIndex";

export const AddToAccounts = async (res) => {
    if (!res) return new Error('No Account');
    if (null === localStorage.getItem(StorageIndex.accounts)) return localStorage.setItem(StorageIndex.accounts, JSON.stringify([{
        ...res,
        password: undefined
    }]));
    else {
        const accounts = JSON.parse(localStorage.getItem(StorageIndex.accounts));
        if (!accounts.find(user => user.user_id === res.user_id)) return (accounts.push({
            ...res,
            password: undefined
        }), localStorage.setItem(StorageIndex.accounts, JSON.stringify(accounts)))
        else return (accounts[accounts.findIndex(user => user.user_id === res.user_id)] = {
            ...res,
            password: undefined
        }, localStorage.setItem(StorageIndex.accounts, JSON.stringify(accounts)));
    }
};
export const getSavedAccounts = async () => localStorage.getItem(StorageIndex.accounts) === null ? new Error("No Accounts") : JSON.parse(localStorage.getItem(StorageIndex.accounts));
