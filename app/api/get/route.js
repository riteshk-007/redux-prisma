import prisma from "@/Db/db.config";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const getData = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Successfully fetched data.",
      getData,
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
