import { Usuario } from "@/interfaces/User";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

interface UserCardI {
  user: Usuario;
  onDelete: (id: number) => void;
}

function UserCard({ user, onDelete }: UserCardI) {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      Swal.fire({
        title: "¿Está seguro de eliminar el usuario?",
        text: "Esta acción no se podrá revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`/api/users/${id}`);
          onDelete(id);
          Swal.fire({
            title: "Deleted!",
            text: "El usuario ha sido eliminado",
            icon: "success",
          });
        }
      });
    } catch (error:any) {
      console.log(error.message)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    }
  };

  return (
    <div className="border bg-white border-gray-200 shadow-sm flex flex-col justify-between p-4 rounded-md">
      <div className="flex flex-col gap-2">
        <p className="font-semibold">
          Nombre: <span className="font-normal">{user.nombre}</span>
        </p>
        <p className="font-semibold">
          Correo: <span className="font-normal">{user.email}</span>
        </p>
        <p className="font-semibold">
          Password: <span className="font-normal">{user.contrasena}</span>
        </p>
        <p className="font-semibold">
          Fecha de registro:{" "}
          <span className="font-normal">{user.fecha_registro}</span>
        </p>
      </div>
      <div className="flex justify-end gap-3 mt-2">
        <button
          onClick={() => handleDelete(user.id)}
          className="bg-red-500 px-3 py-2 rounded text-white hover:bg-red-600 cursor-pointer"
        >
          Eliminar
        </button>
        <button
          onClick={() => router.push("/edit/"+user.id)}
          className="bg-blue-500 px-3 py-2 rounded text-white hover:bg-blue-600 cursor-pointer"
        >
          Editar
        </button>
      </div>
    </div>
  );
}

export default UserCard;
