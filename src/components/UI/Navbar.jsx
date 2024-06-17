import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/icon.jpg";
import AuthProvider, { useAuth } from "../../hooks/AuthProvider";
import Cookies from "universal-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../Button";
import SettingsButton from "../SettingsButton";
import { button } from "@material-tailwind/react";

export default function Navbar() {
  const [logged, setLogged] = useState(false);
  const [name, setName] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const auth = useAuth();
  auth.setAuthHeader();

  const getNextTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    return nextTheme;
  }

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.remove(theme)
    setTheme(nextTheme)
  }

  useEffect(() => {
    axios.defaults.baseURL = 'https://ec2-44-194-230-54.compute-1.amazonaws.com:8081/';


    (async () => {
      const jwt = auth.getJwt();
      setLogged(await auth.isLogged());
      setAdmin(await auth.isAdmin());
      setName(jwt.userName)
      console.log(await auth.isAdmin())
    })();

  }, []);


  useEffect(() => {
    console.log(theme)
    document.documentElement.classList.add(theme)
  }, [theme]);

  return (
    <div className="dark:bg-primaryDark dark:text-white px-4 mx-auto stick shadow-md max-w-[100vw] sm:px-6">
      <div className="relative pt-6 pb-6">
        <nav
          className="relative flex items-center justify-between sm:h-10 md:justify-center"
          aria-label="Global"
        >
          <div className=" pl-5 flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link to="/">
                <img
                  className="  transition-all hover:scale-125 rounded-2xl w-auto h-8 sm:h-10"
                  src={logo}
                  loading="lazy"
                  width="202"
                  height="40"
                />
              </Link>
              <div className="flex items-center -mr-2 md:hidden">
                <button
                  className="inline-flex items-center justify-center p-2 text-gray-400 dark:text-white bg-gray-50 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-50"
                  type="button"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:space-x-10 list-none">
            <li>
              <a className=" text-base font-poppins dark:text-item dark:hover:text-itemHover text-gray-500 list-none hover:text-gray-900">
                <Link to="/" replace>
                  Inicio
                </Link>
              </a>
            </li>
            <li>
              <a className="text-base font-poppins dark:text-item dark:hover:text-itemHover text-gray-500 list-none hover:text-gray-900">
                <Link to="/store">Tienda</Link>
              </a>
            </li>

            <li>
              <a className="text-base font-poppins dark:text-item dark:hover:text-itemHover text-gray-500 list-none hover:text-gray-900">
                <Link to="/library">Biblioteca</Link>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-base font-poppins dark:text-item dark:hover:text-itemHover text-gray-500 list-none hover:text-gray-900"
              >
                <Link>
                  Comunidad
                </Link>
              </a>
            </li>
          </div>
          <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
            <div className="inline-flex rounded-full">
              {logged === false ? (

                <Link to="/login" className="bg-gray-700 p-3 rounded-2xl">Sign In</Link>
              ) : (
                <div className="flex gap-4">
                  <SettingsButton logout={auth.logOut} isAdmin={admin} isLogged={logged} userName={name}></SettingsButton>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
