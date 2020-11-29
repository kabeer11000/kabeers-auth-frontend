export const StorageIndex = {
    accounts: "26f2aba545fda02c0f705960ff93fe70",
    cookie: {
        Accounts: "__kn.auth.user.accounts.sessions",
        KabeersAuthLoggedIn: "__kn.auth.user.sessions.logged_in"
    }
};
(async () => localStorage.getItem("accounts") === null ? null : localStorage.removeItem("accounts"))();
