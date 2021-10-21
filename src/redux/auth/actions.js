const authActons = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGOUT: 'LOGOUT',
  signin: () => ({ type: authActons.LOGIN_REQUEST }),
  login: () => ({ type: authActons.LOGIN_SUCCESS }),
  logout: () => {
    localStorage.clear()
    // eslint-disable-next-line
    window.location.replace('/')
      // eslint-disable-next-line
      ({ type: authActons.LOGOUT })
  },
};
export default authActons;
