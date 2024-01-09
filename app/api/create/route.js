import prisma from "@/Db/db.config";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password || !name)
      return NextResponse.json({
        status: 400,
        message: "Missing required fields.",
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
    console.log(error.message);
    return NextResponse.json({
      status: 500,
      message: "Internal server error.",
      error,
    });
  }
};
