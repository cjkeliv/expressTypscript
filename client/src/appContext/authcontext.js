import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";
const initialState = {
  user: null,
};

if (localStorage.getItem("token")) {
  const decodeToken = jwtDecode(localStorage.getItem("token"));
  if (decodeToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  }
  initialState.user = decodeToken;
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };
  // this is the react element to be used
  return (
    <AuthProvider.Provider>
      value = {{ user: state.user, login, logout }}
      {props}
    </AuthProvider.Provider>
  );
};

export { AuthContext, AuthProvider };
