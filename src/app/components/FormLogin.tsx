"use client";
import useStore from "@/store/userStore";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface User {
  email: string;
  password: string;
}

function FormLogin() {
  const { setUserStore } = useStore();

  const router = useRouter();
  const [loginError, setLoginError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>();

  const onSubmit = async (userData: User) => {
    try {
      const { data } = await axios.post("api/login", userData);
      setUserStore(data[0].nombre);
      router.push("/home");
      reset();
      setLoginError(false)
    } catch (error: any) {
      if(error.response?.status === 404){
        reset()
        setLoginError(true)
      }else{
        console.log("Error en el servidor", error)
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-1/4 bg-white shadow-lg shadow-gray-300 py-5 px-3 rounded-sm flex flex-col justify-between"
    >
      <h2 className="text-center text-3xl font-semibold my-5">Login</h2>
      <div className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-1 mt-2 ">
          <label htmlFor="email" className="text-sm">
            Email:
          </label>
          <input
            type="text"
            id="email"
            autoComplete="false"
            placeholder="example@gmail.com"
            className="border border-gray-300 px-2 py-1 rounded"
            {...register("email", {required: "Email es requerido"})}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <label htmlFor="password" className="text-sm">
            Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="*******"
            className="border border-gray-300 px-2 py-1 rounded"
            {...register("password", {required: "Contraseña es requerida"})}
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>
      </div>
      {/* Mensaje de error por login incorrecto */}
      {loginError && (
        <p className="text-red-500 text-xs text-center mt-2">
          Email o contraseña incorrectos
        </p>
      )}
      <div>
        <div className="flex flex-col items-center gap-2 mt-2">
          <p className="text-xs text-gray-500 hover:text-gray-600 cursor-pointer">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 font-semibold">
              Sign up
            </Link>
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 px-3 py-2 text-white font-medium rounded-sm text-sm cursor-pointer">
            Log In
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormLogin;
