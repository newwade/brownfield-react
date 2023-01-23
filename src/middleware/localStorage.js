export const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    console.log(action.type);
    localStorage.setItem("root", JSON.stringify(getState()));
    return result;
  };
};

const authMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("user/")) {
    const authState = store.getState().user;
    localStorage.setItem("root", JSON.stringify(authState));
  }
  return result;
};
