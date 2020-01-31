export const signInReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return { ...state, ...action.payload };
    case 'SIGN_IN_ERROR':
      return { ...state, ...action.payload };
    case 'LOG_OUT':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
