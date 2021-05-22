export const LOGIN_USER = 'USER/LOGIN_USER';
export const LOGOUT_USER = 'USER/LOGOUT_USER';

const initialState = {
  activeUser: {
    rol: '',
    name: '',
    email: ''
  },
  isUserAuthenticated: false
};

export const userLogin = (targetUser) => ({
  type: LOGIN_USER,
  targetUser
});

export const userLogout = () => ({
  type: LOGOUT_USER
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isUserAuthenticated: true,
        activeUser: { ...action.targetUser }
      };

    case LOGOUT_USER:
      return {
        ...state,
        isUserAuthenticated: false
      };

    default:
      return state;
  }
};

export default reducer;
