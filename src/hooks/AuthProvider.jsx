import { Token } from "@mui/icons-material";
import axios from "axios";
import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(null);
  const [token, setToken] = useState(cookies.get("token") || "");

  const setAuthHeader = (jwt) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  };

  const login = async (data) => {
    try {
      axios.post("/api/auth/login", data).then(async (response) => {
        setToken(response.data);

        cookies.set("token", response.data);
        setAuthHeader(response.data);
        navigate("/");
        window.location.reload();
      });
    } catch (err) { }
  };

  const register = async (data) => {
    try {
      const response = await axios.post("/api/auth/register", data);
      setToken(response.data);
      return response.data;
    } catch (err) {
      // Return error message or the entire error object
      return err.response?.data || { error: 'An unknown error occurred' };
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    axios.defaults.headers.common["Authorization"] = ``;

    cookies.remove("token");

    navigate("/login");
    window.location.reload();

  };

  const isLogged = async () => {
    let test = false;
    await axios
      .get("/api/auth/ping")
      .then((res) => {
        console.log("Logged In!");
        test = true;
      })
      .catch((err) => {
        console.log("You're not logged in!");
      });

    return test;
  };

  const isAdmin = async () => {
    let test = false;
    await axios
      .get("/api/auth/admin")
      .then((res) => {
        console.log("Logged In!");
        test = true;
      })
      .catch((err) => {
        return err.response?.data;
      });

    return test;
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logOut, register, logged, isAdmin, isLogged, setAuthHeader }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
