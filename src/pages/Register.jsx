import axios from "axios";
import { Facebook, Google, GitHub } from "@mui/icons-material";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { useAuth } from "../hooks/AuthProvider";
import { data } from "autoprefixer";
import Error from "../assets/cross.png";
import Success from "../assets/checked.png";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState(null);
  const auth = useAuth();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await auth.register(formData);

    if (result.succeeded) {
      setStatus({
        success: true,
        message: "Registration succeeded.",
      });
    } else {
      setStatus({
        success: false,
        errors: result.errors || ["Registration failed. Please try again."],
      });
    }
  };

  return (
    <div className="px-4 py-16 w-full flex flex-col items-center justify-center sm:px-6 lg:px-8">

      <div className="bg-white rounded-2xl dark:bg-menu dark:border-l-menu border-1 p-8 shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-poppins dark:text-white font-semibold text-center mb-6">
          Registro
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block dark:text-white font-poppins text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Nombre de Usuario
            </label>
            <input
              className="shadow appearance-none dark:bg-gray-700 dark:text-white dark:border-gray-600 border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Nombre de Usuario"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block dark:text-white font-poppins text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <input
              className="shadow appearance-none dark:bg-gray-700 dark:text-white dark:border-gray-600 border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-white font-poppins text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none dark:bg-gray-700 dark:text-white dark:border-gray-600 border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-white font-poppins text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirmar Contraseña
            </label>
            <input
              className="shadow appearance-none border dark:bg-gray-700 dark:text-white dark:border-gray-600 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-poppins py-2 px-4 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Registrar
            </button>
          </div>
        </form>

      </div>
      {status && (
        <div
          className={`rounded gap-3 text-center flex items-center justify-center flex-col mt-10 container max-w-md text-left py-10 mb-10 ${status.success ? "bg-green-500" : "bg-red-300"
            }`}
        >
          <img
            className="rounded-xl max-w-[50px]"
            src={status.success ? Success : Error}
            alt=""
          />
          {status.success ? (
            <div>
              <strong>
                <p>Success</p>
              </strong>
              <p>An email has been sent to your email address.</p>
            </div>
          ) : (
            <ul>
              {status.errors.map((error, index) => (
                <li key={index} className="font-light">
                  {error.description || error}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

    </div>
  );
}
