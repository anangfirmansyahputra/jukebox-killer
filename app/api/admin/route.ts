import { pool } from "@/lib/connection";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    const [results, fields] = await pool.query(`SELECT * FROM admins`);

    console.log({ results });
    console.log({ fields });

    return NextResponse.json({
      data: results,
      status: 200,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return new NextResponse(err.message, { status: 500 });
    } else {
      return new NextResponse("Something went wrong", { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const [results] = await pool.query(
      `INSERT INTO admins (name, email, password) VALUES (?, ?, ?)`,
      [body.name, body.email, hashedPassword]
    );

    return NextResponse.json({
      data: results,
      status: 200,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return new NextResponse(err.message, { status: 500 });
    } else {
      return new NextResponse("Something went wrong", { status: 500 });
    }
  }
}
