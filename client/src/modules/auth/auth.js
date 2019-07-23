import authApi from '@app/api/google/auth';

/*
 * define action name
 */

export const INIT_AUTH = 'auth/INIT_AUTH';
export const INIT_AUTH_FINISH = 'auth/INIT_AUTH_FINISH';
export const SIGN_IN = 'auth/SIGN_IN';
export const SIGN_IN_SUCCESS = 'auth/SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'auth/SIGN_IN_FAILURE';
export const SIGN_OUT = 'auth/SIGN_OUT';
export const SIGN_OUT_SUCCESS = 'auth/SIGN_OUT_SUCCESS';

/*
 * state init (scheduledPrice in redux)
 */

export const initialState = {
  initialized: false,
  authenticated: false,
  user: undefined,
  error: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_AUTH': {
      const user = action.payload;
      return {
        ...state,
        initialized: true,
        authenticated: !!user,
        user
      };
    }
    case 'RELOAD_AUTH':
      return {
        ...state,
        user: action.payload
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        error: undefined
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        authenticated: false,
        user: undefined,
        error: action.payload
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        authenticated: false,
        user: undefined,
        error: undefined
      };
    default:
      return state;
  }
};

/*
 * export async packaged dispatch
 */
// Instant invoke
export const reloadAuth = () => async dispatch => {
  const user = await authApi.reloadAuthentication();
  dispatch({ type: 'RELOAD_AUTH', payload: user });
};

export const initAuth = () => async dispatch => {
  const user = await authApi.initAuthentication();
  dispatch({ type: 'INIT_AUTH', payload: user });
  const tenMins = 10 * 60 * 1000;
  let expiresIn = user.expiryDate - Date.now() - tenMins;
  if (expiresIn < 0) expiresIn = 0;
  setTimeout(() => reloadAuth(dispatch), expiresIn);
};

// For event click
export const handleLogin = () => dispatch => {
  return async () => {
    try {
      const user = await authApi.signInWithGoogle();
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
  };
};

// For event click
export const handleLogout = () => dispatch => {
  return async () => {
    await authApi.signOutWithGoogle();
    dispatch({ type: 'LOGOUT_SUCCESS' });
  };
};
