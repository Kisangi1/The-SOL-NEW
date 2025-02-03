// app/api/destinations/[id]/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { uploadImage } from "@/lib/uploadImage";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    let imageUrl;
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const destination = await prisma.destination.update({
      where: { id: params.id },
      data: {
        name,
        title,
        description,
        bestTimeToTravel,
        whatToCarry,
        location,
        ...(imageUrl && { imageUrl }),
      },
    });

    return NextResponse.json(destination);
  } catch (error) {
    console.error("[DESTINATIONS_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.destination.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Destination deleted successfully" });
  } catch (error) {
    console.error("[DESTINATIONS_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const destination = await prisma.destination.findUnique({
      where: { id: params.id },
    });

    if (!destination) {
      return new NextResponse("Destination not found", { status: 404 });
    }

    return NextResponse.json(destination);
  } catch (error) {
    console.error("[DESTINATIONS_GET_BY_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}