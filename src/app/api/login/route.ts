import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";
import { Usuario } from "@/interfaces/User";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { email, password } = await request.json();
    const result = await conn.query<Usuario[]>(
      "SELECT nombre FROM USUARIOS WHERE email=? AND contrasena=?",
      [email, password]
    );

    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Usuario no existe",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
