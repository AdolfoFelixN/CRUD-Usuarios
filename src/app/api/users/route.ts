import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

type InsertResult = {
  insertId: number;
};

export async function GET() {
  const results = await conn.query("SELECT * FROM USUARIOS");
  return NextResponse.json(results);
}

export async function POST(request: Request) {
  try {
    const { nombre, email, contrasena } = await request.json();

    const result = await conn.query<InsertResult>(
      "INSERT INTO USUARIOS SET ?",
      {
        nombre,
        email,
        contrasena,
      }
    );

    console.log(result);
    return NextResponse.json({
      id: result.insertId,
      nombre,
      email,
      contrasena,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Ocurrió un error desconocido" },
      { status: 500 }
    );
  }
}
