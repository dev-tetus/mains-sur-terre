const isLogged = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_AUTH":
      return !state;
    default:
      return state;
  }
};
export default isLogged;
