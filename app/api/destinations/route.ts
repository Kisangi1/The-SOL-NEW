// app/api/destinations/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { uploadImage } from "@/lib/uploadImage";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const bestTimeToTravel = formData.get("bestTimeToTravel") as string;
    const whatToCarry = JSON.parse(formData.get("whatToCarry") as string);
    const location = formData.get("location") as string;
    const image = formData.get("image") as File;

    if (!name || !title || !description || !bestTimeToTravel || !location) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const destination = await prisma.destination.create({
      data: {
        name,
        title,
        description,
        bestTimeToTravel,
        whatToCarry,
        location,
        imageUrl,
      },
    });

    return NextResponse.json(destination);
  } catch (error) {
    console.error("[DESTINATIONS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = 9;
    const skip = (page - 1) * pageSize;

    const [destinations, total] = await Promise.all([
      prisma.destination.findMany({
        orderBy: { createdAt: "desc" },
        take: pageSize,
        skip,
      }),
      prisma.destination.count(),
    ]);

    return NextResponse.json({
      destinations,
      total,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("[DESTINATIONS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

