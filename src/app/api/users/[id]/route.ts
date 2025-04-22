import { Usuario } from "@/interfaces/User";
import { conn } from "@/libs/mysql";
import { NextResponse } from "next/server";

type ResultType = {
  affectedRows: number;
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await conn.query<Usuario[]>(
      "SELECT * FROM USUARIOS WHERE id = ?",
      [params.id]
    );

    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Usuario no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  const result = await conn.query("UPDATE USUARIOS SET ? WHERE id = ?", [
    data,
    params.id,
  ]);

  return NextResponse.json({
    message: "Usuario actualizado correctamente",
    result,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    const result = (await conn.query("DELETE FROM USUARIOS WHERE id = ?", [
      params.id,
    ])) as ResultType;
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Usuario no encontrado",
        },
        {
          status: 404,
        }
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
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