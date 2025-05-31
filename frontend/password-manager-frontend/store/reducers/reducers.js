export function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, username: action.payload.username, token: action.payload.token };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, username: null, token: null};
    default:
      return state;
  }
}

export function registerReducer(state,action){
  switch (action.type) {
    case 'REGISTER_REQUEST':
      return { ...state, loading: true, error: null };
    case 'REGISTER_SUCCESS':
      return { ...state, loading: false, success: true };
    case 'REGISTER_FAILURE':
      return { ...state, loading: false, error: true, success: false };
    default:
      return state;
  }
}
