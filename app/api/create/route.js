import prisma from "@/Db/db.config";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    const { name, email, password } = await req.json();
    const emailcheck = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!email || !password || !name)
      return NextResponse.json({
        status: 400,
        error: "Missing required fields.",
      });
    if (emailcheck)
      return NextResponse.json({
        status: 400,
        error: "Email already exists.",
      });
    let newPassword = await bcrypt.hash(password, 10);
    const newuser = await prisma.user.create({
      data: {
        name,
        email,
        password: newPassword,
      },
    });
    return NextResponse.json({
      status: 201,
      message: "Successfully created user.",
      newuser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
