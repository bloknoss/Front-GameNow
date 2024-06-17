import axios from "axios";
import { Facebook, Google, GitHub } from "@mui/icons-material";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { useAuth } from "../hooks/AuthProvider";
import { data } from "autoprefixer";
import { Link } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const auth = useAuth();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hey");

    auth.login(formData);
  };

  return (
    <div className="px-4 py-16 w-full flex items-center justify-center sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl dark:bg-menu dark:border-l-menu border-1 p-8 shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-poppins dark:text-white font-semibold text-center mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block dark:text-white font-poppins text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className="rounded-md shadow appearance-none dark:bg-gray-700 dark:text-white dark:border-gray-600 border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-white font-poppins text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="rounded-md shadow appearance-none dark:bg-gray-700 dark:text-white dark:border-gray-600 border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="********"
            />
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-poppins py-2 px-4 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Iniciar Sesión
            </button>
            <a
              className="inline-block align-baseline font-poppins text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>

        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-extralight dark:text-neutral-200">
            O
          </p>
        </div>

        <div className="mt-6 gap-4 flex flex-col">
          <Link
            to="/register"
            type="button"
            className="py-3 rounded-none flex justify-center gap-2 items-center bg-blue-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
          >
            <p className="font-duru">Registro</p>
          </Link>

        </div>
      </div>
    </div>
  );
}
