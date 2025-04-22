"use client";
import useStore from "@/store/userStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname();
  const { user, setUserStore } = useStore();

  if (pathname === "/") return null;

  return (
    <nav className="bg-black text-white py-3 px-5 flex justify-between items-center">
      <h1 className="text-lg font-semibold">
        Hola <span className="text-blue-400">{user}</span>
      </h1>
      <div>
        <ul className="flex gap-8 text-sm font-semibold">
          <Link href="/home">Inicio</Link>
          <Link href="/register">Registrar</Link>
          <Link href="/" onClick={() => setUserStore("")}>
            Salir
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
