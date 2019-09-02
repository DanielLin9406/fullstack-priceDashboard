import loadScript from 'load-script2';
import noop from 'lodash/noop';
import { promisify } from '@app/shared/promiseHelper';

const GAPI_URL = 'https://apis.google.com/js/platform.js';
const GAPI_CLIENT_ID = app.env.GAPI_CLIENT_ID;
let googleAuthPromise;

function getGoogleAuth() {
  if (!googleAuthPromise) {
    googleAuthPromise = (async () => {
      await loadScript(GAPI_URL);
      const gapi = window.gapi;
      await promisify(gapi.load)('auth2');
      return gapi.auth2.init({ client_id: GAPI_CLIENT_ID });
    })();
  }
  return googleAuthPromise;
}

function modelGoogleUser(googleUser) {
  const authentication = googleUser.getAuthResponse();
  const profile = googleUser.getBasicProfile();
  return {
    token: authentication.id_token,
    expiryDate: authentication.expires_at,
    id: profile.getId(),
    name: profile.getName(),
    imageUrl: profile.getImageUrl()
  };
}

function storeIdentity(googleUser) {
  if (window.FederatedCredential) {
    const profile = googleUser.getBasicProfile();
    const credential = new FederatedCredential({
      id: profile.getEmail(),
      provider: 'https://accounts.google.com',
      name: profile.getName(),
      iconURL: profile.getImageUrl()
    });
    return navigator.credentials.store(credential);
  }
}

async function getIdentity() {
  const res = await navigator.credentials.get({
    password: true,
    federated: {
      providers: ['https://accounts.google.com']
    },
    mediation: 'silent'
  });
  return res;
}

async function initAuthentication() {
  const googleAuth = await getGoogleAuth();
  const identity = await getIdentity();
  let googleUser = '';
  if (identity) {
    googleUser = await googleAuth
      .signIn({ login_hint: identity.id })
      .catch(noop);
  } else {
    if (!googleAuth.isSignedIn.get()) return;
    googleUser = googleAuth.currentUser.get();
  }
  return modelGoogleUser(googleUser);
}

async function reloadAuthentication() {
  const googleAuth = await getGoogleAuth();
  if (!googleAuth.isSignedIn.get()) return;
  const googleUser = googleAuth.currentUser.get();
  await googleUser.reloadAuthResponse();
  return modelGoogleUser(googleUser);
}

async function signInWithGoogle() {
  const googleAuth = await getGoogleAuth();
  const googleUser = await googleAuth.signIn().catch(noop);
  if (!googleUser) return;
  await storeIdentity(googleUser);
  return modelGoogleUser(googleUser);
}

async function signOutWithGoogle() {
  const googleAuth = await getGoogleAuth();
  googleAuth.signOut();
}

export default {
  initAuthentication,
  reloadAuthentication,
  signInWithGoogle,
  signOutWithGoogle
};
