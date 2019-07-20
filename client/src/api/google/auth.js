import loadScript from '@shinin/load-script';
import noop from 'lodash/noop';
import promisify from '../../shared/promisify';

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

async function initAuthentication() {
  const googleAuth = await getGoogleAuth();
  if (!googleAuth.isSignedIn.get()) return;
  const googleUser = googleAuth.currentUser.get();
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
