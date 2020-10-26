const hostName = `${window.location.protocol}//${window.location.host}`;
//const hostName = `${window.location.protocol}//${window.location.hostname}:3000`;

export const endPoints = {
  authAllow: `${hostName}/auth/allow`,
  authToken: `${hostName}/auth/token`,
  chooserLoginTest: (c) => `${hostName}/auth/user/challenge/chooser_login_verification${c ? "/c" : ""}`,
  getSecretFromHash: `${hostName}/auth/implict_grant_unhash_secret`,
  getUserApps: `${hostName}/users/api/generate_apps_perms`,
  removeOauthApp: `${hostName}/user/api/remove_oauth_app`,
  StartInternalOauthFlow: `${hostName}/app/start_oauthFlow`,
  CreateAccount: `${hostName}/auth/user/create-account`,
  VerifyAccount: `${hostName}/auth/user/verify`,
  UserDevicesUpdate: `${hostName}/auth/user/devices/update`,
  UserDevicesSendEmail: `${hostName}/auth/user/devices/verify/email`,
  // Refresh State Persist
  ServerSavedState: (m) => `${hostName}/auth/user/session/state/${m}`,
  GetClientInfo: `https://json.geoiplookup.io/`,
};
