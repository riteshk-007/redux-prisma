import prisma from "@/Db/db.config";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const PUT = async (req, { params }) => {
  const id = params.update;
  try {
    const { name, email, oldPassword, newPassword } = await req.json();
    const user = await prisma.user.findUnique({ where: { id: id } });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found.",
      });
    }

    if (!oldPassword || !newPassword) {
      return NextResponse.json({
        status: 400,
        message: "Bad request. Old and new passwords are required.",
      });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json({
        status: 400,
        message: "Bad request. Old password is incorrect.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Successfully updated data.",
      updateUser,
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
