"use client";
import { Usuario } from "@/interfaces/User";
import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

function HomePage() {
  const [users, setUsers] = useState<Usuario[]>([]);

  useEffect(() => {
    async function getUsers() {
      const res = await axios.get("/api/users");
      setUsers(res.data);
    }
    getUsers();
  }, []);

  return (
    <>
      <h1 className="text-2xl my-5">Administrar Usuarios</h1>
      {users.length <= 0 ? <p className="text-center text-xl mt-10">No hay usuarios registrados</p> : (
        <section className="flex flex-wrap justify-start gap-5">
        {users.map((user) => (
          <UserCard key={user.id} user={user} onDelete={id => setUsers(users.filter(u => u.id !== id))} />
        ))}
      </section>
      )}
    </>
  );
}

export default HomePage;
