"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormUserEditNew {
  nombre: string;
  email: string;
  contrasena: string;
}

function FormRegEdit() {
  const router = useRouter();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormUserEditNew>();

  useEffect(() => {
    if (params.id) {
      axios.get("/api/users/" + params.id).then((res) => {
        reset({
          nombre: res.data.nombre,
          email: res.data.email,
          contrasena: res.data.contrasena,
        });
      });
    }
  }, [params.id, reset]);

  const onSubmit = async (data: FormUserEditNew) => {
    try {
      if (!params.id) {
        await axios.post("/api/users", data);
      } else {
        await axios.put(`/api/users/${params.id}`, data);
      }
      router.push("/home");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[25%] flex flex-col gap-5 border bg-white border-gray-200 shadow-md rounded p-5"
      >
        <h3 className="text-xl font-semibold">
          {params.id ? "Editar Usuario" : "Registro de Usuario"}
        </h3>
        <div className="flex flex-col gap-1">
          <label htmlFor="nombre">Nombre: </label>
          <input
            {...register("nombre", { required: "Nombre requerido" })}
            type="text"
            className="border border-blue-200 rounded px-2 py-1"
            placeholder=""
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Correo: </label>
          <input
            type="text"
            className="border border-blue-200 rounded px-2 py-1"
            placeholder="example@gmail.com"
            {...register("email", {
              required: "Correo requerido",
              pattern: {
                value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                message: "Formato de correo inválido",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="contrasena">Contraseña: </label>
          <input
            type="text"
            className="border border-blue-200 rounded px-2 py-1"
            placeholder="******"
            {...register("contrasena", {
              required: "Contraseña requerida",
              minLength: {
                value: 6,
                message: "Mínimo 6 caracteres",
              },
            })}
          />
          {errors.contrasena && (
            <p className="text-red-500 text-xs">{errors.contrasena.message}</p>
          )}
        </div>
        <div className="flex justify-end gap-3 mt-2">
          <button
            type="button"
            className="bg-red-500 px-3 py-2 rounded text-white hover:bg-red-600 cursor-pointer"
            onClick={() => router.push("/home")}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 px-3 py-2 rounded text-white hover:bg-blue-600 cursor-pointer"
          >
            {params.id ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </>
  );
}

export default FormRegEdit;
