import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { main } from "../route";

const prisma = new PrismaClient();

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id: string = req.url.split("/").pop() as string;

    await main();
    const post = await prisma.post.findFirst({ where: { id } });
    return NextResponse.json({ success: true, result: post }, { status: 200 });
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

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const { title, description } = await req.json();
    const id: string = req.url.split("/").pop() as string;

    await main();
    const post = await prisma.post.update({
      where: { id },
      data: { title, description },
    });
    return NextResponse.json({ success: true, result: post }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to update post" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id: string = req.url.split("/").pop() as string;

    await main();
    const post = await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true, result: post }, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to delete post" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
