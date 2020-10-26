export const StorageIndex = {
    accounts: "26f2aba545fda02c0f705960ff93fe70",
};
(async () => localStorage.getItem("accounts") === null ? null : localStorage.removeItem("accounts"))();
