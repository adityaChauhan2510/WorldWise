import { createContext, useContext, useReducer } from "react";
import axios from "axios";

const URI = "http://localhost:9000";
const AuthContext = createContext();

const initialValue = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    case "signup":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialValue
  );

  async function login(email, password) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${URI}/api/user/login`,
        { email, password },
        config
      );

      localStorage.setItem("token", data.token);

      const USER = {
        name: data.name,
        email: data.email,
        avatar: data.pic,
      };

      //console.log(data);
      console.log("Login successful");
      dispatch({ type: "login", payload: USER });
    } catch (err) {
      console.error("Authentication failed:", err.message);
    }
  }

  async function signup(name, email, password) {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${URI}/api/user/signup`,
        { name, email, password },
        config
      );
      localStorage.setItem("token", data.token);

      const USER = {
        name: data.name,
        email: data.email,
        avatar: data.pic,
      };

      //console.log(data);
      console.log("Signup successful");
      dispatch({ type: "signup", payload: USER });
    } catch (err) {
      console.error("Authentication failed:", err.message);
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("This context was used outside the AuthProvider.");

  return context;
}

export { AuthProvider, useAuth };
