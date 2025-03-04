import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const main = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error(error);
    throw new Error("");
  }
};

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const posts = await prisma.post.findMany()
    return NextResponse.json({ success: true, result: posts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch posts" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, description } = await req.json();

    await main();
    const post = await prisma.post.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json({ success: true, result: post }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch posts" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
